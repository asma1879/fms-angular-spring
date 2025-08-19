package com.freelance.model;



import javax.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "jobs")
public class Job {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String title;

	    @Column(length = 2000)
	    private String description;

	    private double budget;

	    @Temporal(TemporalType.DATE)
	    private Date deadline;
	    
	    @Column(name = "freelancer_id")
	    private Long freelancerId;


	  
	    private Long clientId;
	    
	    private String category;
	    private String skills;
	    private LocalDate postedDate;
	   // private String status;
	    private String status; // in-progress, delivered, completed
	    private Double bidAmount;
	    
	    @Column(name = "budget_type")
	    private String budgetType;

	    public String getBudgetType() {
	        return budgetType;
	    }

	    public void setBudgetType(String budgetType) {
	        this.budgetType = budgetType;
	    }

	    public int getRating() {
			return rating;
		}

		public void setRating(int rating) {
			this.rating = rating;
		}

		public String getFeedback() {
			return feedback;
		}

		public void setFeedback(String feedback) {
			this.feedback = feedback;
		}

		private int rating; // out of 5
	    private String feedback; // client's feedback text


		public void setFreelancerId(Long freelancerId) {
			this.freelancerId = freelancerId;
		}

		@ElementCollection
	    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
	    @Column(name = "skill")
	    private List<String> skillsRequired;

		 public Long getFreelancerId() {
				return freelancerId;
			}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public double getBudget() {
			return budget;
		}

		public void setBudget(double budget) {
			this.budget = budget;
		}

		public Date getDeadline() {
			return deadline;
		}

		public void setDeadline(Date deadline) {
			this.deadline = deadline;
		}

		public List<String> getSkillsRequired() {
			return skillsRequired;
		}

		public void setSkillsRequired(List<String> skillsRequired) {
			this.skillsRequired = skillsRequired;
		}

		public Long getClientId() {
			return clientId;
		}

		public void setClientId(Long clientId) {
			this.clientId = clientId;
		}

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public String getSkills() {
			return skills;
		}

		public void setSkills(String skills) {
			this.skills = skills;
		}

		public LocalDate getPostedDate() {
			return postedDate;
		}

		public void setPostedDate(LocalDate postedDate) {
			this.postedDate = postedDate;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public Job orElseThrow() {
			// TODO Auto-generated method stub
			return null;
		}

		public Double getBidAmount() {
			return bidAmount;
		}

		public void setBidAmount(Double bidAmount) {
			this.bidAmount = bidAmount;
		}
		
		
		
	    
	    

}
