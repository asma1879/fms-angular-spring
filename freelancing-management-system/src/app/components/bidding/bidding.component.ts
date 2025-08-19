

import { Component, OnInit } from '@angular/core';
import { BiddingService } from 'src/app/services/bid.service';
import { Router } from '@angular/router';
import { Bid } from 'src/app/models/bid.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {
  bids: Bid[] = [];
  freelancerId: number =  Number(localStorage.getItem('userId')) || 0;// Replace with actual logged-in freelancer ID

  newBid: Bid = {
    projectId: 0,
    freelancerId: 0,
    amount: 0,
    message: '',
    date: '',
    status: 'pending',
    notificationSent: false
  };

  constructor(private biddingService: BiddingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBids();
    this.loadNotifications(); // Load notifications on init
  }

  fetchBids(): void {
    this.biddingService.getBids().subscribe(data => {
      this.bids = data;
    });
  }

  submitBid(): void {
  this.biddingService.addBid(this.newBid).subscribe({
    next: () => {
      this.newBid = {
        projectId: 0,
        freelancerId: 0,
        amount: 0,
        message: '',
        date: '',
        status: 'pending',
        notificationSent: false
      };
      this.fetchBids();
      Swal.fire('Success!', 'Your bid has been submitted.', 'success');
    },
    error: () => {
      Swal.fire('Error!', 'Failed to submit bid.', 'error');
    }
  });
}


  loadNotifications(): void {
  this.biddingService.getNotificationsByFreelancer(this.freelancerId).subscribe((data) => {
    let updatedCount = 0;
    data.forEach(bid => {
      this.biddingService.markNotificationSent(bid.id!).subscribe(() => {
        updatedCount++;
        if (updatedCount === data.length) {
          Swal.fire('All caught up!', 'Notifications have been cleared.', 'info');
        }
      });
    });
  });
}


 updateStatus(bidId: number, status: string): void {
  this.biddingService.updateBidStatus(bidId, status).subscribe(() => {
    this.fetchBids();
    Swal.fire('Updated!', `Bid status updated to ${status}.`, 'success');
  });
}


 deleteBid(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete this bid.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  }).then(result => {
    if (result.isConfirmed) {
      this.biddingService.deleteBid(id).subscribe({
        next: () => {
          this.fetchBids();
          Swal.fire('Deleted!', 'Bid has been deleted.', 'success');
        },
        error: () => {
          Swal.fire('Error!', 'Failed to delete bid.', 'error');
        }
      });
    }
  });
}

}
