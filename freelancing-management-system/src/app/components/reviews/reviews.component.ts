
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
//import { ReviewService } from '../services/review.service';
//import { Review } from '../models/review.model';

@Component({
selector: 'app-reviews',
templateUrl: './reviews.component.html',
styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  
// reviews: Review[] = [];
// newReview: Review = { clientId: 0, freelancerId: 0, rating: 0, comment: '' };
 @Input() revieweeId!: number;
  @Input() revieweeRole!: 'client' | 'freelancer';
  @Input() reviewerId!: number;
  @Input() reviewerRole!: 'client' | 'freelancer';

  reviews: Review[] = [];
  reviewForm!: FormGroup;

constructor(private reviewService: ReviewService, private fb: FormBuilder) {}

ngOnInit(): void {
//this.getAll();
this.loadReviews();
    this.reviewForm = this.fb.group({
      rating: [5, Validators.required],
      comment: ['', Validators.required]
    });
}

getAll(): void {
this.reviewService.getAll().subscribe(data => this.reviews = data);
}

// getStars(rating: number): string {
//   return '★'.repeat(rating || 0);
// }


// save(): void {
// this.reviewService.save(this.newReview).subscribe(() => {
// this.getAll();
// this.newReview = { clientId: 0, freelancerId: 0, rating: 0, comment: '' };
// });
// }

// delete(id: number): void {
// this.reviewService.delete(id).subscribe(() => this.getAll());
// }
 loadReviews(): void {
    this.reviewService.getByReviewee(this.revieweeId, this.revieweeRole)
      .subscribe(data => this.reviews = data);
  }

  submitReview(): void {
    if (this.reviewForm.invalid) return;

    // const review: Review = {
    //   reviewerId: this.reviewerId,
    //   //revieweeId: this.revieweeId,
    //   //reviewerRole: this.reviewerRole,
    //   //revieweeRole: this.revieweeRole,
    //   rating: this.reviewForm.value.rating,
    //   comment: this.reviewForm.value.comment
    // };

  //   this.reviewService.save(review).subscribe(() => {
  //     this.reviewForm.reset({ rating: 5, comment: '' });
  //     this.loadReviews();
  //   });
  // }
  }}
