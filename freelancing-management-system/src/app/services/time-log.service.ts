import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeLog } from '../models/time-log.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeLogService {
   private apiUrl = 'http://localhost:8080/api/timelogs';

  constructor(private http: HttpClient) {}

  getTimeLogsByFreelancerId(freelancerId: number): Observable<TimeLog[]> {
    return this.http.get<TimeLog[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }

  startTimeLog(jobId: number, freelancerId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/start?freelancerId=${freelancerId}&jobId=${jobId}`, null);
}


  pauseTimeLog(timeLogId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${timeLogId}/pause`, {}, { responseType: 'text' });
  }

  completeTimeLog(timeLogId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${timeLogId}/complete`, {}, { responseType: 'text' });
  }

  getLogByJob(jobId: number): Observable<TimeLog> {
    return this.http.get<TimeLog>(`${this.apiUrl}/job/${jobId}`);
  }

  
}
