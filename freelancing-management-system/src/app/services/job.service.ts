import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
// private apiUrl = 'http://localhost:3000/jobs';

// constructor(private http: HttpClient) {}

// getJobs(): Observable<any[]> {
// return this.http.get<any[]>(this.apiUrl);
// }

// postJob(job: any): Observable<any> {
// return this.http.post<any>(this.apiUrl, job);
// }

private apiUrl = 'http://localhost:8080/api/jobs'; 

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  postJob(job: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, job);
  }
   getJobsByFreelancerId(freelancerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/freelancers/${freelancerId}`);
  }
  bgetJobs(filters: any): Observable<Job[]> {
  let params = new HttpParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) params = params.set(key, filters[key]);
  });
  return this.http.get<Job[]>(`${this.apiUrl}/browse`, { params });
}
//  closeJob(jobId: number): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${jobId}/close`, {});
//   }
  getJobById(id: number): Observable<Job> {
  return this.http.get<Job>(`${this.apiUrl}/${id}`);
}

getJobsByClientId(clientId: number): Observable<Job[]> {
  return this.http.get<Job[]>(`${this.apiUrl}/client/${clientId}`);
}
getAcceptedJobsForFreelancer(freelancerId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/bids/freelancer-jobs/${freelancerId}`);
}
deleteJob(jobId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${jobId}`);
}

closeJob(jobId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/${jobId}/close`, {});
}


}