import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
//import { User } from '../models/user.model';

export interface User {
 id?: number;
  fullName? : string;
  country? : string;
  hourlyRate? : number;
  languages? : string;
  education? : string;
  certifications? : string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  bio?: string;
  skills?: string;
  experience?: string;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })


export class UserService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

 

  login(email: string, password: string): Observable<any | null> {
  return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
}

register(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, user);
}

updateUser(id: any, userData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/users/${id}`, userData);
}

getUserById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/users/${id}`);
}

getDashboardStats(userId: number): Observable<any> {
return this.http.get(`${this.apiUrl}/dashboard/${userId}`);
}
   // ➕ Freelancer profile
  getFreelancerProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/freelancer/profile/${id}`);
  }

  updateFreelancerProfile(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/freelancer/profile/update/${id}`, data);
  }

  // ➕ Client profile
  getClientProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/profile/${id}`);
  }

  updateClientProfile(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/client/profile/update/${id}`, data);
  }

  // uploadAvatar(userId: number, formData: FormData): Observable<string> {
  //   return this.http.post<string>(`${this.apiUrl}/upload-avatar/${userId}`, formData);
  // }
  
  private avatarApi = 'http://localhost:3001/avatars'; // json-server

// Get avatar by user ID
getAvatarByUserId(userId: number): Observable<any> {
  return this.http.get(`${this.avatarApi}/${userId}`);
}

// Create new avatar entry (if user doesn't have one yet)
createAvatar(avatar: any): Observable<any> {
  return this.http.post(this.avatarApi, avatar);
}

// Update existing avatar
updateAvatar(userId: number, avatar: any): Observable<any> {
  return this.http.put(`${this.avatarApi}/${userId}`, avatar);
}
 getFreelancers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/freelancers`);
  }

}
