package com.freelance.controller;

import com.freelance.dao.TransactionDAO;
import com.freelance.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

	 @Autowired
	    private TransactionDAO transactionDAO;

	    @PostMapping
	    public Transaction saveTransaction(@RequestBody Transaction transaction) {
	        return transactionDAO.save(transaction);
	    }

	    @GetMapping("/user/{userId}")
	    public List<Transaction> getUserTransactions(@PathVariable Long userId) {
	        return transactionDAO.findByUserId(userId);
	    }

	    @GetMapping
	    public List<Transaction> getAllTransactions() {
	        return transactionDAO.findAll();
	    }
	    
	    @GetMapping("/admin/commissions")
	    public List<Transaction> getAdminCommissions() {
	        Long adminId = 1L; // adjust if needed
	        List<Transaction> all = transactionDAO.findByUserId(adminId);

	        return all.stream()
	                  .filter(tx -> tx.getDescription() != null &&
	                                tx.getDescription().toLowerCase().contains("commission"))
	                  .toList();
	    }

}
