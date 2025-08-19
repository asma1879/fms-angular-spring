import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerProfileRoutingModule } from './freelancer-profile-routing.module';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobDeliveryComponent } from './job-delivery/job-delivery.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    FreelancerProfileComponent,
    MyJobsComponent,
    JobDeliveryComponent,
    WishlistComponent,
    NotificationComponent,
    
  ],
  imports: [
    CommonModule,
    FreelancerProfileRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class FreelancerProfileModule { }
