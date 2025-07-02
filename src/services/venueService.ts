declare global {
  interface Window {
    PouchDB: any;
  }
}

import type { Venue, VenueFormData } from '../types/venue';

class VenueService {
  private db: any;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    if (typeof window !== 'undefined' && window.PouchDB) {
      this.db = new window.PouchDB('venues');
    }
  }

  async createVenue(venueData: VenueFormData, createdBy: string): Promise<{ success: boolean; message: string; venue?: Venue }> {
    try {
      const venue: Venue = {
        _id: `venue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: venueData.name,
        address: venueData.address,
        city: venueData.city,
        state: venueData.state,
        zipCode: venueData.zipCode,
        phone: venueData.phone,
        email: venueData.email,
        website: venueData.website,
        description: venueData.description,
        capacity: venueData.capacity,
        amenities: venueData.amenities,
        createdBy,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.db.put(venue);
      venue._rev = result.rev;

      return { success: true, message: 'Venue created successfully', venue };
    } catch (error) {
      console.error('Create venue error:', error);
      return { success: false, message: 'Failed to create venue' };
    }
  }

  async getAllVenues(): Promise<Venue[]> {
    try {
      const result = await this.db.allDocs({ include_docs: true });
      return result.rows
        .filter((row: any) => row.id.startsWith('venue_'))
        .map((row: any) => row.doc);
    } catch (error) {
      console.error('Get venues error:', error);
      return [];
    }
  }

  async getVenueById(id: string): Promise<Venue | null> {
    try {
      const venue = await this.db.get(id);
      return venue;
    } catch (error) {
      console.error('Get venue error:', error);
      return null;
    }
  }

  async updateVenue(id: string, venueData: VenueFormData): Promise<{ success: boolean; message: string; venue?: Venue }> {
    try {
      const existingVenue = await this.db.get(id);
      
      const updatedVenue = {
        ...existingVenue,
        name: venueData.name,
        address: venueData.address,
        city: venueData.city,
        state: venueData.state,
        zipCode: venueData.zipCode,
        phone: venueData.phone,
        email: venueData.email,
        website: venueData.website,
        description: venueData.description,
        capacity: venueData.capacity,
        amenities: venueData.amenities,
        updatedAt: new Date()
      };

      const result = await this.db.put(updatedVenue);
      updatedVenue._rev = result.rev;

      return { success: true, message: 'Venue updated successfully', venue: updatedVenue };
    } catch (error) {
      console.error('Update venue error:', error);
      return { success: false, message: 'Failed to update venue' };
    }
  }

  async deleteVenue(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const venue = await this.db.get(id);
      await this.db.remove(venue);
      return { success: true, message: 'Venue deleted successfully' };
    } catch (error) {
      console.error('Delete venue error:', error);
      return { success: false, message: 'Failed to delete venue' };
    }
  }

  async getVenuesByUser(userId: string): Promise<Venue[]> {
    try {
      const allVenues = await this.getAllVenues();
      return allVenues.filter(venue => venue.createdBy === userId);
    } catch (error) {
      console.error('Get user venues error:', error);
      return [];
    }
  }
}

export const venueService = new VenueService();