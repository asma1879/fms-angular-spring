package com.freelance.dao;

import com.freelance.model.Review;
import java.util.List;

public interface ReviewDAO {
	
	Review save(Review review);
	List<Review> getAll();
	Review getById(Long id);
	void delete(Review review);
	 //void saveReview(Review review);
	    List<Review> getReviewsByClientId(Long clientId);

}
