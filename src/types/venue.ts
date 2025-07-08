export interface Venue {
  _id?: string;
  _rev?: string;
  name: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  description: string;
  capacity: number;
  amenities: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VenueFormData {
  name: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  capacity: number;
  amenities: string[];
}