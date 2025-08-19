import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  role : string | undefined;
  freelancerId: number = 0;
  showProfileForm = false;
   // role:string | undefined;
    // user: User = {
    //   //role : '',
    //   bio: '',
    //   skills: '',
    //   experience: '',
    //   name: ''
    // };
    user: any = {};
  editing = false;
  avatarPreview: string = '';
  selectedAvatarFile: File | null = null;
   walletBalance: number | null = null;
  profileCompletion = 80; // update based on fields filled

  constructor(private http: HttpClient, private userService: UserService,private walletService: WalletService
      ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')?.toLowerCase();
    const storedId = localStorage.getItem('userId'); // e.g., stored during login
    if (storedId) {
      this.freelancerId = +storedId;
      this.loadFreelancerProfile();
    }
     const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);

      this.userService.getUserById(this.user.id).subscribe(data => {
        this.user = data;
        this.loadWalletBalance();

        // Fetch avatar from db.json (json-server)
        this.userService.getAvatarByUserId(this.user.id).subscribe({
          next: (avatar) => {
            this.avatarPreview = avatar.base64;
            this.user.avatar = avatar.base64;
          },
          error: () => {
            this.avatarPreview = 'https://i.pravatar.cc/150?img=5';
          }
        });
      });
    }
    
  }
   loadWalletBalance(): void {
    this.walletService.getWalletBalance(this.user.id).subscribe({
      next: (balance) => this.walletBalance = balance,
      error: () => this.walletBalance = null
    });
  }
  toggleProfileForm() {
  this.showProfileForm = !this.showProfileForm;
}
   loadFreelancerProfile(): void {
    this.http.get<User>(`http://localhost:8080/api/freelancer/profile/${this.freelancerId}`)
      .subscribe((res) => {
        this.user = res;
      }, error => {
        //alert('Error loading profile');
      });
  }

//   updateProfile(): void {
//     this.http.put<User>(`http://localhost:8080/api/freelancer/profile/update/${this.freelancerId}`, this.user)
//       .subscribe((res) => {
//         alert('Profile updated successfully!');
        
//       //   this.user = {
//       //   bio: '',
//       //   skills: '',
//       //   experience: '',
//       //   name: ''
//       // };
//       this.editing = false;
// Swal.fire('Success', 'Profile updated successfully!', 'success');

//       }, error => {
//         alert('Error updating profile');
//       });

      
//   }
//   logout(): void {
//   localStorage.removeItem('user');
//   localStorage.removeItem('userId');
//   localStorage.removeItem('userRole'); // if used
//   window.location.href = '/login';
// }

updateProfile(): void {
  this.http.put<User>(`http://localhost:8080/api/freelancer/profile/update/${this.freelancerId}`, this.user)
    .subscribe({
      next: (res) => {
        this.user = res;
        this.editing = false;
        Swal.fire('Success', 'Profile updated successfully!', 'success');
      },
      error: () => Swal.fire('Error', 'Error updating profile', 'error')
    });
}

 toggleEdit(): void {
    this.editing = !this.editing;
  }

 onAvatarChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedAvatarFile = file;
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview = reader.result as string;
    reader.readAsDataURL(file);
  }
}
  saveChanges(): void {
  if (this.selectedAvatarFile) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      const avatarData = {
        id: this.user.id,
        base64: base64
      };

      this.userService.updateAvatar(this.user.id, avatarData).subscribe({
        next: () => {
          this.user.avatar = base64;
          this.avatarPreview = base64;
          this.updateUserWithSuccess(); // Save to db.json
        },
        error: () => {
          this.userService.createAvatar(avatarData).subscribe({
            next: () => {
              this.user.avatar = base64;
              this.avatarPreview = base64;
              this.updateUserWithSuccess();
            },
            error: () => Swal.fire('Error', 'Failed to save avatar to db.json', 'error')
          });
        }
      });
    };
    reader.readAsDataURL(this.selectedAvatarFile);
  } else {
    this.updateUserWithSuccess();
  }
}


  updateUserWithSuccess(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user = updatedUser;
        this.editing = false;
        Swal.fire('Success', 'Profile updated successfully!', 'success');
      },
      error: () => Swal.fire('Error', 'Failed to update profile', 'error')
    });
  }

getAvatarUrl(): string {
  if (this.avatarPreview?.startsWith('data:image')) {
    return this.avatarPreview;
  } else if (this.user?.avatar?.startsWith('data:image')) {
    return this.user.avatar;
  } else {
    return 'https://i.pravatar.cc/150?img=5';
  }
}




  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  }

  getRoleBadgeClass(): string {
    switch (this.user?.role) {
      case 'admin': return 'bg-danger';
      case 'freelancer': return 'bg-info';
      case 'client': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}
