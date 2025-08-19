import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../models/wallet.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
   private apiUrl = 'http://localhost:8080/api/wallet';
  constructor(private http: HttpClient) { }
   getWalletByUserId(userId: number): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/user/${userId}`);
  }

  addFunds(userId: number, amount: number, paymentMethod: string, paymentCode: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add-funds`, { userId, amount });
  }

  getTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/user/${userId}`);
  }

  getEarnings(freelancerId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/earnings/${freelancerId}`);
  }

  getTotalCommission(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/commission`);
  }

  getWalletBalance(userId: number): Observable<number> {
  return this.http.get<number>(`http://localhost:8080/api/wallet/balance/${userId}`);
}
  withdraw(payload: any): Observable<any> {
  return this.http.post('http://localhost:8080/api/wallet/withdraw', payload);
}

}
