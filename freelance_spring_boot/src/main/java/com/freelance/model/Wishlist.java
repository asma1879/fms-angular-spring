//package com.freelance.model;
//
//import javax.persistence.*;
//
//import java.time.LocalDate;
//import java.util.Date;
//
//@Entity
//@Table(name = "wishlist")
//public class Wishlist {
//
////	@Id
////	@GeneratedValue(strategy = GenerationType.IDENTITY)
////	private Long id;
////
////	private Long userId;
////	private Long jobId;
////
////	@Temporal(TemporalType.DATE)
////	private Date addedDate`;
//
//
////	 @Id
////	    @GeneratedValue(strategy = GenerationType.IDENTITY)
////	    private Long wishlistId;
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long wishlistId;
//
//	    private Long freelancerId;
//	    private Long jobId;
//	    private String title;
//	    private String category;
//	    private Double budget;
//	    private LocalDate addedDate;
//		public Long getWishlistId() {
//			return wishlistId;
//		}
//		public void setWishlistId(Long wishlistId) {
//			this.wishlistId = wishlistId;
//		}
//		public Long getFreelancerId() {
//			return freelancerId;
//		}
//		public void setFreelancerId(Long freelancerId) {
//			this.freelancerId = freelancerId;
//		}
//		public Long getJobId() {
//			return jobId;
//		}
//		public void setJobId(Long jobId) {
//			this.jobId = jobId;
//		}
//		public String getTitle() {
//			return title;
//		}
//		public void setTitle(String title) {
//			this.title = title;
//		}
//		public String getCategory() {
//			return category;
//		}
//		public void setCategory(String category) {
//			this.category = category;
//		}
//		public Double getBudget() {
//			return budget;
//		}
//		public void setBudget(Double budget) {
//			this.budget = budget;
//		}
//		public LocalDate getAddedDate() {
//			return addedDate;
//		}
//		public void setAddedDate(LocalDate addedDate) {
//			this.addedDate = addedDate;
//		}
//	    
//	    
//	
//}

package com.freelance.model;

//import jakarta.persistence.*;
import java.time.LocalDate;

//import javax.persistence.Entity;
import javax.persistence.*;
@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_id")
    private Long wishlistId;

    @Column(name = "freelancer_id", nullable = false)
    private Long freelancerId;

    @Column(name = "job_id", nullable = false)
    private Long jobId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double budget;

    @Column(name = "added_date", nullable = false)
    private LocalDate addedDate;

    // === Getters and Setters ===

    public Long getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(Long wishlistId) {
        this.wishlistId = wishlistId;
    }

    public Long getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(Long freelancerId) {
        this.freelancerId = freelancerId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }
}

