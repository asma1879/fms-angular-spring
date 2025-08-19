import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobDelivery } from '../models/job-delivery.model';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class JobDeliveryService {
private apiUrl = 'http://localhost:8080/api/job-deliveries';

constructor(private http: HttpClient) {}

getAll(): Observable<JobDelivery[]> {
return this.http.get<JobDelivery[]>(this.apiUrl);
}

add(delivery: JobDelivery): Observable<JobDelivery> {
return this.http.post<JobDelivery>(this.apiUrl, delivery);
}

 getDeliveryById(id: number): Observable<JobDelivery> {
    return this.http.get<JobDelivery>(`${this.apiUrl}/${id}`);
  }
   // ✅ New: Get deliveries for specific client
  getDeliveriesByClient(clientId: number): Observable<JobDelivery[]> {
    
    return this.http.get<JobDelivery[]>(`${this.apiUrl}/client/${clientId}`);
  }

  // ✅ New: Approve a delivery
  approveDelivery(deliveryId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${deliveryId}`, null);
  }
  
}