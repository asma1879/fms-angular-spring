import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
theme: string = 'light-mode';
role : string | undefined;
 publicRoutes = ['/', '/login', '/register', '/about', '/blog'];
  isPublicPage = false;
  constructor(private router: Router) {
    
   }
   

  ngOnInit(): void {
    this.role = localStorage.getItem('role')?.toLowerCase();
     this.router.events.subscribe(() => {
      this.isPublicPage = this.publicRoutes.includes(this.router.url);
    });
  

  }


toggleTheme() {
this.theme = this.theme === 'light-mode' ? 'dark-mode' : 'light-mode';
}
}
