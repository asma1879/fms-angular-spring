package com.freelance.dao.impl;

import com.freelance.dao.PaymentDAO;
import com.freelance.model.Payment;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional

public class PaymentDAOImpl implements PaymentDAO {
	
	@PersistenceContext
    private EntityManager entityManager;

    @Override
    public Payment save(Payment payment) {
        return entityManager.merge(payment);
    }

    @Override
    public List<Payment> getAll() {
        return entityManager.createQuery("FROM Payment", Payment.class).getResultList();
    }

    @Override
    public Payment getById(Long id) {
        return entityManager.find(Payment.class, id);
    }

    @Override
    public void delete(Payment payment) {
        entityManager.remove(entityManager.contains(payment) ? payment : entityManager.merge(payment));
    }

	
}
