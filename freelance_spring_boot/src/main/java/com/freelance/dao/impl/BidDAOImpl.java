package com.freelance.dao.impl;


import com.freelance.dao.BidDAO;
import com.freelance.model.Bid;
//import com.mysql.cj.Session;
import com.freelance.model.Job;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import org.springframework.beans.factory.annotation.Autowired;
//import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional

public class BidDAOImpl implements BidDAO {
	
	@PersistenceContext
    private EntityManager entityManager;
	
	@Autowired
    private SessionFactory sessionFactory;

    @Override
    public Bid save(Bid bid) {
        return entityManager.merge(bid);
    }

    @Override
    public List<Bid> getAll() {
        return entityManager.createQuery("FROM Bid", Bid.class).getResultList();
    }

    @Override
    public Bid getById(Long id) {
        return entityManager.find(Bid.class, id);
    }
    
    public List<Bid> findByFreelancerId(Long freelancerId) {
        return entityManager.createQuery("FROM Bid WHERE freelancerId = :id", Bid.class)
            .setParameter("id", freelancerId)
            .getResultList();
    }


    @Override
    public void delete(Bid bid) {
        entityManager.remove(entityManager.contains(bid) ? bid : entityManager.merge(bid));
    }
    
   @Override
   public List<Bid> findByFreelancerIdAndNotified(Long freelancerId) {
        String jpql = "SELECT b FROM Bid b WHERE b.freelancerId = :freelancerId AND b.status IN ('accepted', 'rejected') AND b.notificationSent = true";
        return entityManager.createQuery(jpql, Bid.class)
                .setParameter("freelancerId", freelancerId)
                .getResultList();
    }
    @Override
    public Bid findById(Long id) {
//        Session session = sessionFactory.getCurrentSession();
//        return session.get(Bid.class, id);  // returns null if not found
    	 return entityManager.find(Bid.class, id);
    }
    

    @Override
    public List<Bid> getBidsByClientId(Long clientId) {
        String jpql = "SELECT b FROM Bid b JOIN Job j ON b.projectId = j.id WHERE j.clientId = :clientId";
        return entityManager.createQuery(jpql, Bid.class)
                .setParameter("clientId", clientId)
                .getResultList();
    }

    @SuppressWarnings("unchecked")
    public List<Job> getJobsByFreelancerId(Long freelancerId) {
        String query = "SELECT j FROM Job j WHERE j.id IN " +
                       "(SELECT b.projectId FROM Bid b WHERE b.freelancerId = :freelancerId and b.status = :status)";
        
        Query q = entityManager.createQuery(query);
        q.setParameter("freelancerId", freelancerId);
        q.setParameter("status", "accepted");
        
        return q.getResultList();
    }

    @Override
    public List<Bid> getBidsByProjectId(Long projectId) {
        String jpql = "SELECT b FROM Bid b WHERE b.projectId = :projectId";
        return entityManager.createQuery(jpql, Bid.class)
                            .setParameter("projectId", projectId)
                            .getResultList();
    }
    
    @Override
    public Bid findAcceptedBidByProjectIdAndFreelancerId(Long projectId, Long freelancerId) {
        String jpql = "FROM Bid b WHERE b.projectId = :projectId AND b.freelancerId = :freelancerId AND b.status = 'accepted'";
        List<Bid> bids = entityManager.createQuery(jpql, Bid.class)
                        .setParameter("projectId", projectId)
                        .setParameter("freelancerId", freelancerId)
                        .getResultList();
        if (bids.isEmpty()) {
            return null;
        }
        return bids.get(0); // assuming only one accepted bid per project/freelancer
    }



    @Override
    public Bid findByProjectIdAndFreelancerId(Long projectId, Long freelancerId) {
        String hql = "FROM Bid b WHERE b.projectId = :projectId AND b.freelancerId = :freelancerId";
        return (Bid) entityManager.createQuery(hql)
                .setParameter("projectId", projectId)
                .setParameter("freelancerId", freelancerId)
                .getResultStream()
                .findFirst()
                .orElse(null);
    }

}
