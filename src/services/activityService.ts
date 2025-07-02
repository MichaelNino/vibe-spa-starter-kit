declare global {
  interface Window {
    PouchDB: any;
  }
}

import type { Activity, ActivityFormData } from '../types/activity';
import { venueService } from './venueService';

class ActivityService {
  private db: any;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    if (typeof window !== 'undefined' && window.PouchDB) {
      this.db = new window.PouchDB('activities');
    }
  }

  async createActivity(activityData: ActivityFormData, createdBy: string): Promise<{ success: boolean; message: string; activity?: Activity }> {
    try {
      const venue = await venueService.getVenueById(activityData.venueId);
      if (!venue) {
        return { success: false, message: 'Selected venue not found' };
      }

      const activity: Activity = {
        _id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: activityData.title,
        description: activityData.description,
        venueId: activityData.venueId,
        venueName: venue.name,
        startDate: new Date(activityData.startDate),
        endDate: new Date(activityData.endDate),
        startTime: activityData.startTime,
        endTime: activityData.endTime,
        maxParticipants: activityData.maxParticipants,
        currentParticipants: 0,
        price: activityData.price,
        category: activityData.category,
        difficulty: activityData.difficulty,
        requirements: activityData.requirements,
        createdBy,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.db.put(activity);
      activity._rev = result.rev;

      return { success: true, message: 'Activity created successfully', activity };
    } catch (error) {
      console.error('Create activity error:', error);
      return { success: false, message: 'Failed to create activity' };
    }
  }

  async getAllActivities(): Promise<Activity[]> {
    try {
      const result = await this.db.allDocs({ include_docs: true });
      return result.rows
        .filter((row: any) => row.id.startsWith('activity_'))
        .map((row: any) => row.doc);
    } catch (error) {
      console.error('Get activities error:', error);
      return [];
    }
  }

  async getActivityById(id: string): Promise<Activity | null> {
    try {
      const activity = await this.db.get(id);
      return activity;
    } catch (error) {
      console.error('Get activity error:', error);
      return null;
    }
  }

  async updateActivity(id: string, activityData: ActivityFormData): Promise<{ success: boolean; message: string; activity?: Activity }> {
    try {
      const existingActivity = await this.db.get(id);
      const venue = await venueService.getVenueById(activityData.venueId);
      
      if (!venue) {
        return { success: false, message: 'Selected venue not found' };
      }

      const updatedActivity = {
        ...existingActivity,
        title: activityData.title,
        description: activityData.description,
        venueId: activityData.venueId,
        venueName: venue.name,
        startDate: new Date(activityData.startDate),
        endDate: new Date(activityData.endDate),
        startTime: activityData.startTime,
        endTime: activityData.endTime,
        maxParticipants: activityData.maxParticipants,
        price: activityData.price,
        category: activityData.category,
        difficulty: activityData.difficulty,
        requirements: activityData.requirements,
        updatedAt: new Date()
      };

      const result = await this.db.put(updatedActivity);
      updatedActivity._rev = result.rev;

      return { success: true, message: 'Activity updated successfully', activity: updatedActivity };
    } catch (error) {
      console.error('Update activity error:', error);
      return { success: false, message: 'Failed to update activity' };
    }
  }

  async deleteActivity(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const activity = await this.db.get(id);
      await this.db.remove(activity);
      return { success: true, message: 'Activity deleted successfully' };
    } catch (error) {
      console.error('Delete activity error:', error);
      return { success: false, message: 'Failed to delete activity' };
    }
  }

  async getActivitiesByUser(userId: string): Promise<Activity[]> {
    try {
      const allActivities = await this.getAllActivities();
      return allActivities.filter(activity => activity.createdBy === userId);
    } catch (error) {
      console.error('Get user activities error:', error);
      return [];
    }
  }

  async getActivitiesByVenue(venueId: string): Promise<Activity[]> {
    try {
      const allActivities = await this.getAllActivities();
      return allActivities.filter(activity => activity.venueId === venueId);
    } catch (error) {
      console.error('Get venue activities error:', error);
      return [];
    }
  }
}

export const activityService = new ActivityService();