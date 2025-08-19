import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from '../models/wishlist.model';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class WishlistService {
private apiUrl = 'http://localhost:8080/api/wishlist';

constructor(private http: HttpClient) {}

getAll(): Observable<Wishlist[]> {
return this.http.get<Wishlist[]>(this.apiUrl);
}

add(wish: Wishlist): Observable<Wishlist> {
return this.http.post<Wishlist>(this.apiUrl, wish);
}

remove(id: number): Observable<any> {
return this.http.delete(`${this.apiUrl}/${id}`);
}

 addToWishlist(wishlist: Wishlist): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.apiUrl}/add`, wishlist);
  }

  getWishlist(freelancerId: number): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }

  deleteWishlist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}