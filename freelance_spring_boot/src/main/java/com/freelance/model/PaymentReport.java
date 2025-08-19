package com.freelance.model;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payment_reports")
public class PaymentReport {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private Long jobId;
	    private Long clientId;
	    private Long freelancerId;
	    private Double amount;
	    private Double commissionAmount;

	    private String paymentMethod;
	    private String accountNumber;

	    @Temporal(TemporalType.TIMESTAMP)
	    private Date date;

	    private String status; // pending, completed

	    @PrePersist
	    protected void onCreate() {
	        if (this.date == null) this.date = new Date();
	    }

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

		public Long getClientId() {
			return clientId;
		}

		public void setClientId(Long clientId) {
			this.clientId = clientId;
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

		public Double getCommissionAmount() {
			return commissionAmount;
		}

		public void setCommissionAmount(Double commissionAmount) {
			this.commissionAmount = commissionAmount;
		}

		public String getPaymentMethod() {
			return paymentMethod;
		}

		public void setPaymentMethod(String paymentMethod) {
			this.paymentMethod = paymentMethod;
		}

		public String getAccountNumber() {
			return accountNumber;
		}

		public void setAccountNumber(String accountNumber) {
			this.accountNumber = accountNumber;
		}

		public Date getDate() {
			return date;
		}

		public void setDate(Date date) {
			this.date = date;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}
	    
	    
}
