import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-freelancer-earnings',
  templateUrl: './freelancer-earnings.component.html',
  styleUrls: ['./freelancer-earnings.component.css']
})
export class FreelancerEarningsComponent implements OnInit {
  userId = Number(localStorage.getItem('userId'));
  earnings = 0;
  
  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getEarnings(this.userId).subscribe(data => this.earnings = data);
  
  }

}
