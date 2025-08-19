package com.freelance.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "job_deliveries")

public class JobDelivery {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long jobId;
	private Long freelancerId;
	@Column(name = "client_id")
	private Long clientId;


	@Temporal(TemporalType.DATE)
	private Date deliveryDate;

	public Long getId() {
		return id;
	}
	public Long getClientId() {
		return clientId;
	}
	public void setClientId(Long clientId) {
		this.clientId = clientId;
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
	public Long getFreelancerId() {
		return freelancerId;
	}
	public void setFreelancerId(Long freelancerId) {
		this.freelancerId = freelancerId;
	}
	public Date getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getSubmissionLink() {
		return submissionLink;
	}
	public void setSubmissionLink(String submissionLink) {
		this.submissionLink = submissionLink;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	private String submissionLink;
	private String status;

	

}
