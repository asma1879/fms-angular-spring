// import { Component, OnInit } from '@angular/core';
// import { ClientService } from '../../services/client.service';

// @Component({
// selector: 'app-clients',
// templateUrl: './clients.component.html'
// })
// export class ClientsComponent implements OnInit {
// clients: any[] = [];

// constructor(private clientService: ClientService) {}

// ngOnInit() {
// this.clientService.getClients().subscribe(data => {
// this.clients = data;
// });
// }
// }

import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  client: Client = { name: '', email: '', company: '', contact: '' };
  editingClientId: number | null = null;
  //role : string | undefined;
  walletBalance: number = 0;
totalJobs: number = 0;
totalBids: number = 0;


  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
   // this.role = localStorage.getItem('role')?.toLowerCase();

  }

  loadClients(): void {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  submitClient(): void {
    if (this.editingClientId) {
      this.clientService.addClient({ ...this.client, id: this.editingClientId }).subscribe(() => {
        this.loadClients();
        this.resetForm();
      });
    } else {
      this.clientService.addClient(this.client).subscribe(() => {
        this.loadClients();
        this.resetForm();
      });
    }
  }

  editClient(c: Client): void {
    this.client = { ...c };
    this.editingClientId = c.id!;
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(() => this.loadClients());
  }

  resetForm(): void {
    this.client = { name: '', email: '', company: '', contact: '' };
    this.editingClientId = null;
  }
}
