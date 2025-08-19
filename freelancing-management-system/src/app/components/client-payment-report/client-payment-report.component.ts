import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-client-payment-report',
  templateUrl: './client-payment-report.component.html',
  styleUrls: ['./client-payment-report.component.css']
})
export class ClientPaymentReportComponent implements OnInit {
 reports: any[] = [];
  clientId: number = 0;
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
   // this.clientId = Number(localStorage.getItem('clientId')) || 21;
    this.clientId = Number(localStorage.getItem('userId')) || 0;
    this.paymentService.getReportsByClient(this.clientId).subscribe(
      data => this.reports = data,
      err => console.error('Failed to fetch reports', err)
    );
  }
  }


