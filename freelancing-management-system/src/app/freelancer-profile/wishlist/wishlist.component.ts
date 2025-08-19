import { Component, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/models/wishlist.model';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

//   wishlist: Wishlist[] = [];
// newWish: Wishlist = {
// userId: Number(localStorage.getItem('userId')),
// jobId: 0,
// addedDate: ''
// };

wishlistItems: Wishlist[] = [];
  freelancerId: number = 0;
  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    //this.fetchWishlist();
     const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.freelancerId = user?.id || 0;

    if (this.freelancerId) {
      this.loadWishlist();
    }
}

// fetchWishlist() {
// this.service.getAll().subscribe(data => this.wishlist = data);
// }

// addWish() {
// this.service.add(this.newWish).subscribe(() => {
// this.fetchWishlist();
// this.newWish = { userId: 0, jobId: 0, addedDate: '' };
// });
// }

// removeWish(id: number) {
// this.service.remove(id).subscribe(() => this.fetchWishlist());
// }

loadWishlist(): void {
    this.wishlistService.getWishlist(this.freelancerId).subscribe(data => {
      this.wishlistItems = data;
    });
  }

 removeItem(id: number): void {
    Swal.fire({
      title: 'Remove from wishlist?',
      text: 'Are you sure you want to remove this job?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.wishlistService.deleteWishlist(id).subscribe(() => {
          this.loadWishlist();
          Swal.fire('Removed', 'Job removed from wishlist.', 'success');
        });
      }
    });
  }
  }


