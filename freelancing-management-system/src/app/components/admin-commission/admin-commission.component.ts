import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-admin-commission',
  templateUrl: './admin-commission.component.html',
  styleUrls: ['./admin-commission.component.css']
})
export class AdminCommissionComponent implements OnInit {
  totalCommission = 0;
  commissions: Transaction[] = [];
  constructor(private walletService: WalletService,private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getCommissions().subscribe(data => {
      this.commissions = data;
    });
     this.walletService.getTotalCommission().subscribe(data => this.totalCommission = data);
  }

}
