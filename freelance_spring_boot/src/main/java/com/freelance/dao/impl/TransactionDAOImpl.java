package com.freelance.dao.impl;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.freelance.dao.TransactionDAO;
import com.freelance.model.Transaction;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class TransactionDAOImpl implements TransactionDAO {
	
	 @PersistenceContext
	    private EntityManager em;

	    @Override
	    public Transaction save(Transaction transaction) {
	        em.persist(transaction);
	        return transaction;
	    }

//	    @Override
//	    public List<Transaction> findByUserId(Long userId) {
//	        return em.createQuery("FROM Transaction WHERE userId = :userId", Transaction.class)
//	                 .setParameter("userId", userId)
//	                 .getResultList();
//	    }
	    
	    
	    @Override
	    public List<Transaction> findByUserId(Long userId) {
	        return em.createQuery("SELECT t FROM Transaction t WHERE t.wallet.userId = :userId", Transaction.class)
	                 .setParameter("userId", userId)
	                 .getResultList();
	    }


	    @Override
	    public List<Transaction> findAll() {
	        return em.createQuery("FROM Transaction", Transaction.class).getResultList();
	    }
}
