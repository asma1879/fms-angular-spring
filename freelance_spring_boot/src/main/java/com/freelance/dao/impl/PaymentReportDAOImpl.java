package com.freelance.dao.impl;
import com.freelance.dao.PaymentReportDAO;
import com.freelance.model.PaymentReport;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional

public class PaymentReportDAOImpl implements PaymentReportDAO {
	 @PersistenceContext
	    private EntityManager em;

	    @Override
	    public PaymentReport save(PaymentReport report) {
	        return em.merge(report);
	    }

	    @Override
	    public List<PaymentReport> findByClientId(Long clientId) {
	        return em.createQuery("FROM PaymentReport WHERE clientId = :clientId", PaymentReport.class)
	                 .setParameter("clientId", clientId)
	                 .getResultList();
	    }

	    @Override
	    public List<PaymentReport> findByFreelancerId(Long freelancerId) {
	        return em.createQuery("FROM PaymentReport WHERE freelancerId = :freelancerId", PaymentReport.class)
	                 .setParameter("freelancerId", freelancerId)
	                 .getResultList();
	    }

	    @Override
	    public List<PaymentReport> findAll() {
	        return em.createQuery("FROM PaymentReport", PaymentReport.class).getResultList();
	    }

	    @Override
	    public PaymentReport findByJobIdAndClientIdAndFreelancerId(Long jobId, Long clientId, Long freelancerId) {
	        try {
	            return em.createQuery(
	                "FROM PaymentReport WHERE jobId = :jobId AND clientId = :clientId AND freelancerId = :freelancerId",
	                PaymentReport.class)
	                .setParameter("jobId", jobId)
	                .setParameter("clientId", clientId)
	                .setParameter("freelancerId", freelancerId)
	                .getSingleResult();
	        } catch (NoResultException e) {
	            return null;
	        }
	    }

}
