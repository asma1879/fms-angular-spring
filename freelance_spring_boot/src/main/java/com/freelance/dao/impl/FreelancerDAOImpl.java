package com.freelance.dao.impl;


import org.springframework.stereotype.Repository;

import com.freelance.dao.IFreelancerDAO;
import com.freelance.model.Freelancer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class FreelancerDAOImpl implements IFreelancerDAO {
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Freelancer> getAllFreelancers() {
	    return entityManager.createQuery("FROM Freelancer", Freelancer.class).getResultList();
	}

	@Override
	public Freelancer addFreelancer(Freelancer freelancer) {
	    entityManager.persist(freelancer);
	    return freelancer;
	}


}
