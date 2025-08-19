import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freelancer-details',
  templateUrl: './freelancer-details.component.html',
  styleUrls: ['./freelancer-details.component.css']
})
export class FreelancerDetailsComponent implements OnInit {
  freelancer = {
    name: 'Emily Carter',
    skills: ['Angular', 'Node.js', 'Bootstrap'],
    rating: 4.8
  };
  constructor() { }

  ngOnInit(): void {
  }

}
