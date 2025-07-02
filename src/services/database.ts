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
      return this.currentUser;
    }
    return null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}

export const db = new DatabaseService();