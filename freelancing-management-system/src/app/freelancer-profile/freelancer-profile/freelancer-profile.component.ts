import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
//import { User } from 'src/app/models/project.model';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit {
  section: string = 'jobs'; // Default section

showSection(name: string) {
  this.section = name;
}

  freelancerId: number = 0;
 // role:string | undefined;
  user: User = {
    //role : '',
    bio: '',
    skills: '',
    experience: '',
    name: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
//     const storedId2 = localStorage.getItem('userId');
// console.log('stored userId =', storedId2);
  //   const currentUserStr = localStorage.getItem('currentUser');
  // if (currentUserStr) {
  //   const currentUser = JSON.parse(currentUserStr);
  //   this.freelancerId = currentUser?.id;

  //   if (this.freelancerId) {
  //     this.loadFreelancerProfile();
  //   } else {
  //     alert('Invalid user ID');
  //   }
  // } else {
  //   alert('User not logged in');
  // }
  
   // this.role = localStorage.getItem('role')?.toLowerCase();

    const storedId = localStorage.getItem('userId'); // e.g., stored during login
    if (storedId) {
      this.freelancerId = +storedId;
      this.loadFreelancerProfile();
    }
  }

  loadFreelancerProfile(): void {
    this.http.get<User>(`http://localhost:8080/api/freelancer/profile/${this.freelancerId}`)
      .subscribe((res) => {
        this.user = res;
      }, error => {
        alert('Error loading profile');
      });
  }

  updateProfile(): void {
    this.http.put<User>(`http://localhost:8080/api/freelancer/profile/update/${this.freelancerId}`, this.user)
      .subscribe((res) => {
        alert('Profile updated successfully!');
        
        this.user = {
        bio: '',
        skills: '',
        experience: '',
        name: ''
      };
      }, error => {
        alert('Error updating profile');
      });

      
  }
  logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole'); // if used
  window.location.href = '/login';
}
}
