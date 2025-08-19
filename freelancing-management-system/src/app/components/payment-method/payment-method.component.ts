import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   paymentMethod: string = '';
  accountNumber: string = '';

  @Output() paymentDataChange = new EventEmitter<{ paymentMethod: string; accountNumber: string }>();

  onInputChange() {
    this.paymentDataChange.emit({
      paymentMethod: this.paymentMethod,
      accountNumber: this.accountNumber
    });
  }
  
}
