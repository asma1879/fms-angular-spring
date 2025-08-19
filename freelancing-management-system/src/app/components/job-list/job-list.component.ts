import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { BiddingService } from 'src/app/services/bid.service';
import { Bid } from 'src/app/models/bid.model';
import { Job } from 'src/app/models/job.model';
import Swal from 'sweetalert2';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Wishlist } from 'src/app/models/wishlist.model';
declare var bootstrap: any; // Declare bootstrap JS variable

@Component({
selector: 'app-job-list',
templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {
 // bjobs: any[] = [];
    keyword: string = '';
    selectedCategory: string = '';
    selectedStatus: string = '';
    categories: string[] = ['Web Development', 'Marketing','Web Development',

'Mobile Development',

'Backend Development',

'AI/ML',

'Design',

'UI/UX Design',

'CMS/WordPress',

'Data Science',

'Content Writing',

'Digital Marketing'

];
  
jobs: any[] = [];
job: Job | undefined;
jobId? : number;
bids: Bid[] = [];

fetchBids(): void {
  this.biddingService.getBids().subscribe(data => {
    this.bids = data;
  });
}


bidMessage: string = '';
  bidAmount: number | null = null;
  selectedJobId: number | null = null;
  bidModal: any;

constructor( private jobService: JobService,
    private biddingService: BiddingService,
  private wishlistService: WishlistService) {}

ngOnInit() {
 // this.loadJobs();
   this.fetchBids();

 this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
       this.jobs.sort((a, b) => {
    if (a.status === 'OPEN' && b.status !== 'OPEN') return -1;
    if (a.status !== 'OPEN' && b.status === 'OPEN') return 1;
    return 0;
  });


      this.jobService.getJobById(this.jobId!).subscribe(data => this.job = data);
    });

    // Initialize bootstrap modal after view init
    setTimeout(() => {
      const modalEl = document.getElementById('bidModal');
      if (modalEl) {
        this.bidModal = new bootstrap.Modal(modalEl);
      }
    }, 0);
//     this.jobs.sort((a, b) => {
//   // Sort by status: "OPEN" comes before "CLOSED"
//   if (a.status === 'OPEN' && b.status !== 'OPEN') return -1;
//   if (a.status !== 'OPEN' && b.status === 'OPEN') return 1;
//   return 0; // If same status, keep order
// });
   // this.jobs.sort((a, b) => (a.status === 'OPEN' ? -1 : 1));

  }

  openBidModal(jobId: number) {
    this.selectedJobId = jobId;
    this.bidMessage = '';
    this.bidAmount = null;
    this.bidModal.show();
  }

  clearBidForm() {
    this.bidMessage = '';
    this.bidAmount = null;
    this.selectedJobId = null;
  }

  getBidsForJob(jobId: number): Bid[] {
  return this.bids.filter(b => b.projectId === jobId);
}


  submitBid() {
  if (!this.selectedJobId) return;

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const freelancerId = user?.id;

  if (!freelancerId) {
    Swal.fire('Login Required', 'You must be logged in as a freelancer to apply.', 'warning');
    this.bidModal.hide();
    return;
  }

  Swal.fire({
    title: 'Confirm Bid Submission',
    text: 'Do you want to submit this bid?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel'
  }).then(result => {
    if (result.isConfirmed) {
      const newBid: Bid = {
        projectId: this.selectedJobId || 0,
        freelancerId: freelancerId ,
        amount: this.bidAmount || 0,
        message: this.bidMessage,
        date: new Date().toISOString(),
      };

      this.biddingService.addBid(newBid).subscribe({
        next: () => {
          Swal.fire('Success!', 'Your bid has been submitted.', 'success');
          this.bidModal.hide();
          this.clearBidForm();
          this.fetchBids(); // Update list
        },
        error: () => {
          Swal.fire('Error', 'Failed to submit bid.', 'error');
        }
      });
    }
  });
}


 loadJobs(): void {
  const filters = {
    keyword: this.keyword,
    category: this.selectedCategory,
    status: this.selectedStatus
  };
  this.jobService.bgetJobs(filters).subscribe(data => {
    this.jobs = data;
    if (this.jobs.length === 0) {
      Swal.fire('No Jobs Found', 'Try changing the filter or keyword.', 'info');
    }
  });
}
  
  onFilterChange(): void {
    this.loadJobs();
    
  }
   
  deleteBid(bidId: number) {
  Swal.fire({
    title: 'Delete Bid?',
    text: 'Are you sure you want to delete this bid?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  }).then(result => {
    if (result.isConfirmed) {
      this.biddingService.deleteBid(bidId).subscribe({
        next: () => {
          this.fetchBids(); // ✅ refresh only bids
          Swal.fire('Deleted!', 'Bid has been deleted.', 'success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to delete bid.', 'error');
        }
      });
    }
  });
}

// Pagination variables
currentPage: number = 1;
itemsPerPage: number = 4; // Show 4 jobs per page (change as needed)

// Computed property for paginated jobs
get paginatedJobs() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.jobs.slice(startIndex, startIndex + this.itemsPerPage);
}

get totalPages(): number {
  return Math.ceil(this.jobs.length / this.itemsPerPage);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

saveToWishlist(job: Job): void {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const freelancerId = user?.id;

  if (!freelancerId) {
    Swal.fire('Login Required', 'You must be logged in as a freelancer to save jobs.', 'warning');
    return;
  }

  const wishlistItem: Wishlist = {
    freelancerId: freelancerId,
    jobId: job.id,
    title: job.title,
    category: job.category,
    budget: job.budget,
    addedDate: new Date().toISOString()
  };

  this.wishlistService.addToWishlist(wishlistItem).subscribe({
    next: () => {
      Swal.fire('Saved!', 'Job added to your wishlist.', 'success');
    },
    error: () => {
      Swal.fire('Error', 'Failed to save job.', 'error');
    }
  });
}


}