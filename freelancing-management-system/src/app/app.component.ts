import { Component } from '@angular/core';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
theme: string = 'light-mode';

toggleTheme() {
this.theme = this.theme === 'light-mode' ? 'dark-mode' : 'light-mode';
}
}