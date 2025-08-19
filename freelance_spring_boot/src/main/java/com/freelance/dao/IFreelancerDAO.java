package com.freelance.dao;




import java.util.List;

import com.freelance.model.Freelancer;
public interface IFreelancerDAO {

	List<Freelancer> getAllFreelancers();
	Freelancer addFreelancer(Freelancer freelancer);
	}

