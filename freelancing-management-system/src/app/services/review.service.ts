import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) {}

  // Get all reviews
  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl);
  }

  // Get review by ID
  getById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${id}`);
  }

  // Create/save review
  save(review: Review): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, review);
  }

  // Delete review by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Get all reviews for a specific user (freelancer or client)
  getByReviewee(revieweeId: number, revieweeRole: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/for/${revieweeId}/${revieweeRole}`);
  }

  getReviewsForFreelancer(freelancerId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/freelancer/${freelancerId}`);
  }

  submitReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}`, review);
  }
  // in review.service.ts
getReviewsForClient(clientId: number): Observable<Review[]> {
  return this.http.get<Review[]>(`http://localhost:8080/api/reviews/client/${clientId}`);
}

}
