import { Component, OnInit } from '@angular/core';
import { Bid } from 'src/app/models/bid.model';
import { BiddingService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications : Bid[] = [];
//freelancerId: number = 101; // Replace with actual logged-in user ID
freelancerId: number = Number(localStorage.getItem('userId')) || 0;

  constructor(private biddingService: BiddingService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }
  loadNotifications(): void {
this.biddingService.getNotificationsByFreelancer(this.freelancerId)
.subscribe((bids: Bid[]) => {
this.notifications = bids;
});
}

markAsRead(bidId: number): void {
this.biddingService.markNotificationSent(bidId)
.subscribe(() => {
this.notifications = this.notifications.filter(bid => bid.id !== bidId);
});
}

}
