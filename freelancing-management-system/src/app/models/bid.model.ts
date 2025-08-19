// src/app/models/bid.model.ts
export interface Bid {
  id?: number;
  projectId: number;
  freelancerId: number;
  
  amount: number;
  message: string;
  date: string;
  status?: 'pending' | 'accepted' | 'rejected'| 'open' | 'closed';
  category ?: string;

notificationSent?: boolean;
}
