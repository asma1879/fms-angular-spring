import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    user: any;
jobs: any[] = [];
filteredJobs: any[] = [];
selectedSkill: string = '';
latestJobs = [
    {
      id: 1,
      title: 'React Developer Needed for Dashboard App',
      description: 'We need a developer to build a dashboard interface with charts and admin control...',
      skillsRequired: ['React', 'Chart.js', 'REST API']
    },
    {
      id: 2,
      title: 'WordPress Site Customization',
      description: 'Looking for someone to modify an existing theme and optimize performance...',
      skillsRequired: ['WordPress', 'PHP', 'SEO']
    },
    {
      id: 3,
      title: 'Logo Design for FinTech Startup',
      description: 'Design a professional and modern logo for a finance technology company...',
      skillsRequired: ['Adobe Illustrator', 'Branding', 'Creativity']
    }
  ];
  role: string | null = null;

constructor(private jobService: JobService) {}

ngOnInit(): void {
  this.role = localStorage.getItem('role');
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }
  searchText: string = '';
selectedCategory: string = '';

onSearch() {
console.log('Searching for:', this.searchText, 'in category:', this.selectedCategory);
    
// this.jobService.getJobs().subscribe(data => {
// this.jobs = data;
// this.filteredJobs = data;
// });

// }


// filterBySkill(): void {
// if (!this.selectedSkill) {
// this.filteredJobs = this.jobs;
// } else {
// this.filteredJobs = this.jobs.filter(job =>
// Array.isArray(job.skillsRequired) &&
// job.skillsRequired.some((skill: string) =>
// skill.toLowerCase().includes(this.selectedSkill.toLowerCase())
// )
// );
// }
}
}
