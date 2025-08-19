package com.freelance.dao.impl;

import com.freelance.dao.ReviewDAO;
import com.freelance.model.Review;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional

public class ReviewDAOImpl implements ReviewDAO {
	
	@PersistenceContext
	private EntityManager entityManager;

	public Review save(Review review) {
	    return entityManager.merge(review);
	}

	public List<Review> getAll() {
	    return entityManager.createQuery("FROM Review", Review.class).getResultList();
	}

	public Review getById(Long id) {
	    return entityManager.find(Review.class, id);
	}

	public void delete(Review review) {
	    entityManager.remove(entityManager.contains(review) ? review : entityManager.merge(review));
	}


	@Override 
	public List<Review> getReviewsByClientId(Long clientId) {
	    String jpql = "SELECT r FROM Review r WHERE r.reviewedId = :clientId AND r.role = 'client'";
	    return entityManager.createQuery(jpql, Review.class)
	            .setParameter("clientId", clientId)
	            .getResultList();
	}

}
