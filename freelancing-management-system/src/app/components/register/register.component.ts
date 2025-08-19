import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerData = { name: '',
  email: '',
  password: '',
  role: '',  // default, or you can allow selection
  avatar: '',
  bio: '',
  skills: '',
   country: 'Bangladesh',
  experience: '' };

  countries: string[] = [
  'Bangladesh', 'India', 'United States', 'United Kingdom', 'Canada',
  'Australia', 'Germany', 'France', 'Italy', 'Netherlands',
  'Pakistan', 'Nepal', 'Sri Lanka', 'China', 'Japan', 'South Korea'
];


  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    // this.userService.register(this.registerData).subscribe(() => {
    //   this.router.navigate(['/login']);
     this.userService.register(this.registerData).subscribe(user => {
    console.log('User registered:', user);  // Confirm `id` is returned
    this.router.navigate(['/login']);
    });
  }
}
