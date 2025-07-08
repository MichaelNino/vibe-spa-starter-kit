declare global {
  interface Window {
    PouchDB: any;
  }
}

import { db } from './database';
import { venueService } from './venueService';
import type { Venue } from '../types/venue';

class BookmarkService {
  async toggleBookmark(venueId: string): Promise<{ success: boolean; message: string; isBookmarked: boolean }> {
    try {
      const currentUser = db.getCurrentUser();
      if (!currentUser) {
        return { success: false, message: 'User not logged in', isBookmarked: false };
      }

      const bookmarkedVenues = currentUser.bookmarkedVenues || [];
      const isCurrentlyBookmarked = bookmarkedVenues.includes(venueId);
      
      let updatedBookmarks: string[];
      if (isCurrentlyBookmarked) {
        // Remove bookmark
        updatedBookmarks = bookmarkedVenues.filter(id => id !== venueId);
      } else {
        // Add bookmark
        updatedBookmarks = [...bookmarkedVenues, venueId];
      }

      const result = await db.updateUser({ bookmarkedVenues: updatedBookmarks });
      
      if (result.success) {
        return { 
          success: true, 
          message: isCurrentlyBookmarked ? 'Venue removed from bookmarks' : 'Venue bookmarked successfully',
          isBookmarked: !isCurrentlyBookmarked
        };
      } else {
        return { success: false, message: result.message, isBookmarked: isCurrentlyBookmarked };
      }
    } catch (error) {
      console.error('Toggle bookmark error:', error);
      return { success: false, message: 'Failed to update bookmark', isBookmarked: false };
    }
  }

  async getBookmarkedVenues(): Promise<Venue[]> {
    try {
      const currentUser = db.getCurrentUser();
      if (!currentUser || !currentUser.bookmarkedVenues) {
        return [];
      }

      const allVenues = await venueService.getAllVenues();
      return allVenues.filter(venue => currentUser.bookmarkedVenues.includes(venue._id!));
    } catch (error) {
      console.error('Get bookmarked venues error:', error);
      return [];
    }
  }

  isBookmarked(venueId: string): boolean {
    const currentUser = db.getCurrentUser();
    if (!currentUser || !currentUser.bookmarkedVenues) {
      return false;
    }
    return currentUser.bookmarkedVenues.includes(venueId);
  }

  async getBookmarkCount(): Promise<number> {
    const currentUser = db.getCurrentUser();
    return currentUser?.bookmarkedVenues?.length || 0;
  }
}

export const bookmarkService = new BookmarkService();