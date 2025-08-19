import { Component, Input,OnInit } from '@angular/core';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input() theme: string = 'light-mode';
notifications: { id: number, message: string }[] = [];
searchQuery: string = '';
role : string | undefined;
ngOnInit(): void {
// Simulate fetching notifications (you could use a service here)
 this.role = localStorage.getItem('role')?.toLowerCase();
this.notifications = [
{ id: 1, message: 'New bid received on your project.' },
{ id: 2, message: 'Your contract has been approved.' },
{ id: 3, message: 'You have a new message from John Doe.' }
];
}

messages = [
    { from: 'Client A', content: 'Can you send me the invoice?', time: '2h ago' },
    { from: 'Freelancer B', content: 'Updated designs attached!', time: '4h ago' },
    { from: 'Client C', content: 'Timeline approved.', time: '6h ago' }
  ];
  onSearch(): void {
    if (this.searchQuery.trim()) {
    console.log('Searching for:', this.searchQuery);
    // You can later integrate this with a search results page or filter logic
    }
    }
  
toggleTheme() {
document.body.classList.toggle('dark-mode');
this.theme = this.theme === 'light-mode' ? 'dark-mode' : 'light-mode';
}
}