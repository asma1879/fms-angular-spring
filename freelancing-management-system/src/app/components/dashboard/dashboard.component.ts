// import { Component, OnInit } from '@angular/core';

// @Component({
// selector: 'app-dashboard',
// templateUrl: './dashboard.component.html'
// })
// export class DashboardComponent implements OnInit {
// userRole: string = '';
// userName: string = '';

// stats = {
// totalProjects: 12,
// activeContracts: 5,
// pendingPayments: 3,
// messages: 7
// };

// ngOnInit(): void {
// const user = JSON.parse(localStorage.getItem('user') || '{}');
// this.userRole = user.role;
// this.userName = user.name;
// }
// }

import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';
//import { UserService } from '../services/user.service';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
userRole: string = '';
userName: string = '';
userId: number = 0;

stats = {
totalProjects: 0,
activeContracts: 0,
pendingPayments: 0,
messages: 0
};

// public barChartLabels: string[] = [];
//   public barChartData: { data: number[]; label: string }[] = [
//     { data: [], label: 'Jobs Posted' }
//   ];
//   public barChartOptions = {
//     responsive: true
//   };
//   public barChartType = 'bar';

constructor(private userService: UserService,private dashboardService: DashboardService) {}

ngOnInit(): void {
const user = JSON.parse(localStorage.getItem('user') || '{}');
this.userRole = user.role || '';
this.userName = user.name || 'User';
this.userId = user.id || 0;

if (this.userId) {
  this.loadDashboardStats(this.userId);
}
}

loadDashboardStats(userId: number): void {
this.userService.getDashboardStats(userId).subscribe(data => {
this.stats = data;
});
//  this.dashboardService.getJobsPerMonth().subscribe(data => {
//       this.barChartLabels = data.map(d => this.getMonthName(d.month));
//       this.barChartData[0].data = data.map(d => d.count);
//     });
  }

  // getMonthName(monthNumber: number): string {
  //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //   return months[monthNumber - 1] || 'Unknown';
  // }
}

