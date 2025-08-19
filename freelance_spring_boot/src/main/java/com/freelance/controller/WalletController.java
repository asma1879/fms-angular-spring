package com.freelance.controller;

import com.freelance.dao.WalletDAO;
import com.freelance.model.Transaction;
import com.freelance.model.Wallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/wallet")
public class WalletController {
	
	 @Autowired
	    private WalletDAO walletDAO;

	    @GetMapping("/user/{userId}")
	    public ResponseEntity<Wallet> getWalletByUserId(@PathVariable Long userId) {
	        Wallet wallet = walletDAO.getWalletByUserId(userId);
	        if (wallet == null) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(wallet);
	    }

	    @PostMapping("/add-funds")
	    public ResponseEntity<Void> addFunds(@RequestBody Map<String, Object> payload) {
	        Long userId = Long.valueOf(payload.get("userId").toString());
	        Double amount = Double.valueOf(payload.get("amount").toString());

	        walletDAO.addFunds(userId, amount);
	        return ResponseEntity.ok().build();
	    }

	    @GetMapping("/earnings/{freelancerId}")
	    public ResponseEntity<Double> getEarnings(@PathVariable Long freelancerId) {
	        Double earnings = walletDAO.getEarningsByFreelancerId(freelancerId);
	        return ResponseEntity.ok(earnings);
	    }

	    @GetMapping("/admin/commission")
	    public ResponseEntity<Double> getTotalCommission() {
	        Double commission = walletDAO.getTotalCommission();
	        return ResponseEntity.ok(commission);
	    }
	    
	    @GetMapping("/transactions/user/{userId}")
	    public ResponseEntity<List<Transaction>> getTransactionsByUserId(@PathVariable Long userId) {
	        Wallet wallet = walletDAO.getWalletByUserId(userId);
	        if (wallet == null || wallet.getTransactions() == null) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(wallet.getTransactions());
	    }
	    
	    public Double fetchBalance(Long userId) {
	        return walletDAO.getWalletBalanceByUserId(userId);
	    }
	    
	    @GetMapping("/balance/{userId}")
	    public ResponseEntity<Double> getWalletBalance(@PathVariable Long userId) {
	        Double balance = walletDAO.getWalletBalanceByUserId(userId);
	        return ResponseEntity.ok(balance);
	    }
	    
	    @PostMapping("/withdraw")
	    public ResponseEntity<String> withdraw(@RequestBody Map<String, Object> payload) {
	        try {
	            Long userId = Long.valueOf(payload.get("freelancerId").toString());
	            Double amount = Double.valueOf(payload.get("amount").toString());
	            String method = payload.get("method").toString();
	            String description = "Withdraw via " + method;

	            boolean success = walletDAO.debitWallet(userId, amount, description);

	            if (!success) {
	                return ResponseEntity.badRequest().body("Insufficient balance or wallet not found.");
	            }

	            return ResponseEntity.ok("Withdrawal successful.");
	        } catch (Exception e) {
	            return ResponseEntity.badRequest().body("Withdrawal failed: " + e.getMessage());
	        }
	    }

	    

}
