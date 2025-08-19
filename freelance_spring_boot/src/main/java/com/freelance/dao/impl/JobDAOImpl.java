package com.freelance.dao.impl;

import com.freelance.dao.JobDAO;
import com.freelance.model.Bid;
import com.freelance.model.Job;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
//import org.hibernate.SessionFactory;
//import org.hibernate.Session;
//import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collections;
import java.util.List;

@Repository
@Transactional
public class JobDAOImpl implements JobDAO {
	
	
	@PersistenceContext
    private EntityManager entityManager;
	
//	 @Override
//	    public List<Job> getByFreelancerId(Long freelancerId) {
//	        return entityManager.createQuery("FROM JobPost WHERE freelancerId = :freelancerId", Job.class)
//	            .setParameter("freelancerId", freelancerId)
//	            .getResultList();
//	    }
	
	@Override
	public List<Job> getByFreelancerId(Long freelancerId) {
		String jpql = "SELECT b.job.id FROM Bid b WHERE b.freelancerId = :freelancerId";
		List<Long> jobIds = entityManager.createQuery(jpql, Long.class)
		    .setParameter("freelancerId", freelancerId)
		    .getResultList();


	    if (jobIds.isEmpty()) return Collections.emptyList();

	    return entityManager.createQuery("SELECT j FROM Job j WHERE j.id IN :jobIds", Job.class)
	            .setParameter("jobIds", jobIds)
	            .getResultList();
	}
	
	@Override
	public List<Job> getByClientId(Long clientId) {
	    String jpql = "FROM Job WHERE clientId = :clientId";
	    return entityManager.createQuery(jpql, Job.class)
	        .setParameter("clientId", clientId)
	        .getResultList();
	}


    @Override
    public Job save(Job job) {
        return entityManager.merge(job);
    }

    @Override
    public List<Job> getAll() {
        return entityManager.createQuery("FROM Job", Job.class).getResultList();
    }

    @Override
    public Job getById(Long id) {
        return entityManager.find(Job.class, id);
    }

    @Override
    public void delete(Job job) {
        entityManager.remove(entityManager.contains(job) ? job : entityManager.merge(job));
    }
    @Override
    public List<Job> findJobsByFilters(String keyword, String category, String status) {
        String jpql = "SELECT j FROM Job j WHERE 1=1";

        if (keyword != null) {
            jpql += " AND j.title LIKE :keyword";
        }
        if (category != null) {
            jpql += " AND j.category = :category";
        }
        if (status != null) {
            jpql += " AND j.status = :status";
        }

        TypedQuery<Job> query = entityManager.createQuery(jpql, Job.class);

        if (keyword != null) {
            query.setParameter("keyword", "%" + keyword + "%");
        }
        if (category != null) {
            query.setParameter("category", category);
        }
        if (status != null) {
            query.setParameter("status", status);
        }

        return query.getResultList();
    }
    public void closeJob(Long jobId) {
        entityManager.createQuery("UPDATE Job j SET j.status = :status WHERE j.id = :id")
                     .setParameter("status", "Closed")
                     .setParameter("id", jobId)
                     .executeUpdate();
    }
    
    @Override
    public Job findById(Long jobId) {
        return entityManager.find(Job.class, jobId);
    }
    
    @Override
    public List<Job> getAllJobs() {
        return entityManager.createQuery("FROM Job", Job.class).getResultList();
    }

    @Override
    public Job getJobById(Long id) {
        return entityManager.find(Job.class, id);
    }

    @Override
    public void saveOrUpdateJob(Job job) {
        if (job.getId() == null) {
            entityManager.persist(job);
        } else {
            entityManager.merge(job);
        }
    }
    
 // JobDAOImpl.java
    @Override
    public List<Bid> getBidsByJobId(Long jobId) {
        String jpql = "SELECT b FROM Bid b WHERE b.projectId = :jobId";
        return entityManager.createQuery(jpql, Bid.class)
                            .setParameter("jobId", jobId)
                            .getResultList();
    }


    @Override
    public void deleteJob(Long id) {
        Job job = entityManager.find(Job.class, id);
        if (job != null) {
            entityManager.remove(job);
        }
    }

    public void updateJobFeedback(Long jobId, Integer rating, String feedback) {
        Job job = entityManager.find(Job.class, jobId);
        if (job != null) {
            job.setRating(rating);
            job.setFeedback(feedback);
            job.setStatus("completed");
            entityManager.merge(job);
        }
    }


    
}
