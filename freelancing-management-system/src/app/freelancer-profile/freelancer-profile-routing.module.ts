import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobDeliveryComponent } from './job-delivery/job-delivery.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NotificationComponent } from './notification/notification.component';
import { FreelancerEarningsComponent } from '../components/freelancer-earnings/freelancer-earnings.component';

const routes: Routes = [

  {
    path: '',
    component: FreelancerProfileComponent,
    children: [
      { path: 'my-jobs', component: MyJobsComponent },
      { path: 'job-delivery', component: JobDeliveryComponent },
      { path: 'earnings', component: FreelancerEarningsComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: '', redirectTo: 'my-jobs', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerProfileRoutingModule {
 
 }
