import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payment: Payment = {
   
    clientName: '',
    amount: 0,
    paymentDate: '',
    status: ''
  };

  payments: Payment[] = [];
  editingPaymentId: number | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe(data => {
      this.payments = data;
    });
  }

 submitPayment(): void {
  if (this.editingPaymentId !== null) {
    // Update existing payment
    this.paymentService.updatePayment(this.editingPaymentId, this.payment).subscribe(() => {
      this.resetForm();
      this.loadPayments();
    });
  } else {
    // Add new payment
    this.paymentService.addPayment(this.payment).subscribe(() => {
      this.resetForm();
      this.loadPayments();
    });
  }
}
 
  editPayment(payment: Payment): void {
  this.payment = { ...payment };
  this.editingPaymentId = payment.id ?? null;
}

  deletePayment(id: number): void {
    this.paymentService.deletePayment(id).subscribe(() => {
      this.loadPayments();
    });
  }

  resetForm(): void {
    this.payment = {
     
      clientName: '',
      amount: 0,
      paymentDate: '',
      status: ''
    };
    this.editingPaymentId = null;
  }
}
