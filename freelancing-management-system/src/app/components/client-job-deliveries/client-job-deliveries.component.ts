
import { Component, OnInit } from '@angular/core';
import { JobDeliveryService } from 'src/app/services/job-delivery.service';
import { PaymentService } from 'src/app/services/payment.service';

interface JobDelivery {
  jobId: number;
  freelancerId: number;
  clientId: number;
  deliveryDate: string;
  submissionLink: string;
  status: string;
  id?: number;
}

@Component({
  selector: 'app-client-job-deliveries',
  templateUrl: './client-job-deliveries.component.html',
  styleUrls: ['./client-job-deliveries.component.css']
})
export class ClientJobDeliveriesComponent implements OnInit {

  deliveries: JobDelivery[] = [];
  clientId: number = 0;

  constructor(private deliveryService: JobDeliveryService, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.clientId = Number(localStorage.getItem('userId')) || 0;
    if (this.clientId) {
      this.fetchDeliveries();
    } else {
      alert('Client ID not found.');
    }
  }

  fetchDeliveries() {
    this.deliveryService.getDeliveriesByClient(this.clientId)
      .subscribe(data => this.deliveries = data);
  }

  // acceptDelivery(id: number) {
  //   this.deliveryService.approveDelivery(id)
  //     .subscribe(() => {
  //       alert('Delivery approved and payment processed.');
  //       this.fetchDeliveries(); // Refresh
  //     });
  // }
  acceptDelivery(delivery: JobDelivery) {
  if (confirm(`Confirm accepting and paying for delivery #${delivery.id}?`)) {
    const payload = {
      jobId: delivery.jobId,
      clientId: this.clientId,
      freelancerId: delivery.freelancerId
    };
    this.paymentService.completePayment(payload).subscribe(() => {
      alert('Payment to freelancer completed.');
      this.fetchDeliveries(); // Refresh table
    }, () => {
     //alert('Payment failed.');
    });
  }
}


}
