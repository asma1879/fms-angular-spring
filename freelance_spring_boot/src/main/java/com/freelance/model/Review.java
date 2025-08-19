package com.freelance.model;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "reviews")

public class Review {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;

	  private Long jobId;
	  private Long reviewerId;
	  private Long reviewedId;
	  private int rating;
	  private String comment;
	  private String role;
	  private LocalDate date = LocalDate.now();
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	public Long getReviewerId() {
		return reviewerId;
	}
	public void setReviewerId(Long reviewerId) {
		this.reviewerId = reviewerId;
	}
	public Long getReviewedId() {
		return reviewedId;
	}
	public void setReviewedId(Long reviewedId) {
		this.reviewedId = reviewedId;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	  

}
