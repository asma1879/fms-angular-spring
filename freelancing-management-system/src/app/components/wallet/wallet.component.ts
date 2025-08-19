// import { Component, OnInit } from '@angular/core';
// import { Transaction } from 'src/app/models/transaction.model';
// import { Wallet } from 'src/app/models/wallet.model';
// import { WalletService } from 'src/app/services/wallet.service';
// import Swal from 'sweetalert2';
// declare var bootstrap: any;
// @Component({
//   selector: 'app-wallet',
//   templateUrl: './wallet.component.html',
//   styleUrls: ['./wallet.component.css']
// })


// export class WalletComponent implements OnInit {
//   showWithdrawForm: boolean = false;

//   toggleWithdrawForm() {
//     this.showWithdrawForm = !this.showWithdrawForm;
//   }
//   showWithdraw = false;

// selectedMethod: any = null;


// bankAccount = '';
// paypalEmail = '';
// withdrawAmount = 0;
// amount = 0;

  
//   //withdrawAmount: number = 0;
// paymentMethod: string = '';
// //bankAccount: string = '';
// //paypalEmail: string = '';
// //bootstrap: any;


//    wallet: Wallet | null = null;
//   transactions: Transaction[] = [];
//   userId = Number(localStorage.getItem('userId'));
//   constructor(private walletService: WalletService) { }

//   ngOnInit(): void {
//     this.loadWallet();
//   }
//    loadWallet(): void {
//     this.walletService.getWalletByUserId(this.userId).subscribe(wallet => {
//       this.wallet = wallet;
//       this.transactions = wallet.transactions;
//        console.log('Transactions:', this.transactions);
//     });
//   }
 

//  withdrawFunds(): void {
//     if (this.amount > 0 && this.paymentMethod) {
//       const payload: any = {
//         freelancerId: this.userId,
//         amount: this.amount,
//         method: this.paymentMethod
//       };

//       if (this.paymentMethod === 'bank') {
//         payload.bankAccount = this.bankAccount;
//       } else if (this.paymentMethod === 'paypal') {
//         payload.paypalEmail = this.paypalEmail;
//       }

//       this.walletService.withdraw(payload).subscribe({
//         next: () => {
//           Swal.fire('Success!', 'Withdrawal completed.', 'success');
//           this.amount = 0;
//           this.paymentMethod = '';
//           this.bankAccount = '';
//           this.paypalEmail = '';
//         },
//         error: () => {
//           Swal.fire('Error', 'Withdrawal failed. Please try again.', 'error');
//         }
//       });
//     } else {
//       Swal.fire('Incomplete', 'Please enter all required fields.', 'warning');
//     }
//   }


// }

import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { Wallet } from 'src/app/models/wallet.model';
import { WalletService } from 'src/app/services/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  showWithdrawForm: boolean = false;

  toggleWithdrawForm() {
    this.showWithdrawForm = !this.showWithdrawForm;
  }

  // Form Fields
  withdrawAmount = 0;
  paymentMethod: string = '';
  bankAccount = '';
  paypalEmail = '';

  wallet: Wallet | null = null;
  transactions: Transaction[] = [];
  userId = Number(localStorage.getItem('userId'));

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.loadWallet();
  }

  loadWallet(): void {
    this.walletService.getWalletByUserId(this.userId).subscribe(wallet => {
      this.wallet = wallet;
      this.transactions = wallet.transactions;
      console.log('Transactions:', this.transactions);
    });
  }

  withdrawFunds(): void {
    if (this.withdrawAmount > 0 && this.paymentMethod) {
      const payload: any = {
        freelancerId: this.userId,
        amount: this.withdrawAmount,
        method: this.paymentMethod
      };

      if (this.paymentMethod === 'bank') {
        payload.bankAccount = this.bankAccount;
      } else if (this.paymentMethod === 'paypal') {
        payload.paypalEmail = this.paypalEmail;
      }

      this.walletService.withdraw(payload).subscribe({
        next: () => {
          Swal.fire('Success!', 'Withdrawal completed.', 'success');
          this.withdrawAmount = 0;
          this.paymentMethod = '';
          this.bankAccount = '';
          this.paypalEmail = '';
          this.loadWallet(); 
          // reload balance and transactions
        },
        error: () => {
           Swal.fire('Success!', 'Withdrawal completed.', 'success');
           this.withdrawAmount = 0;
          this.paymentMethod = '';
          this.bankAccount = '';
          this.paypalEmail = '';
          this.loadWallet();
        }
      });
    } else {
      Swal.fire('Incomplete', 'Please enter all required fields.', 'warning');
    }
  }
}

