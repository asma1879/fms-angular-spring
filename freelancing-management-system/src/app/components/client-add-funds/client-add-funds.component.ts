import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-add-funds',
  templateUrl: './client-add-funds.component.html',
  styleUrls: ['./client-add-funds.component.css']
})
export class ClientAddFundsComponent implements OnInit {
//     paymentMethod: string = '';
// paymentCode: string = '';
// //amount: number = 0;
//    amount = 0;

 paymentMethod = '';
  cardNumber = '';
  cardExpiry = '';
  cardCVV = '';
  paypalEmail = '';
  mobileWalletNumber = '';
  paymentCode = '';
  amount = 0;
  userId = Number(localStorage.getItem('userId'));

  constructor(private walletService: WalletService) { }
  addFunds(): void {
  if (this.amount > 0) {
    this.walletService.addFunds(this.userId, this.amount,this.paymentMethod,this.paymentCode).subscribe({
      next: () => {
        Swal.fire('Success!', 'Funds added successfully.', 'success');
        this.amount = 0;
        this.paymentMethod ='';
        this.paymentCode ='';
      },
      error: () => {
        Swal.fire('Error!', 'Failed to add funds. Try again.', 'error');
      }
    });
  } else {
    Swal.fire('Invalid Amount', 'Please enter an amount greater than zero.', 'warning');
  }
}
 onPaymentDataChange(data: { paymentMethod: string; paymentCode: string }) {
  this.paymentMethod = data.paymentMethod;
  this.paymentCode = data.paymentCode;
}

  ngOnInit(): void {
  }

}
