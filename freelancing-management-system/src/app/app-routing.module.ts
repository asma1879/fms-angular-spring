

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     //canActivate: [AuthGuard,RoleGuard],
//     //data: { roles: ['admin', 'freelancer', 'client'] }
//   },
//   {
//      path: 'clients', 
//   component: ClientsComponent,
//   children: [
//     // other client sub-routes here, if any
//     { path: 'job-bids', component: ClientJobBidsComponent }
//   ]
//   },
//    {
//     path: 'freelancers',
//     component: FreelancerComponent,
//     //canActivate: [AuthGuard,RoleGuard],
//     //data: { roles: ['admin'] }
//   },
//   {
//     path: 'projects',
//     component: ProjectsComponent,
//   //canActivate: [AuthGuard,RoleGuard],
//   // data: { roles: ['admin', 'freelancer'] }
//   },
//   {
//     path: 'contracts',
//     component: ContractsComponent,
//     //canActivate: [AuthGuard,RoleGuard],
//     //data: { roles: ['admin', 'client'] }
//   },
//   {
//     path: 'client-details/:id',
//     component: ClientDetailsComponent,
//   // canActivate: [AuthGuard,RoleGuard],
//     //data: { roles: ['admin', 'client'] }
//   },
//   {
//     path: 'freelancer-details/:id',
//     component: FreelancerDetailsComponent,
//     //canActivate: [AuthGuard,RoleGuard],
//    // data: { roles: ['admin', 'freelancer'] }
//   },
//   {
//     path: 'payment',
//     component: PaymentsComponent,
//     //canActivate: [AuthGuard,RoleGuard],
//     //data: { roles: ['admin', 'client'] }
//   },
//   { path: 'notifications', component: NotificationsComponent },
//   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
//   { path: 'freelancer-profile', component: FreelancerProfileComponent },


// { path: 'jobs', component: JobListComponent },
// { path: 'post-job', component: JobPostComponent },
// { path: 'reviews', component: ReviewsComponent },
// { path: 'calendar', component: CalendarComponent },
// { path: 'resources', component: ResourcesComponent },
// { path: 'settings', component: SettingsComponent },
// { path: 'bidding', component: BiddingComponent },
// { path: 'messaging', component: MessagingComponent },
// { path: 'browse-jobs', component: BrowseJobsComponent },




//   { path: '**', redirectTo: '' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

// All your existing components
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { FreelancerDetailsComponent } from './components/freelancer-details/freelancer-details.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FreelancerComponent } from './components/freelancer/freelancer.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile/freelancer-profile.component';
import { ClientJobBidsComponent } from './components/client-job-bids/client-job-bids.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { MyJobsComponent } from './freelancer-profile/my-jobs/my-jobs.component';
import { JobDeliveryComponent } from './freelancer-profile/job-delivery/job-delivery.component';
import { WishlistComponent } from './freelancer-profile/wishlist/wishlist.component';
import { NotificationComponent } from './freelancer-profile/notification/notification.component';
import { ClientJobDeliveriesComponent } from './components/client-job-deliveries/client-job-deliveries.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ClientAddFundsComponent } from './components/client-add-funds/client-add-funds.component';
import { FreelancerEarningsComponent } from './components/freelancer-earnings/freelancer-earnings.component';
import { AdminCommissionComponent } from './components/admin-commission/admin-commission.component';
import { NewProfileComponent } from './components/new-profile/new-profile.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ClientPaymentReportComponent } from './components/client-payment-report/client-payment-report.component';
import { AboutComponent } from './components/about/about.component';
import { FreelancerProjectsComponent } from './components/freelancer-projects/freelancer-projects.component';
import { JobDeliveryReportComponentComponent } from './components/job-delivery-report-component/job-delivery-report-component.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: MainLayoutComponent,
//     children: [
//       { path: '', component: HomeComponent },
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'clients', component: ClientsComponent },
//       { path: 'clients-profile', component: ClientProfileComponent },
//       { path: 'job-bids', component: ClientJobBidsComponent },
//       { path: 'client-deliveries', component: ClientJobDeliveriesComponent },
//        { path: 'wallet', component: WalletComponent },
//       { path: 'add-funds', component: ClientAddFundsComponent },
//      { path: 'earnings', component: FreelancerEarningsComponent },
//      { path: 'admin/commission', component: AdminCommissionComponent },
//      // other existing routes like /login, /dashboard etc.
//     { path: 'my-jobs', component: MyJobsComponent },
//      { path: 'job-delivery', component: JobDeliveryComponent },
//     { path: 'freelancers', component: FreelancerComponent }, // New
//       { path: 'profile', component: NewProfileComponent },
//     { path: 'earnings', component: FreelancerEarningsComponent },
//     { path: 'wishlist', component: WishlistComponent },
//     { path: 'notifications', component: NotificationComponent },
//       { path: 'freelancers', component: FreelancerComponent },
//       { path: 'projects', component: ProjectsComponent },
//       { path: 'contracts', component: ContractsComponent },
//       { path: 'client-details/:id', component: ClientDetailsComponent },
//       { path: 'freelancer-details/:id', component: FreelancerDetailsComponent },
//        { path: 'payment-method', component: PaymentMethodComponent },
//       { path: 'payment', component: PaymentsComponent },
//        { path: 'client/payment-reports', component: ClientPaymentReportComponent },
//       { path: 'profile', component: ProfileComponent },
//      // { path: 'freelancer-profile', component: FreelancerProfileComponent },
//      { path: 'freelancer-profile',
//   component: FreelancerProfileComponent,
//   children: [
//     { path: 'my-jobs', component: MyJobsComponent },
//     { path: 'job-delivery', component: JobDeliveryComponent },
//     { path: 'freelancers', component: FreelancerComponent }, // New
//       { path: 'profile', component: NewProfileComponent },
//     { path: 'earnings', component: FreelancerEarningsComponent },
//     { path: 'wishlist', component: WishlistComponent },
//     { path: 'notifications', component: NotificationComponent },
//     { path: '', redirectTo: 'my-jobs', pathMatch: 'full' }
//   ]},
//       { path: 'jobs', component: JobListComponent },
//       { path: 'post-job', component: JobPostComponent },
//       { path: 'notifications', component: NotificationsComponent },
//       { path: 'reviews', component: ReviewsComponent },
//       { path: 'calendar', component: CalendarComponent },
//       { path: 'resources', component: ResourcesComponent },
//       { path: 'settings', component: SettingsComponent },
//       { path: 'bidding', component: BiddingComponent },
//       { path: 'messaging', component: MessagingComponent },
//       { path: 'browse-jobs', component: BrowseJobsComponent },
//     ]
//   },
//   {
//     path: '',
//     component: BlankLayoutComponent,
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'register', component: RegisterComponent }
//     ]
//   },
//   { path: '**', redirectTo: '' }
// ];

const routes: Routes = [
  // Public routes (no sidebar/header)
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },  // default to login
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'about', component: AboutComponent },
     // { path: 'blog', component: BlogComponent },
      //{ path: 'contact', component: ContactComponent }
    ]
  },

  // Authenticated/private routes (with sidebar/header)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard-chart', component: DashboardChartComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients-profile', component: ClientProfileComponent },
      { path: 'job-bids', component: ClientJobBidsComponent },
      { path: 'client-deliveries', component: ClientJobDeliveriesComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'add-funds', component: ClientAddFundsComponent },
      { path: 'earnings', component: FreelancerEarningsComponent },
      { path: 'admin/commission', component: AdminCommissionComponent },
      { path: 'my-jobs', component: MyJobsComponent },
      { path: 'job-delivery', component: JobDeliveryComponent },
      { path: 'freelancers', component: FreelancerComponent },
      { path: 'profile', component: NewProfileComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'contracts', component: ContractsComponent },
      { path: 'client-details/:id', component: ClientDetailsComponent },
      { path: 'freelancer-details/:id', component: FreelancerDetailsComponent },
      { path: 'payment-method', component: PaymentMethodComponent },
      { path: 'payment', component: PaymentsComponent },
      { path: 'client/payment-reports', component: ClientPaymentReportComponent },
      { path: 'jobs', component: JobListComponent },
      { path: 'post-job', component: JobPostComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'bidding', component: BiddingComponent },
      { path: 'messaging', component: MessagingComponent },
      { path: 'posted-jobs', component: BrowseJobsComponent },
      { path: 'freelancer-profile/:id', component: FreelancerComponent },
      { path: 'freelancer-project', component: FreelancerProjectsComponent },
      { path: 'delivery-report', component: JobDeliveryReportComponentComponent },

      {
        path: 'freelancer-profile',
        component: FreelancerProfileComponent,
        children: [
          { path: 'my-jobs', component: MyJobsComponent },
          { path: 'job-delivery', component: JobDeliveryComponent },
          { path: 'freelancers', component: FreelancerComponent },
          { path: 'profile', component: NewProfileComponent },
          { path: 'earnings', component: FreelancerEarningsComponent },
          { path: 'wishlist', component: WishlistComponent },
          { path: 'notifications', component: NotificationComponent },
          { path: '', redirectTo: 'my-jobs', pathMatch: 'full' }
        ]
      }
    ]
  },

  // Wildcard
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

