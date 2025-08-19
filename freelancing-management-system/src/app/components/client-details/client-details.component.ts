import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client = {
    name: 'John Doe',
    company: 'TechNova',
    email: 'john@technova.com',
    projects: ['Website Revamp', 'Support Contract']
  };
  constructor() { }

  ngOnInit(): void {
  }

}
