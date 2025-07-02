export interface Activity {
  _id?: string;
  _rev?: string;
  title: string;
  description: string;
  venueId: string;
  venueName: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requirements: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityFormData {
  title: string;
  description: string;
  venueId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  price: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requirements: string[];
}