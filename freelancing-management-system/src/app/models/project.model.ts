export interface Freelancer {
  id: number;
  name: string;
  skill: string;
  hourlyRate: number;
  experience: number;
}
export interface Project {
 id?: number;
  title: any;
  description: string;
  budget: number;
  skills: string[];
  bio : string;
  
}
// user.model.ts
export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'freelancer' | 'client';
  bio : string;
}
