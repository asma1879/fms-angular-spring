import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
providedIn: 'root'
})
export class NotificationService {
private apiUrl = 'http://localhost:8080/api/notifications';

constructor(private http: HttpClient) {}

getNotifications(): Observable<Notification[]> {
return this.http.get<Notification[]>(this.apiUrl);
}

addNotification(note: Notification): Observable<Notification> {
return this.http.post<Notification>(this.apiUrl, note);
}

deleteNotification(id: number): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}