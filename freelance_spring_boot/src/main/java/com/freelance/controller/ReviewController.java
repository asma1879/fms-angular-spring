package com.freelance.controller;

import com.freelance.dao.ReviewDAO;
import com.freelance.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/reviews")

public class ReviewController {
	
	@Autowired
	private ReviewDAO reviewDAO;

	@PostMapping
	public Review save(@RequestBody Review review) {
	    return reviewDAO.save(review);
	}

	@GetMapping
	public List<Review> getAll() {
	    return reviewDAO.getAll();
	}

	@GetMapping("/{id}")
	public Review getById(@PathVariable Long id) {
	    return reviewDAO.getById(id);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
	    Review review = reviewDAO.getById(id);
	    if (review != null) {
	        reviewDAO.delete(review);
	    }
	}

	 @GetMapping("/client/{clientId}")
	    public List<Review> getClientReviews(@PathVariable Long clientId) {
	        return reviewDAO.getReviewsByClientId(clientId);
	    }

}
