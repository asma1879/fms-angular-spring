package com.freelance.controller;

import com.freelance.dao.*;
import com.freelance.model.Bid;
import com.freelance.model.JobDelivery;
import com.freelance.model.Payment;
import com.freelance.model.PaymentReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {
	
	 @Autowired
	    private PaymentDAO paymentDAO;
	 @Autowired
	 private JobDeliveryDAO jobDeliveryDAO;


	    @PostMapping
	    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
	        return ResponseEntity.ok(paymentDAO.save(payment));
	    }

	    @GetMapping
	    public List<Payment> getAllPayments() {
	        return paymentDAO.getAll();
	    }
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment paymentDetails) {
	        Payment existingPayment = paymentDAO.getById(id);
	        if (existingPayment == null) {
	            return ResponseEntity.notFound().build();
	        }

	        existingPayment.setClientName(paymentDetails.getClientName());
	        existingPayment.setAmount(paymentDetails.getAmount());
	        existingPayment.setPaymentDate(paymentDetails.getPaymentDate());
	        existingPayment.setStatus(paymentDetails.getStatus()); 

	        Payment updatedPayment = paymentDAO.save(existingPayment);

	        return ResponseEntity.ok(updatedPayment);
	    }

	    @DeleteMapping("/{id}")
	    public Map<String, Boolean> deletePayment(@PathVariable Long id) {
	        Payment payment = paymentDAO.getById(id);
	        Map<String, Boolean> response = new HashMap<>();
	        if (payment != null) {
	            paymentDAO.delete(payment);
	            response.put("deleted", true);
	        } else {
	            response.put("deleted", false);
	        }
	        return response;
	    }
	    
	    @Autowired
	    private WalletDAO walletDAO;

	    @Autowired
	    private PaymentReportDAO paymentReportDAO;

	    @Autowired
	    private BidDAO bidDAO;

	    @Autowired
	    private JobDAO jobDAO;

	    private static final Long ADMIN_USER_ID = 1L; // Set your admin user id here
	    private static final double COMMISSION_RATE = 0.1; // 10% commission

	    @PostMapping("/initiate")
	    @Transactional
	    public ResponseEntity<?> initiatePayment(@RequestBody Map<String, Object> payload) {
	        Long jobId = Long.valueOf(payload.get("jobId").toString());
	        Long clientId = Long.valueOf(payload.get("clientId").toString());
	        Long freelancerId = Long.valueOf(payload.get("freelancerId").toString());
	        Double bidAmount = Double.valueOf(payload.get("bidAmount").toString());
	        String paymentMethod = (String) payload.get("paymentMethod");
	        String accountNumber = (String) payload.get("accountNumber");

	        // Debit client wallet, credit admin wallet
	        boolean success = walletDAO.transfer(clientId, ADMIN_USER_ID, bidAmount,
	                "Bid amount for job " + jobId + " transferred to admin wallet");

	        if (!success) {
	            return ResponseEntity.badRequest().body("Insufficient funds in client wallet");
	        }

	        // Create payment report
	        PaymentReport report = new PaymentReport();
	        report.setJobId(jobId);
	        report.setClientId(clientId);
	        report.setFreelancerId(freelancerId);
	        report.setAmount(bidAmount);
	        report.setCommissionAmount(0.0);
	        report.setPaymentMethod(paymentMethod);
	        report.setAccountNumber(accountNumber);
	        report.setStatus("pending");
	        report.setDate(new Date());
	        paymentReportDAO.save(report);

	        //  Update bid status to 'accepted'
	        Bid bid = bidDAO.findByProjectIdAndFreelancerId(jobId, freelancerId);
	        if (bid != null) {
	            bid.setStatus("accepted");
	            bidDAO.save(bid);
	        }

	        return ResponseEntity.ok("Payment initiated, funds moved to admin wallet");
	    }
	    
//	    @PostMapping("/complete")
//	    @Transactional
//	    public ResponseEntity<?> completePayment(@RequestBody Map<String, Object> payload) {
//	        Long jobId = Long.valueOf(payload.get("jobId").toString());
//	        Long freelancerId = Long.valueOf(payload.get("freelancerId").toString());
//	        Long clientId = Long.valueOf(payload.get("clientId").toString());
//
//	        PaymentReport report = paymentReportDAO.findByJobIdAndClientIdAndFreelancerId(jobId, clientId, freelancerId);
//	        if (report == null) {
//	            return ResponseEntity.badRequest().body("Payment report not found");
//	        }
//
//	        if (!"pending".equalsIgnoreCase(report.getStatus())) {
//	            return ResponseEntity.badRequest().body("Payment already completed");
//	        }
//
//	        double total = report.getAmount();
//	        double commission = total * 0.1;
//	        double payout = total - commission;
//
//	        boolean transferred = walletDAO.transfer(1L, freelancerId, payout, "Payout for job #" + jobId);
//
//	        if (!transferred) {
//	            return ResponseEntity.badRequest().body("Admin does not have enough balance");
//	        }
//
//	        report.setStatus("completed");
//	        report.setCommissionAmount(commission);
//	        paymentReportDAO.save(report);
//
//	        return ResponseEntity.ok("Payment completed and transferred to freelancer");
//	    }
//	    
	    
	    @PostMapping("/complete")
	    @Transactional
	    public ResponseEntity<?> completePayment(@RequestBody Map<String, Object> payload) {
	        Long jobId = Long.valueOf(payload.get("jobId").toString());
	        Long freelancerId = Long.valueOf(payload.get("freelancerId").toString());
	        Long clientId = Long.valueOf(payload.get("clientId").toString());

	        // Fetch pending report
	        List<PaymentReport> reports = paymentReportDAO.findByClientId(clientId);
	        PaymentReport targetReport = reports.stream()
	                .filter(r -> r.getJobId().equals(jobId)
	                        && r.getFreelancerId().equals(freelancerId)
	                        && "pending".equalsIgnoreCase(r.getStatus()))
	                .findFirst()
	                .orElse(null);

	        if (targetReport == null) {
	            return ResponseEntity.badRequest().body("No pending payment found for this job");
	        }

	        double bidAmount = targetReport.getAmount();
	        double commission = bidAmount * COMMISSION_RATE;
	        double amountToFreelancer = bidAmount - commission;

	        // Transfer from Admin to Freelancer
	        boolean success = walletDAO.transfer(ADMIN_USER_ID, freelancerId, amountToFreelancer,
	                "Payment for job " + jobId + " delivered. Commission deducted.");

	        if (!success) {
	            return ResponseEntity.badRequest().body("Admin wallet has insufficient funds");
	        }

	        // Update report
	        targetReport.setCommissionAmount(commission);
	        targetReport.setStatus("completed");
	        paymentReportDAO.save(targetReport);

	        // Update JobDelivery status
	        JobDelivery delivery = jobDeliveryDAO.findByJobIdAndFreelancerId(jobId, freelancerId);
	        if (delivery != null) {
	            delivery.setStatus("approved"); 
	            jobDeliveryDAO.save(delivery);
	        }

	        return ResponseEntity.ok("Payment completed, freelancer wallet credited");
	    }

	    
	    @GetMapping("/reports/client/{clientId}")
	    public List<PaymentReport> getReportsByClient(@PathVariable Long clientId) {
	        return paymentReportDAO.findByClientId(clientId);
	    }

	    @GetMapping("/reports/freelancer/{freelancerId}")
	    public List<PaymentReport> getReportsByFreelancer(@PathVariable Long freelancerId) {
	        return paymentReportDAO.findByFreelancerId(freelancerId);
	    }



}
