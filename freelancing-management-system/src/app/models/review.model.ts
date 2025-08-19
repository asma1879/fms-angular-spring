export interface Review {
  id?: number;
  jobId: number;
  reviewerId: number;
  reviewedId: number;
  rating: number;
  comment: string;
  role: string; // 'client' or 'freelancer'
  date?: string;
}
