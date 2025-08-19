package com.freelance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.freelance.dao.IFreelancerDAO;
import com.freelance.model.Freelancer;

import java.util.List;

@RestController
@RequestMapping("/api/freelancers")
@CrossOrigin(origins = "http://localhost:4200")
public class FreelancerController {
	@Autowired
	private IFreelancerDAO freelancerDAO;

	@GetMapping
	public List<Freelancer> getAllFreelancers() {
	    return freelancerDAO.getAllFreelancers();
	}

	@PostMapping
	public Freelancer addFreelancer(@RequestBody Freelancer freelancer) {
	    return freelancerDAO.addFreelancer(freelancer);
	}


}
