import { Component, OnInit } from '@angular/core';
import { JobDelivery } from 'src/app/models/job-delivery.model';
import { Job } from 'src/app/models/job.model';
import { Review } from 'src/app/models/review.model';
import { JobDeliveryService } from 'src/app/services/job-delivery.service';
import { JobService } from 'src/app/services/job.service';
import { ReviewService } from 'src/app/services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-delivery-report-component',
  templateUrl: './job-delivery-report-component.component.html',
  styleUrls: ['./job-delivery-report-component.component.css']
})
export class JobDeliveryReportComponentComponent implements OnInit {
  selectedDeliveryForReview: JobDelivery | null = null;

newReview: Review = {
  jobId: 0,
  reviewerId: 0,
  reviewedId: 0,
  rating: 5,
  comment: '',
  role: 'freelancer'
};
  deliveries: JobDelivery[] = [];
  jobs: Job[] = [];
  constructor(private service: JobDeliveryService,private jobService: JobService,private reviewService: ReviewService) { }

  // ngOnInit(): void {
  //    const freelancerId = Number(localStorage.getItem('userId')) || 0;

  //   this.service.getAll().subscribe(deliveryData => {
  //     this.deliveries = deliveryData.filter(d => d.freelancerId === freelancerId);
  //   });

  //   this.jobService.getJobs().subscribe(jobData => {
  //     this.jobs = jobData;
  //   });
  // }
  ngOnInit(): void {
  const freelancerId = Number(localStorage.getItem('userId')) || 0;

  this.jobService.getJobs().subscribe(jobData => {
    this.jobs = jobData;

    this.service.getAll().subscribe(deliveryData => {
      this.deliveries = deliveryData.filter(d => d.freelancerId === freelancerId);
    });
  });
}

   getJobTitle(jobId: number): string {
    const job = this.jobs.find(j => j.id === jobId);
    return job ? job.title : 'test';
  }
  getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'text-warning';
    case 'reviewed':
      return 'text-info';
    case 'accepted':
    case 'approved':
      return 'text-success';
    case 'rejected':
      return 'text-danger';
    default:
      return 'text-secondary';
  }
}

openReviewForm(delivery: JobDelivery): void {
  this.selectedDeliveryForReview = delivery;
  this.newReview = {
    jobId: delivery.jobId,
    reviewerId: Number(localStorage.getItem('userId')) || 0,
    reviewedId: delivery.clientId, // assuming clientId is in delivery
    rating: 5,
    comment: '',
    role: 'freelancer'
  };
}

//import Swal from 'sweetalert2';

submitReview(): void {
  this.reviewService.submitReview(this.newReview).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Your feedback has been saved successfully!',
        confirmButtonColor: '#3085d6'
      });
      this.selectedDeliveryForReview = null;
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong while submitting your review.',
        confirmButtonColor: '#d33'
      });
    }
  });
}

}
