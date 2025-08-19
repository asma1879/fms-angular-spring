package com.freelance.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bids")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long projectId;
    private Long freelancerId;
    private Double amount;
    private String message;
    @Column(name = "status")
    private String status; // values: "pending", "accepted", "rejected"
    @ManyToOne Job job;

    @Column(name = "notification_sent")
    private Boolean notificationSent = false;


    public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	

	public Boolean getNotificationSent() {
		return notificationSent;
	}

	public void setNotificationSent(Boolean notificationSent) {
		this.notificationSent = notificationSent;
	}



	@Temporal(TemporalType.DATE)
    private Date date;

    @PrePersist
    protected void onCreate() {
        if (this.date == null) {
            this.date = new Date();
        }
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(Long freelancerId) {
        this.freelancerId = freelancerId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

	public Bid orElse(Object object) {
		// TODO Auto-generated method stub
		return null;
	}
}

