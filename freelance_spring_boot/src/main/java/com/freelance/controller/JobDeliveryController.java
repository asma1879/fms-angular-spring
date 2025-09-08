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


}
