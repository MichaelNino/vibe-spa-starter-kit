declare global {
  interface Window {
    PouchDB: any;
  }
}

import type { User, UserCredentials, UserRegistration } from '../types/user';

class DatabaseService {
  private db: any;
  private currentUser: User | null = null;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    if (typeof window !== 'undefined' && window.PouchDB) {
      this.db = new window.PouchDB('users');
    }
  }

  async registerUser(userData: UserRegistration): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Check if username already exists
      const existingUser = await this.findUserByUsername(userData.username);
      if (existingUser) {
        return { success: false, message: 'Username already exists' };
      }

      // Check if email already exists
      const existingEmail = await this.findUserByEmail(userData.email);
      if (existingEmail) {
        return { success: false, message: 'Email already exists' };
      }

      const user: User = {
        _id: `user_${userData.username}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        theme: userData.theme,
        password: userData.password, // In production, this should be hashed
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.db.put(user);
      user._rev = result.rev;

      // Remove password from returned user object
      const { password, ...userWithoutPassword } = user;
      
      return { success: true, message: 'User registered successfully', user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed' };
    }
  }

  async loginUser(credentials: UserCredentials): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const user = await this.findUserByUsername(credentials.username);
      
      if (!user) {
        return { success: false, message: 'Invalid username or password' };
      }

      if (user.password !== credentials.password) {
        return { success: false, message: 'Invalid username or password' };
      }

      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username }));

      // Apply user's theme and brand name
      this.applyTheme(user.theme);
      this.updateBrandName(user.gender);

      // Remove password from returned user object
      const { password, ...userWithoutPassword } = user;
      
      return { success: true, message: 'Login successful', user: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed' };
    }
  }

  async updateUser(updatedData: Partial<User>): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      if (!this.currentUser) {
        return { success: false, message: 'No user logged in' };
      }

      const currentDoc = await this.db.get(this.currentUser._id);
      
      const updatedUser = {
        ...currentDoc,
        ...updatedData,
        updatedAt: new Date()
      };

      const result = await this.db.put(updatedUser);
      updatedUser._rev = result.rev;

      this.currentUser = updatedUser;

      // Apply theme if it was updated
      if (updatedData.theme) {
        this.applyTheme(updatedData.theme);
      }

      // Update brand name if gender was updated
      if (updatedData.gender) {
        this.updateBrandName(updatedData.gender);
      }

      // Remove password from returned user object
      const { password, ...userWithoutPassword } = updatedUser;
      
      return { success: true, message: 'Profile updated successfully', user: userWithoutPassword };
    } catch (error) {
      console.error('Update error:', error);
      return { success: false, message: 'Update failed' };
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const doc = await this.db.get(`user_${username}`);
      return doc;
    } catch (error) {
      return null;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.db.allDocs({ include_docs: true });
      const user = result.rows.find((row: any) => row.doc.email === email);
      return user ? user.doc : null;
    } catch (error) {
      return null;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async loadCurrentUser(): Promise<User | null> {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const { username } = JSON.parse(stored);
      this.currentUser = await this.findUserByUsername(username);
      if (this.currentUser) {
        // Apply user's theme and brand name on load
        this.applyTheme(this.currentUser.theme);
        this.updateBrandName(this.currentUser.gender);
      }
      return this.currentUser;
    }
    return null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    // Reset to default theme and brand name
    this.applyTheme('Green');
    this.updateBrandName('Male'); // Default to King of the Hill
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  private applyTheme(theme: string): void {
    const themeColors = {
      Green: '#198754',
      Blue: '#0d6efd',
      Pink: '#d63384',
      Purple: '#6f42c1',
      Red: '#dc3545'
    };

    const color = themeColors[theme as keyof typeof themeColors] || themeColors.Green;
    
    // Update CSS custom property
    document.documentElement.style.setProperty('--primary-color', color);
    
    // Store theme preference
    localStorage.setItem('userTheme', theme);
  }

  private updateBrandName(gender: 'Male' | 'Female'): void {
    const brandName = gender === 'Female' ? 'Queen of the Hill' : 'King of the Hill';
    
    // Store brand name preference
    localStorage.setItem('brandName', brandName);
    
    // Dispatch custom event to notify components of brand name change
    window.dispatchEvent(new CustomEvent('brandNameChanged', { detail: brandName }));
  }

  getBrandName(): string {
    return localStorage.getItem('brandName') || 'King of the Hill';
  }

  getThemeColor(theme: string): string {
    const themeColors = {
      Green: '#198754',
      Blue: '#0d6efd',
      Pink: '#d63384',
      Purple: '#6f42c1',
      Red: '#dc3545'
    };
    return themeColors[theme as keyof typeof themeColors] || themeColors.Green;
  }
}

export const db = new DatabaseService();