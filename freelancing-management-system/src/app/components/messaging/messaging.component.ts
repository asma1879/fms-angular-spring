// import { Component, OnInit } from '@angular/core';
// import { MessageService } from 'src/app/services/message.service';

// @Component({
//   selector: 'app-messaging',
//   templateUrl: './messaging.component.html',
//   styleUrls: ['./messaging.component.css']
// })
// export class MessagingComponent implements OnInit {
//   messages: any[] = [];

//   constructor(private messagingService: MessageService) {}

//   ngOnInit(): void {
//     this.messagingService.getMessages().subscribe(data => {
//       this.messages = data;
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  messages: Message[] = [];
  newMessage: Partial<Message> = {
    senderId: '',
    receiverId: '',
    content: ''
  };

  constructor(private messagingService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messagingService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    this.messagingService.sendMessage(this.newMessage).subscribe(() => {
      this.newMessage = { senderId: '', receiverId: '', content: '' };
      this.loadMessages();
    });
  }
}

