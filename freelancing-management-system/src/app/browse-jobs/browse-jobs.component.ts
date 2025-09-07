import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobService } from '../services/job.service';
import { Bid } from '../models/bid.model';
import { BiddingService } from '../services/bid.service';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.css']
})
export class BrowseJobsComponent implements OnInit {
  jobs: Job[] = [];
  keyword: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  categories: string[] = ['Web Development', 'Design', 'Marketing', 'Writing'];
  selectedJobId: number | null = null;
  bids: Bid[] = [];

  constructor(
    private jobService: JobService,
    private bidService: BiddingService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    const filters = {
      keyword: this.keyword,
      category: this.selectedCategory,
      status: this.selectedStatus
    };

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const clientId = user?.id;

    this.jobService.bgetJobs(filters).subscribe(data => {
      
      this.jobs = data.filter((job: Job) => job.clientId === clientId);

      
      this.jobs = this.jobs.sort((a, b) => {
        if (a.status === 'OPEN' && b.status !== 'OPEN') return -1;
        if (a.status !== 'OPEN' && b.status === 'OPEN') return 1;
        return 0;
      });
    });
  }

  onFilterChange(): void {
    this.loadJobs();
  }

  closeJob(jobId: number) {
    this.jobService.closeJob(jobId).subscribe(() => {
      this.jobs = this.jobs.map(job =>
        job.id === jobId ? { ...job, status: 'Closed' } : job
      );
    });
  }

  viewBids(jobId: number): void {
    if (this.selectedJobId === jobId) {
      this.selectedJobId = null;
      this.bids = [];
      return;
    }

    this.selectedJobId = jobId;
    this.bidService.getBidsByJobId(jobId).subscribe(
      data => (this.bids = data),
      error => {
        console.error('Error loading bids:', error);
        this.bids = [];
      }
    );
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(jobId).subscribe(() => {
        this.jobs = this.jobs.filter(job => job.id !== jobId);
      });
    }
  }

  editJob(jobId: number): void {
    window.location.href = `/edit-job/${jobId}`;
  }
}
