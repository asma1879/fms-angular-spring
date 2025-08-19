import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
 //freelancerId = 5; // Replace with actual logged-in user ID
 freelancerId: number = Number(localStorage.getItem('userId')) || 0;
  jobs: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.jobService.getJobsByFreelancerId(this.freelancerId).subscribe(data => {
    //   this.myJobs = data;
    // });

     this.http.get<any[]>(`http://localhost:8080/api/bids/freelancer-jobs/${this.freelancerId}`)
      .subscribe(data => {
        this.jobs = data;
      });
  }

  getDaysLeft(deadline: string): number {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
}

getStars(rating: number): number[] {
  return [1, 2, 3, 4, 5];
}


}
