package com.freelance.dao.impl;

import com.freelance.dao.UserDAO;
import com.freelance.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional

public class UserDAOImpl implements UserDAO {

	 @PersistenceContext
	    private EntityManager entityManager;

	    @Override
	    public User save(User user) {
	        return entityManager.merge(user);
	    }

	    @Override
	    public User findByEmailAndPassword(String email, String password) {
	        List<User> users = entityManager
	                .createQuery("FROM User WHERE email = :email AND password = :password", User.class)
	                .setParameter("email", email)
	                .setParameter("password", password)
	                .getResultList();

	        return users.isEmpty() ? null : users.get(0);
	    }

	    @Override
	    public List<User> getAll() {
	        return entityManager.createQuery("FROM User", User.class).getResultList();
	    }

	    @Override
	    public User getById(Long id) {
	        return entityManager.find(User.class, id);
	    }

	    @Override
	    public void delete(User user) {
	        entityManager.remove(entityManager.contains(user) ? user : entityManager.merge(user));
	    }
	    @Override
	    public Optional<User> findByUsername(String username) {
	        String query = "FROM User WHERE username = :username";
	        List<User> result = entityManager.createQuery(query, User.class)
	                .setParameter("username", username)
	                .getResultList();
	        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
	    }

	    // Optional method specific to freelancers
	    public Optional<User> getFreelancerById(Long id) {
	        User user = entityManager.find(User.class, id);
	        if (user != null && "freelancer".equalsIgnoreCase(user.getRole())) {
	            return Optional.of(user);
	        }
	        return Optional.empty();
	    }

//	    // Update only freelancer profile fields
//	    public User updateFreelancerProfile(Long id, User updatedUser) {
//	        User existingUser = getById(id);
//	        if (existingUser != null && "freelancer".equalsIgnoreCase(existingUser.getRole())) {
//	            existingUser.setFullName(updatedUser.getFullName());
//	            existingUser.setBio(updatedUser.getBio());
//	            existingUser.setSkills(updatedUser.getSkills());
//	            existingUser.setExperience(updatedUser.getExperience());
//	            return save(existingUser); // merge
//	        }
//	        return null;
//	    }
	    
	 // Update all relevant freelancer profile fields
	    public User updateFreelancerProfile(Long id, User updatedUser) {
	        User existingUser = getById(id);
	        if (existingUser != null && "freelancer".equalsIgnoreCase(existingUser.getRole())) {
	            existingUser.setFullName(updatedUser.getFullName());
	           // existingUser.setTitle(updatedUser.getTitle());
	            existingUser.setCountry(updatedUser.getCountry());
	            existingUser.setHourlyRate(updatedUser.getHourlyRate());
	            existingUser.setSkills(updatedUser.getSkills());
	            existingUser.setLanguages(updatedUser.getLanguages());
	            existingUser.setEducation(updatedUser.getEducation());
	            existingUser.setCertifications(updatedUser.getCertifications());
	            existingUser.setExperience(updatedUser.getExperience());
	            existingUser.setBio(updatedUser.getBio());
	            return save(existingUser); // persists merged entity
	        }
	        return null;
	    }

	 // ✅ GET client by ID
	    public Optional<User> getClientById(Long id) {
	        User user = entityManager.find(User.class, id);
	        if (user != null && "client".equalsIgnoreCase(user.getRole())) {
	            return Optional.of(user);
	        }
	        return Optional.empty();
	    }

	    // ✅ Update client profile
	    public User updateClientProfile(Long id, User updatedUser) {
	        User existingUser = getById(id);
	        if (existingUser != null && "client".equalsIgnoreCase(existingUser.getRole())) {
	            existingUser.setFullName(updatedUser.getFullName());
	            // You can add more client-specific fields if needed
	            return save(existingUser);
	        }
	        return null;
	    }
	    
	    // ✅ GET admin by ID
	    public Optional<User> getAdminById(Long id) {
	        User user = entityManager.find(User.class, id);
	        if (user != null && "admin".equalsIgnoreCase(user.getRole())) {
	            return Optional.of(user);
	        }
	        return Optional.empty();
	    }

	    // ✅ Update admin profile
	    public User updateAdminProfile(Long id, User updatedUser) {
	        User existingUser = getById(id);
	        if (existingUser != null && "admin".equalsIgnoreCase(existingUser.getRole())) {
	            existingUser.setFullName(updatedUser.getFullName());
	            // You can add more client-specific fields if needed
	            return save(existingUser);
	        }
	        return null;
	    }
	    
	    @Override
	    public List<User> getAllFreelancers() {
	        return entityManager
	                .createQuery("FROM User WHERE role = 'freelancer'", User.class)
	                .getResultList();
	    }


}
