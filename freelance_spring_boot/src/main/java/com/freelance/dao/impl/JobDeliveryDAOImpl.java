package com.freelance.dao.impl;

import com.freelance.dao.JobDeliveryDAO;
import com.freelance.model.Job;
import com.freelance.model.JobDelivery;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional

public class JobDeliveryDAOImpl implements JobDeliveryDAO{

	@PersistenceContext
	private EntityManager em;
	
	@Override
    public JobDelivery getById(Long id) {
        return em.find(JobDelivery.class, id);
    }

	@Override
	public JobDelivery save(JobDelivery delivery) {
	    return em.merge(delivery);
	}

	@Override
	public List<JobDelivery> getAll() {
	    return em.createQuery("FROM JobDelivery", JobDelivery.class).getResultList();
	}
	
	@Override
	public void addDelivery(JobDelivery delivery) {
	    // Step 1: Fetch the job using jobId
	    Job job = em.find(Job.class, delivery.getJobId());

	    if (job == null) {
	        throw new RuntimeException("Job not found with ID: " + delivery.getJobId());
	    }

	    // Step 2: Set clientId from the job
	    delivery.setClientId(job.getClientId());

	    // Step 3: Save the delivery
	    em.persist(delivery);
	}
	
	@Override
	public List<JobDelivery> getDeliveriesByClientId(Long clientId) {
	    String queryStr = "SELECT d FROM JobDelivery d WHERE d.clientId = :clientId";
	    return em.createQuery(queryStr, JobDelivery.class)
	                        .setParameter("clientId", clientId)
	                        .getResultList();
	}
	
	@Override
    public JobDelivery findByJobIdAndFreelancerId(Long jobId, Long freelancerId) {
        try {
            return em.createQuery("FROM JobDelivery WHERE jobId = :jobId AND freelancerId = :freelancerId", JobDelivery.class)
                    .setParameter("jobId", jobId)
                    .setParameter("freelancerId", freelancerId)
                    .getSingleResult();
        } catch (Exception e) {
            return null; // no delivery found
        }
    }

}
