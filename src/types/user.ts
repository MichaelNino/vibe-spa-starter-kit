export interface User {
  _id?: string;
  _rev?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  theme: 'Green' | 'Blue' | 'Pink' | 'Purple' | 'Red';
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  theme: 'Green' | 'Blue' | 'Pink' | 'Purple' | 'Red';
}