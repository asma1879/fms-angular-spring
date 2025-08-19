export interface Job {
  id?: number;                  // Optional, handled by backend
  title: string;
  description: string;
  budget: number;
  budgetType: string;
   
   duration  : number;
  category : string;
  deadline: string;             // ISO string (YYYY-MM-DD)
  skillsRequired: string[];     // List of required skills
  clientId?: number;            // Optional, for filtering or matching
  createdAt?: string;           // Optional, display on browse page
  status : string;
}
