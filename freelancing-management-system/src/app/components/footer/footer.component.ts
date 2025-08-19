import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    role : string | undefined;

  constructor() { }

  ngOnInit(): void {
      //this.role = localStorage.getItem('role');
       this.role = localStorage.getItem('role')?.toLowerCase();
  }

}
