import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Freelancer } from '../models/project.model';
//import { Freelancer } from '../models/freelancer.model';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private apiUrl = 'http://localhost:8080/api/freelancers';

  constructor(private http: HttpClient) {}

  getFreelancers(): Observable<Freelancer[]> {
    return this.http.get<Freelancer[]>(this.apiUrl);
  }

  addFreelancer(freelancer: Freelancer): Observable<Freelancer> {
    return this.http.post<Freelancer>(this.apiUrl, freelancer);
  }
}
