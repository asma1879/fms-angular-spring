import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMsg = '';
  slides = [
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg',
    'assets/images/slide1.jpg'
  ];
   currentSlide = 0;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000); // Change every 5 seconds
  }

 onLogin() {
  this.userService.login(this.loginData.email, this.loginData.password).subscribe(
    user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('role', user.role);

        Swal.fire('Success!', 'You have logged in successfully.', 'success').then(() => {
          this.router.navigate(['/dashboard']);
        });
      } else {
        Swal.fire('Login Failed', 'Invalid email or password.', 'error');
      }
    },
    error => {
      Swal.fire('Server Error', 'Something went wrong. Please try again later.', 'error');
    }
  );
}

  }
  
    
  

