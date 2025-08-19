package com.freelance.dao;

import java.util.List;
import com.freelance.model.Transaction;
public interface TransactionDAO {
	 Transaction save(Transaction transaction);
	    List<Transaction> findByUserId(Long userId);
	    List<Transaction> findAll();
}
