package com.freelance.dao;


import java.util.List;

import com.freelance.model.Bid;

//import org.springframework.data.jpa.repository.JpaRepository;

import com.freelance.model.Job;

public interface JobDAO {

	Job save(Job job);
    List<Job> getAll();
    Job getById(Long id);
    void delete(Job job);
    List<Job> getByFreelancerId(Long freelancerId);
    List<Job> findJobsByFilters(String keyword, String category, String status);
    void closeJob(Long jobId);
    Job findById(Long jobId);
    List<Job> getByClientId(Long clientId);
    List<Job> getAllJobs();
    Job getJobById(Long id);
    void saveOrUpdateJob(Job job);
    void deleteJob(Long id);
 // JobDAO.java
    List<Bid> getBidsByJobId(Long jobId);

    
    
    
}
