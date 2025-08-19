import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  updatePayment(id: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${id}`, payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  initiatePayment(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/initiate`, payload);
  }

  completePayment(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complete`, payload);
  }

  getReportsByClient(clientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/client/${clientId}`);
  }

  getReportsByFreelancer(freelancerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/freelancer/${freelancerId}`);
  }

  
}
