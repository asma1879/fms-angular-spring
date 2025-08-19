
import { Component, OnInit } from '@angular/core';
import { JobDelivery } from 'src/app/models/job-delivery.model';
import { JobDeliveryService } from 'src/app/services/job-delivery.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/models/job.model';
//import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-job-delivery',
  templateUrl: './job-delivery.component.html',
  styleUrls: ['./job-delivery.component.css']
})
export class JobDeliveryComponent implements OnInit {
  // deliveries: JobDelivery[] = [];
  // jobs: Job[] = [];
  // jobDelivery: JobDelivery | null = null;

   deliveries: JobDelivery[] = [];
  jobs: Job[] = [];
  newDelivery: JobDelivery = {
    jobId: 0,
    freelancerId: 0,
    clientId : 0,
    deliveryDate: '',
    submissionLink: '',
    status: 'Submitted'
  };


  constructor(
   
     private service: JobDeliveryService,
    private jobService: JobService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.fetchDeliveries();
    // this.fetchJobs();
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // if (id) {
    //   this.service.getDeliveryById(id).subscribe(data => {
    //     this.jobDelivery = data;
    //   });
    // }
     //this.newDelivery.freelancerId = Number(localStorage.getItem('freelancerId')) || 0;

     this.route.queryParams.subscribe(params => {
      const jobId = +params['jobId'];
      if (jobId) {
        this.newDelivery.jobId = jobId;
      }
    });
    this.fetchDeliveries();
    this.fetchJobs();
  }

  
  fetchDeliveries() {
    this.service.getAll().subscribe(data => this.deliveries = data);
  }

  
  // fetchJobs() {
  //   this.jobService.getJobs().subscribe(data => this.jobs = data);
  // }
//   fetchJobs() {
//   const freelancerId = Number(localStorage.getItem('freelancerId'));
//   this.jobService.getAcceptedJobsForFreelancer(freelancerId).subscribe(data => {
//     this.jobs = data;
//   });
// }

  fetchJobs(): void {
 // const freelancerId = Number(localStorage.getItem('freelancerId')) || 5;
 const freelancerId = Number(localStorage.getItem('userId')) || 0;

  if (!freelancerId) {
    alert('Invalid freelancer ID');
    return;
  }

  this.jobService.getAcceptedJobsForFreelancer(freelancerId).subscribe(data => {
    this.jobs = data;
    console.log('Fetched jobs:', this.jobs); // for debugging
  });
}


  // submitDelivery() {
  //   this.service.add(this.newDelivery).subscribe(() => {
  //     this.fetchDeliveries();
  //     this.newDelivery = {
  //       jobId: 0,
  //       freelancerId: this.newDelivery.freelancerId,
  //       clientId :0,
  //       deliveryDate: '',
  //       submissionLink: '',
  //       status: 'Submitted'
  //     };
  //   });
  // }
  submitDelivery(): void {
  const selectedJob = this.jobs.find(j => j.id === this.newDelivery.jobId);

  if (!selectedJob) {
    Swal.fire('Invalid Job', 'Please select a valid job to submit.', 'warning');
    return;
  }

  this.newDelivery.freelancerId = Number(localStorage.getItem('userId')) || 0;
  this.newDelivery.clientId = selectedJob.clientId ?? 0;

  this.service.add(this.newDelivery).subscribe({
    next: () => {
      // 🔥 DELETE job after successful delivery
      this.jobService.deleteJob(this.newDelivery.jobId).subscribe({
        next: () => {
          this.fetchDeliveries();
          this.newDelivery = {
            jobId: 0,
            freelancerId: this.newDelivery.freelancerId,
            clientId: 0,
            deliveryDate: '',
            submissionLink: '',
            status: 'Submitted'
          };
          Swal.fire('Success', 'Delivery submitted and job deleted.', 'success');
        },
        error: () => {
          Swal.fire('Delivery Saved', 'Delivery was submitted but job could not be deleted.', 'warning');
        }
      });
    },
    error: () => {
      Swal.fire('Error', 'Something went wrong while submitting.', 'error');
    }
  });
}

  getJobTitle(jobId: number): string {
    const job = this.jobs.find(j => j.id === jobId);
    return job ? job.title : 'Test';
  }
  hasDelivered(jobId: number): boolean {
  return this.deliveries.some(delivery => delivery.jobId === jobId);
}

newReview: Review = {
  jobId: 0,
  reviewerId: 0,
  reviewedId: 0,
  rating: 5,
  comment: '',
  role: 'client'
};

selectedDelivery: JobDelivery | null = null;
submitReview(): void {
  if (!this.selectedDelivery) {
    Swal.fire('Error', 'No delivery selected for review', 'error');
    return;
  }

  this.newReview.jobId = this.selectedDelivery.jobId;
  this.newReview.reviewerId = Number(localStorage.getItem('userId')) || 0; // client
  this.newReview.reviewedId = this.selectedDelivery.freelancerId;
  this.newReview.role = 'client';

  this.reviewService.submitReview(this.newReview).subscribe({
    next: () => {
      Swal.fire('Review Submitted', 'Thanks for your feedback!', 'success');
      this.newReview = {
        jobId: 0,
        reviewerId: 0,
        reviewedId: 0,
        rating: 5,
        comment: '',
        role: 'client'
      };
      this.selectedDelivery = null;
    },
    error: () => {
      Swal.fire('Error', 'Could not submit review.', 'error');
    }
  });
}


}

