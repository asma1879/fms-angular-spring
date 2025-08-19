import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
selector: 'app-job-post',
templateUrl: './job-post.component.html'
})
export class JobPostComponent {
jobData = {
title: '',

description: '',
category : '',
//budget: 0,
 budgetType: '',     // 'Fixed' or 'Hourly'
  budget: 0,          // Only for Fixed
  hourlyRate: 0, 
  duration: 0,     // Only for Hourly
deadline: '',
skillsRequired: [] as string[],
clientId: 0,
status : 'OPEN'

};

skills: string = '';

constructor(private jobService: JobService, private router: Router) {}

onSubmit() {
   if (this.jobData.budgetType === 'Hourly') {
    this.jobData.budget = this.jobData.hourlyRate;}
// Simulate client ID from logged-in user
const user = JSON.parse(localStorage.getItem('user') || '{}');
this.jobData.clientId = user?.id ?? 0;

this.jobData.skillsRequired = this.skills.split(',').map(s => s.trim());




this.jobService.postJob(this.jobData).subscribe(() => {
  this.router.navigate(['/posted-jobs']);
});
}
}