package com.freelance.dao.impl;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.freelance.dao.WalletDAO;
import com.freelance.model.Transaction;
import com.freelance.model.TransactionType;
import com.freelance.model.User;
import com.freelance.model.Wallet;

@Repository
@Transactional
public class WalletDAOImpl implements WalletDAO{

	 @PersistenceContext
	    private EntityManager em;
	 @Override
	    public Wallet getWalletByUserId(Long userId) {
	        try {
	            return em.createQuery("SELECT w FROM Wallet w WHERE w.userId = :userId", Wallet.class)
	                     .setParameter("userId", userId)
	                     .getSingleResult();
	        } catch (Exception e) {
	            return null;
	        }
	    }

	    @Override
	    public Wallet saveWallet(Wallet wallet) {
	        if (wallet.getId() == null) {
	            em.persist(wallet);
	            return wallet;
	        } else {
	            return em.merge(wallet);
	        }
	    }

//	    @Override
//	    public void addFunds(Long userId, Double amount) {
//	        Wallet wallet = getWalletByUserId(userId);
//	        if (wallet == null) {
//	            wallet = new Wallet();
//	            wallet.setUserId(userId);
//	            wallet.setBalance(0.0);
//	            saveWallet(wallet);
//	        }
//
//	        wallet.setBalance(wallet.getBalance() + amount);
//
//	        // Create transaction
//	        Transaction txn = new Transaction();
//	        txn.setWallet(wallet);
//	        txn.setAmount(amount);
//	        txn.setType(TransactionType.CREDIT);
//	        txn.setDescription("Funds added");
//	        txn.setDate(new Date());
//
//	        wallet.getTransactions().add(txn);
//
//	        em.merge(wallet);
//	    }
	    
//	    @Override
//	    public void addFunds(Long userId, Double amount) {
//	        Wallet wallet = getWalletByUserId(userId);
//	        if (wallet == null) {
//	            wallet = new Wallet();
//	            wallet.setUserId(userId);
//	            wallet.setBalance(0.0);
//	            saveWallet(wallet);
//	        }
//
//	        wallet.setBalance(wallet.getBalance() + amount);
//
//	        // Create transaction
//	        Transaction txn = new Transaction();
//	        txn.setWallet(wallet);
//	        txn.setAmount(amount);
//	        txn.setType(TransactionType.CREDIT);
//	        txn.setDescription("Funds added");
//	        txn.setDate(new Date());
//
//	        //  Fix: initialize transactions list if null
//	        if (wallet.getTransactions() == null) {
//	            wallet.setTransactions(new java.util.ArrayList<>());
//	        }
//
//	        wallet.getTransactions().add(txn);
//
//	        em.merge(wallet);
//	    }
	    
	    @Override
	    public void addFunds(Long userId, Double amount) {
	        Wallet wallet = getWalletByUserId(userId);
	        if (wallet == null) {
	            wallet = new Wallet();
	            wallet.setUserId(userId);
	            wallet.setBalance(0.0);
	            saveWallet(wallet);
	        }

	        wallet.setBalance(wallet.getBalance() + amount);

	        // Create transaction
	        Transaction txn = new Transaction();
	        txn.setWallet(wallet);
	        txn.setAmount(amount);
	        txn.setType(TransactionType.CREDIT);
	        txn.setDescription("Funds added");
	        txn.setDate(new Date());

	        // Load User entity and set
	        User user = em.find(User.class, userId);
	        txn.setUser(user);

	        wallet.getTransactions().add(txn);

	        em.merge(wallet);
	    }

	    @Override
	    public Double getEarningsByFreelancerId(Long freelancerId) {
	        // Sum of all credited payments linked to freelancer's delivered jobs, minus commission
	        // Simplified query for demo:
	        Double earnings = (Double) em.createQuery(
	          "SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.type = :credit AND t.description LIKE :desc AND t.wallet.userId = :freelancerId")
	          .setParameter("credit", TransactionType.CREDIT)
	          .setParameter("desc", "%payment for job delivery%")
	          .setParameter("freelancerId", freelancerId)
	          .getSingleResult();
	        return earnings;
	    }

	    @Override
	    public Double getTotalCommission() {
	        // Sum all commission transactions (debit) from all wallets
	        Double commission = (Double) em.createQuery(
	          "SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.type = :debit AND t.description LIKE :desc")
	          .setParameter("debit", TransactionType.DEBIT)
	          .setParameter("desc", "%commission%")
	          .getSingleResult();
	        return commission;
	    }
	    
	    @Transactional
	    public boolean debitWallet(Long userId, Double amount, String description) {
	        Wallet wallet = getWalletByUserId(userId);
	        if (wallet == null || wallet.getBalance() < amount) {
	            return false; // insufficient funds
	        }
	        wallet.setBalance(wallet.getBalance() - amount);

	        // Create transaction record
	        Transaction txn = new Transaction();
	        txn.setWallet(wallet);
	       // txn.setUser(wallet.getUser());
	        User user = em.find(User.class, wallet.getUserId());
	        txn.setUser(user);
	        txn.setAmount(amount);
	        txn.setType(TransactionType.DEBIT);
	        txn.setDescription(description);
	        txn.setDate(new Date());

	        em.merge(wallet);
	        em.persist(txn);
	        return true;
	    }

	    @Transactional
	    public void creditWallet(Long userId, Double amount, String description) {
	        Wallet wallet = getWalletByUserId(userId);
	        wallet.setBalance(wallet.getBalance() + amount);

	        Transaction txn = new Transaction();
//	        User user = em.find(User.class, wallet.getUserId());
//	        txn.setUser(user);

	        txn.setWallet(wallet);
	       // txn.setUser(wallet.getUser());
	        User user = em.find(User.class, wallet.getUserId());
	        txn.setUser(user);
	        txn.setAmount(amount);
	        txn.setType(TransactionType.CREDIT);
	        txn.setDescription(description);
	        txn.setDate(new Date());

	        em.merge(wallet);
	        em.persist(txn);
	    }

	    @Transactional
	    public boolean transfer(Long fromUserId, Long toUserId, Double amount, String description) {
	        boolean debited = debitWallet(fromUserId, amount, description + " (debit)");
	        if (!debited) return false;
	        creditWallet(toUserId, amount, description + " (credit)");
	        return true;
	    }

	    @Override
	    public Double getWalletBalanceByUserId(Long userId) {
	        String jpql = "SELECT w.balance FROM Wallet w WHERE w.userId = :userId";
	        Query query = em.createQuery(jpql);
	        query.setParameter("userId", userId);

	        try {
	            return (Double) query.getSingleResult();
	        } catch (Exception e) {
	            return 0.0;
	        }
	    }

}
