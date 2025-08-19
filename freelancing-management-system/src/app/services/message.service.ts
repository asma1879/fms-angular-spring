import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private apiUrl = 'http://localhost:8080/api/messages';

    constructor(private http: HttpClient) {}
  
    getMessages(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    sendMessage(message: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, message);
    }
}