package com.freelance.controller;

import com.freelance.dao.BidDAO;
import com.freelance.dao.JobDAO;
import com.freelance.dao.JobDeliveryDAO;
import com.freelance.dao.TransactionDAO;
import com.freelance.dao.UserDAO;
import com.freelance.dao.WalletDAO;
import com.freelance.model.Bid;
import com.freelance.model.Job;
import com.freelance.model.JobDelivery;
import com.freelance.model.Transaction;
import com.freelance.model.TransactionType;
import com.freelance.model.User;
import com.freelance.model.Wallet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/job-deliveries")
public class JobDeliveryController {

	@Autowired
	private JobDeliveryDAO dao;
	
	 @Autowired
	    private JobDeliveryDAO jobDeliveryDAO;
	
	    @Autowired
	    private JobDAO jobDAO;
	    
	    @Autowired
	    private BidDAO bidDAO;
	    
	    
	    @Autowired
	    private UserDAO userDAO;
	    
	    @Autowired
	    private WalletDAO walletDAO;
	    
	    @Autowired
	    private TransactionDAO transactionDAO;

	@PostMapping
	public JobDelivery submit(@RequestBody JobDelivery delivery) {
	    return dao.save(delivery);
	}

	@GetMapping
	public List<JobDelivery> getAll() {
	    return dao.getAll();
	}
	
	 @PostMapping("/clients")
	    public ResponseEntity<String> addDelivery(@RequestBody JobDelivery delivery) {
	        try {
	            // 1. Find the job by jobId
	            Job job = jobDAO.getById(delivery.getJobId());

	            if (job == null) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                        .body("Job with ID " + delivery.getJobId() + " not found.");
	            }

	            // 2. Set the clientId from the job
	            delivery.setClientId(job.getClientId());

	            // 3. Save the delivery
	          dao.addDelivery(delivery);

	            return ResponseEntity.ok("Delivery submitted successfully.");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("Error submitting delivery: " + e.getMessage());
	        }
	    }
	 
	 @GetMapping("/client/{clientId}")
	 public List<JobDelivery> getByClient(@PathVariable Long clientId) {
	     return dao.getDeliveriesByClientId(clientId);
	 }
	 
	 @GetMapping("/job-deliveries/{id}")
	 public ResponseEntity<JobDelivery> getJobDeliveryById(@PathVariable Long id) {
	     JobDelivery delivery = jobDeliveryDAO.getById(id);
	     if (delivery != null) {
	         return ResponseEntity.ok(delivery);
	     }
	     return ResponseEntity.notFound().build();
	 }

	 
//	 @PostMapping("/approve/{deliveryId}")
//	 public ResponseEntity<JobDelivery> approveDelivery(@PathVariable Long deliveryId) {
//	     JobDelivery delivery = jobDeliveryDAO.getById(deliveryId);
//	     if (delivery == null) return ResponseEntity.notFound().build();
//
//	     delivery.setStatus("approved");
//
//	     Job job = jobDAO.getById(delivery.getJobId());
//	     double budget = job.getBudget();
//	     double commissionRate = 0.10;
//	     double commission = budget * commissionRate;
//	     double freelancerAmount = budget - commission;
//
//	     // Debit client
//	     Wallet clientWallet = walletDAO.getWalletByUserId(delivery.getClientId());
//	     clientWallet.setBalance(clientWallet.getBalance() - budget);
//	     walletDAO.saveWallet(clientWallet);
//
//	     // Credit freelancer
//	     Wallet freelancerWallet = walletDAO.getWalletByUserId(delivery.getFreelancerId());
//	     freelancerWallet.setBalance(freelancerWallet.getBalance() + freelancerAmount);
//	     walletDAO.saveWallet(freelancerWallet);
//
//	     // Credit admin
//	     long adminId = 19L; // You can replace this with a configurable admin user ID
//	     Wallet adminWallet = walletDAO.getWalletByUserId(adminId);
//	     adminWallet.setBalance(adminWallet.getBalance() + commission);
//	     walletDAO.saveWallet(adminWallet);
//
//	     // Transaction for client
//	     Transaction t1 = new Transaction();
//	     User clientUser = userDAO.getById(delivery.getClientId());
//	     t1.setUser(clientUser);
//	     t1.setWallet(clientWallet);
//	     t1.setAmount(budget);
//	     t1.setType(TransactionType.DEBIT);
//	     t1.setDescription("Payment for job ID " + job.getId());
//	     t1.setDate(new Date());
//	     transactionDAO.save(t1);
//
//	     // Transaction for freelancer
//	     Transaction t2 = new Transaction();
//	     User freelancerUser = userDAO.getById(delivery.getFreelancerId());
//	     t2.setUser(freelancerUser);
//	     t2.setWallet(freelancerWallet);
//	     t2.setAmount(freelancerAmount);
//	     t2.setType(TransactionType.CREDIT);
//	     t2.setDescription("Received payment for job ID " + job.getId());
//	     t2.setDate(new Date());
//	     transactionDAO.save(t2);
//
//	     // Transaction for admin
//	     Transaction t3 = new Transaction();
//	     User adminUser = userDAO.getById(adminId);
//	     t3.setUser(adminUser);
//	     t3.setWallet(adminWallet);
//	     t3.setAmount(commission);
//	     t3.setType(TransactionType.CREDIT);
//	     t3.setDescription("Commission received for job ID " + job.getId());
//	     t3.setDate(new Date());
//	     transactionDAO.save(t3);
//
//	     // Add transactions to wallet (if needed)
//	     if (clientWallet.getTransactions() == null) {
//	         clientWallet.setTransactions(new java.util.ArrayList<>());
//	     }
//	     clientWallet.getTransactions().add(t1);
//	     walletDAO.saveWallet(clientWallet);
//
//	     if (freelancerWallet.getTransactions() == null) {
//	         freelancerWallet.setTransactions(new java.util.ArrayList<>());
//	     }
//	     freelancerWallet.getTransactions().add(t2);
//	     walletDAO.saveWallet(freelancerWallet);
//
//	     if (adminWallet.getTransactions() == null) {
//	         adminWallet.setTransactions(new java.util.ArrayList<>());
//	     }
//	     adminWallet.getTransactions().add(t3);
//	     walletDAO.saveWallet(adminWallet);
//
//	     return ResponseEntity.ok(jobDeliveryDAO.save(delivery));
//	 }
	 
//	 @PostMapping("/approve/{deliveryId}")
//	 public ResponseEntity<?> approveDelivery(@PathVariable Long deliveryId) {
//	     JobDelivery delivery = jobDeliveryDAO.getById(deliveryId);
//	     if (delivery == null) {
//	         return ResponseEntity.status(HttpStatus.NOT_FOUND)
//	                              .body("Job delivery not found");
//	     }
//
//	     delivery.setStatus("approved");
//
//	     Job job = jobDAO.getById(delivery.getJobId());
//	     if (job == null) {
//	         return ResponseEntity.status(HttpStatus.NOT_FOUND)
//	                              .body("Job not found");
//	     }
//
//	     // Find accepted bid for this job and freelancer
//	     Bid acceptedBid = bidDAO.findAcceptedBidByProjectIdAndFreelancerId(delivery.getJobId(), delivery.getFreelancerId());
//	     if (acceptedBid == null) {
//	         return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                              .body("No accepted bid found for this job and freelancer");
//	     }
//
//	     double bidAmount = acceptedBid.getAmount();
//
//	     double commissionRate = 0.10;
//	     double commission = bidAmount * commissionRate;
//	     double freelancerAmount = bidAmount - commission;
//
//	     // Debit client wallet
//	     Wallet clientWallet = walletDAO.getWalletByUserId(delivery.getClientId());
//	     if (clientWallet == null || clientWallet.getBalance() < bidAmount) {
//	         return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                              .body("Client wallet does not have sufficient balance");
//	     }
//	     clientWallet.setBalance(clientWallet.getBalance() - bidAmount);
//	     walletDAO.saveWallet(clientWallet);
//
//	     // Credit freelancer wallet
//	     Wallet freelancerWallet = walletDAO.getWalletByUserId(delivery.getFreelancerId());
//	     if (freelancerWallet == null) {
//	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                              .body("Freelancer wallet not found");
//	     }
//	     freelancerWallet.setBalance(freelancerWallet.getBalance() + freelancerAmount);
//	     walletDAO.saveWallet(freelancerWallet);
//
//	     // Credit admin wallet
//	     long adminId = 19L; // Change to your actual admin user ID
//	     Wallet adminWallet = walletDAO.getWalletByUserId(adminId);
//	     if (adminWallet == null) {
//	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                              .body("Admin wallet not found");
//	     }
//	     adminWallet.setBalance(adminWallet.getBalance() + commission);
//	     walletDAO.saveWallet(adminWallet);
//
//	     // Create transaction for client (debit)
//	     Transaction clientTransaction = new Transaction();
//	     clientTransaction.setUser(userDAO.getById(delivery.getClientId()));
//	     clientTransaction.setWallet(clientWallet);
//	     clientTransaction.setAmount(bidAmount);
//	     clientTransaction.setType(TransactionType.DEBIT);
//	     clientTransaction.setDescription("Payment for job ID " + job.getId());
//	     clientTransaction.setDate(new java.util.Date());
//	     transactionDAO.save(clientTransaction);
//
//	     // Create transaction for freelancer (credit)
//	     Transaction freelancerTransaction = new Transaction();
//	     freelancerTransaction.setUser(userDAO.getById(delivery.getFreelancerId()));
//	     freelancerTransaction.setWallet(freelancerWallet);
//	     freelancerTransaction.setAmount(freelancerAmount);
//	     freelancerTransaction.setType(TransactionType.CREDIT);
//	     freelancerTransaction.setDescription("Payment received for job ID " + job.getId());
//	     freelancerTransaction.setDate(new java.util.Date());
//	     transactionDAO.save(freelancerTransaction);
//
//	     // Create transaction for admin (credit)
//	     Transaction adminTransaction = new Transaction();
//	     adminTransaction.setUser(userDAO.getById(adminId));
//	     adminTransaction.setWallet(adminWallet);
//	     adminTransaction.setAmount(commission);
//	     adminTransaction.setType(TransactionType.CREDIT);
//	     adminTransaction.setDescription("Commission received for job ID " + job.getId());
//	     adminTransaction.setDate(new java.util.Date());
//	     transactionDAO.save(adminTransaction);
//
//	     // Save updated delivery
//	     jobDeliveryDAO.save(delivery);
//
//	     return ResponseEntity.ok("Delivery approved and payment processed successfully");
//	 }

}
