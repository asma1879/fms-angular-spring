import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  // clients: Client[] = [];
  // client: Client = { name: '', email: '', company: '', contact: '' };
  // editingClientId: number | null = null;
  // role : string | undefined;

  constructor(private clientService: ClientService) { }
clients: Client[] = [];
  client: Client = this.getEmptyClient();
  editingClientId: number | null = null;
  role: string = 'client'; // assume based on login

  ngOnInit(): void {
    // Load existing clients from backend (later)
    this.loadClients();
  }

  getEmptyClient(): Client {
    return {
      name: '',
      email: '',
      company: '',
      contact: '',
      location: '',
      totalProjects: 0,
      totalSpent: 0,
      rating: 0,
      verified: false,
      memberSince: ''
    };
  }

  submitClient() {
    if (this.editingClientId !== null) {
      const index = this.clients.findIndex(c => c.id === this.editingClientId);
      if (index !== -1) {
        this.clients[index] = { ...this.client, id: this.editingClientId };
      }
    } else {
      const newClient = { ...this.client, id: Date.now() }; // mock ID
      this.clients.push(newClient);
    }
    this.resetForm();
  }

  editClient(client: Client) {
    this.client = { ...client };
    this.editingClientId = client.id ?? null;
  }

  deleteClient(id: number) {
    this.clients = this.clients.filter(c => c.id !== id);
    this.resetForm();
  }

  resetForm() {
    this.client = this.getEmptyClient();
    this.editingClientId = null;
  }

  loadClients() {
    // Mock data
    this.clients = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        company: 'TechNova Ltd.',
        contact: '+8801122334455',
        location: 'Dhaka, Bangladesh',
        totalProjects: 5,
        totalSpent: 1200,
        rating: 4.7,
        verified: true,
        memberSince: '2023-04-01'
      }
    ];
  }

}
