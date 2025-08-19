import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FreelancerComponent } from './components/freelancer/freelancer.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { BiddingComponent } from './components/bidding/bidding.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServicesComponent } from './components/services/services.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobService } from './services/job.service';
import { JobPostComponent } from './components/job-post/job-post.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FreelancerProfileModule } from './freelancer-profile/freelancer-profile.module';
import { ClientJobBidsComponent } from './components/client-job-bids/client-job-bids.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { ClientsJobListComponent } from './components/clients/clients-job-list/clients-job-list.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { ClientJobDeliveriesComponent } from './components/client-job-deliveries/client-job-deliveries.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ClientAddFundsComponent } from './components/client-add-funds/client-add-funds.component';
import { FreelancerEarningsComponent } from './components/freelancer-earnings/freelancer-earnings.component';
import { AdminCommissionComponent } from './components/admin-commission/admin-commission.component';
import { NewProfileComponent } from './components/new-profile/new-profile.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ClientPaymentReportComponent } from './components/client-payment-report/client-payment-report.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FreelancerProjectsComponent } from './components/freelancer-projects/freelancer-projects.component';
import { JobDeliveryReportComponentComponent } from './components/job-delivery-report-component/job-delivery-report-component.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
//import { FreelancerComponent } from './components/freelancers/freelancers.component';
//import { FreelancerComponent } from './components/freelancer/freelancer.component';
//import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    FreelancerComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ClientsComponent,
    PaymentsComponent,
    BiddingComponent,
    ProfileComponent,
    MessagingComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent,
    JobListComponent,
    JobPostComponent,
    ProjectsComponent,
    NotificationsComponent,
    ReviewsComponent,
    CalendarComponent,
    ResourcesComponent,
    SettingsComponent,
    ClientJobBidsComponent,
    BrowseJobsComponent,
    ClientsJobListComponent,
    MainLayoutComponent,
    BlankLayoutComponent,
    ClientJobDeliveriesComponent,
    WalletComponent,
    ClientAddFundsComponent,
    FreelancerEarningsComponent,
    AdminCommissionComponent,
    NewProfileComponent,
    ClientProfileComponent,
    PaymentMethodComponent,
    ClientPaymentReportComponent,
    LandingComponent,
    FreelancerProjectsComponent,
    JobDeliveryReportComponentComponent,
    DashboardChartComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FreelancerProfileModule,
    ReactiveFormsModule,
    NgChartsModule
    
    
  ],
  providers: [AuthGuard,RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
