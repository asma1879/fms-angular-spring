

import { Component, OnInit } from '@angular/core';
import { BiddingService } from 'src/app/services/bid.service';
import { JobService } from 'src/app/services/job.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-job-bids',
  templateUrl: './client-job-bids.component.html',
  styleUrls: ['./client-job-bids.component.css']
})
export class ClientJobBidsComponent implements OnInit {
  bids: any[] = [];
  jobs: any[] = [];
  selectedJobId: number | null = null;
  selectedBidMessage: string = '';
  //clientId: number = Number(localStorage.getItem('userId')) || 7;
   clientId: number = Number(localStorage.getItem('userId')) || 0;
  searchTerm: string = '';
  paymentMethod: string = '';
accountNumber: string = '';

  constructor(private biddingService: BiddingService, private jobService: JobService,private paymentService: PaymentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadClientJobs();
    
  }

  // Load jobs posted by this client
  loadClientJobs(): void {
    this.jobService.getJobsByClientId(this.clientId).subscribe(data => {
      this.jobs = data;
    });
  }

  // When job selected from dropdown
  onJobChange(): void {
    if (this.selectedJobId) {
      this.biddingService.getBidsByJobId(this.selectedJobId).subscribe(data => {
        this.bids = data;
      this.bids.forEach(bid => {
        this.userService.getUserById(bid.freelancerId).subscribe(user => {
          bid.freelancerName = user.name;
          bid.freelancerCountry = user.country;
          bid.freelancerSkills = user.skills;
          bid.freelancerExperience = user.experience;
        });
      });
    });
    } else {
      this.bids = [];
    }
  }
  getSelectedJobTitle(): string {
  const job = this.jobs.find(j => j.id === this.selectedJobId);
  return job ? job.title : '';
}


//  acceptBid(bidId: number): void {
//   Swal.fire({
//     title: 'Accept this bid?',
//     text: 'This will assign the freelancer and start the project.',
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, accept it',
//     cancelButtonText: 'Cancel'
//   }).then(result => {
//     if (result.isConfirmed) {
//       this.biddingService.updateBidStatus(bidId, 'accepted').subscribe(() => {
//         this.onJobChange();
//         Swal.fire('Accepted!', 'Bid has been accepted.', 'success');
//       }, () => {
//         Swal.fire('Error', 'Failed to accept the bid.', 'error');
//       });
//     }
//   });
// }

viewMessage(bid: any): void {
  this.selectedBidMessage = bid.message;
  Swal.fire({
    title: 'Bid Message',
    text: bid.message || 'No message provided.',
    icon: 'info',
    confirmButtonText: 'Close'
  });
}

acceptBid(bidId: number): void {
  const bid = this.bids.find(b => b.id === bidId);
  if (!bid) return;

  Swal.fire({
    title: 'Accept this bid?',
    text: 'This will assign the freelancer and start the project.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, accept it',
    cancelButtonText: 'Cancel'
  }).then(result => {
    if (result.isConfirmed) {
      const payload = {
        jobId: this.selectedJobId,
        clientId: this.clientId,
        freelancerId: bid.freelancerId,
        bidAmount: bid.amount,
        paymentMethod: this.paymentMethod,
        accountNumber: this.accountNumber
      };
      this.paymentService.initiatePayment(payload).subscribe(() => {
        this.biddingService.updateBidStatus(bidId, 'accepted').subscribe(() => {
          this.onJobChange();
          Swal.fire('Accepted!', 'Bid has been accepted and payment initiated.', 'success');
        });
      }, () => {
        //Swal.fire('Error', 'Failed to initiate payment.', 'error');
      });
    }
  });
}


  rejectBid(bidId: number): void {
  Swal.fire({
    title: 'Reject this bid?',
    text: 'Are you sure you want to reject this bid?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reject it',
    cancelButtonText: 'Cancel'
  }).then(result => {
    if (result.isConfirmed) {
      this.biddingService.deleteBidStatus(bidId, 'rejected').subscribe(() => {
        this.onJobChange();
        Swal.fire('Rejected!', 'The bid has been rejected.', 'success');
      }, () => {
        Swal.fire('Error', 'Failed to reject the bid.', 'error');
      });
    }
  });
}


 sendNotification(bidId: number): void {
  this.biddingService.markNotificationSent(bidId).subscribe(() => {
    Swal.fire('Notification Sent', 'The freelancer has been notified.', 'info');
  }, () => {
    Swal.fire('Error', 'Failed to send notification.', 'error');
  });
}


  // Optional: Filter jobs by title in dropdown
  get filteredJobs() {
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  onPaymentDataChange(data: { paymentMethod: string; accountNumber: string }) {
  this.paymentMethod = data.paymentMethod;
  this.accountNumber = data.accountNumber;
}
}
