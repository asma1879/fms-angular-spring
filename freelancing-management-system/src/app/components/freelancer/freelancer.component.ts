import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { Freelancer } from 'src/app/models/project.model';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
//import { Freelancer } from '../../models/freelancer.model';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.css']
})
export class FreelancerComponent implements OnInit {
freelancers: User[] = [];
  // freelancers: Freelancer[] = [];
  // newFreelancer: Freelancer = { id: 0, name: '', skill: '', hourlyRate: 0,experience: 0 };
  // role : string | undefined;
   //freelancers: User[] = [];
  reviewFormMap: { [freelancerId: number]: FormGroup } = {};
  reviewsMap: { [freelancerId: number]: Review[] } = {};


  constructor(private userService: UserService,
    private fb: FormBuilder,
    private reviewService: ReviewService) {}

  ngOnInit(): void {
    // this.loadFreelancers();
    //  this.role = localStorage.getItem('role')?.toLowerCase();
     this.userService.getFreelancers().subscribe(data => {
      this.freelancers = data;
    });
  }

//   loadFreelancers() {
//     this.freelancerService.getFreelancers().subscribe(data => {
//       this.freelancers = data;
//     });
//   }

//   addFreelancer() {
//     if (!this.newFreelancer.name || !this.newFreelancer.skill) return;
//     this.freelancerService.addFreelancer(this.newFreelancer).subscribe(data => {
//       this.freelancers.push(data);
//       this.newFreelancer = { id: 0, name: '', skill: '', hourlyRate: 0, experience: 0};
//     });
//   }

//   hireFreelancer(freelancer: any) {
//   // এটি একটি সিম্পল আলার্ট, বাস্তবে এটি Backend-এ হায়ার ইনফো পাঠাবে
//   const clientId = 1; // বর্তমান লগইন ক্লায়েন্ট আইডি (ডাইনামিক করতে পারো)
  
//   const hireData = {
//     clientId: clientId,
//     freelancerId: freelancer.id,
//     freelancerName: freelancer.name,
//     status: 'hired',
//     hiredAt: new Date()
//   };

//   this.http.post('http://localhost:8080/api/hired', hireData).subscribe(
//     () => {
//       alert(`You have successfully hired ${freelancer.name}!`);
//     },
//     (error) => {
//       console.error('Hiring failed', error);
//       alert('Failed to hire freelancer.');
//     }
//   );
// }
 leaveReview(freelancer: User): void {
    alert(`Leave review for ${freelancer.fullName}`);
    // You can replace this with modal logic later
  }
}
