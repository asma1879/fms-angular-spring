package com.freelance.dao;

import com.freelance.model.User;
import java.util.List;
import java.util.Optional;

public interface UserDAO {

	 User save(User user);
	    User findByEmailAndPassword(String email, String password);
	    List<User> getAll();
	    User getById(Long id);
	    void delete(User user);
   // void delete(Long id);
	    Optional<User> findByUsername(String username);
		//Optional<User> findById(Long id);
	 // UserDAO.java
	    List<User> getAllFreelancers();

}
