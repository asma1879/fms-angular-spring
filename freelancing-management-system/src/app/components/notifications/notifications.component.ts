// import { Component, OnInit } from '@angular/core';

// @Component({
// selector: 'app-notifications',
// templateUrl: './notifications.component.html',
// styleUrls: ['./notifications.component.css']
// })
// export class NotificationsComponent implements OnInit {
// notifications = [
// { message: 'New job posted: Build an Angular App', time: '2 min ago' },
// { message: 'Client accepted your proposal', time: '10 min ago' },
// { message: 'Contract signed with DesignCo', time: '1 hour ago' }
// ];

// constructor() {}

// ngOnInit(): void {}
// }

import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';

@Component({
selector: 'app-notifications',
templateUrl: './notifications.component.html',
styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

notifications: Notification[] = [];

constructor(private notificationService: NotificationService) {}

ngOnInit(): void {
this.fetchNotifications();
}

fetchNotifications(): void {
this.notificationService.getNotifications().subscribe(data => {
this.notifications = data;
});
}
}