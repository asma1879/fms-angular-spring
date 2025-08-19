// src/app/services/bid.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bid } from '../models/bid.model';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {
  private apiUrl = 'http://localhost:8080/api/bids'; // ✅ UPDATED

  constructor(private http: HttpClient) {}

  getBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(this.apiUrl);
  }

  addBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(this.apiUrl, bid);
  }

  deleteBid(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateBidStatus(bidId: number, status: string) {
 // return this.http.patch(`${this.apiUrl}/${bidId}/status`, { status });

  return this.http.get<Bid>(`${this.apiUrl}/${bidId}`);
}

 deleteBidStatus(bidId: number, status: string) {
 // return this.http.patch(`${this.apiUrl}/${bidId}/status`, { status });

  return this.http.get<Bid>(`${this.apiUrl}/reject/${bidId}`);
}



markNotificationSent(bidId: number): Observable<any> {
return this.http.patch(`${this.apiUrl}/freelancer/${bidId}/notify`, {});
}

getNotificationsByFreelancer(freelancerId: number): Observable<Bid[]> {
return this.http.get<Bid[]>(`${this.apiUrl}/freelancer/${freelancerId}/notifications`);
}

getBidsByClientId(clientId: number): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${this.apiUrl}/client/${clientId}`);
  }
getBidsByJobId(jobId: number): Observable<Bid[]> {
  return this.http.get<Bid[]>(`${this.apiUrl}/jobs/${jobId}`);
}


}
