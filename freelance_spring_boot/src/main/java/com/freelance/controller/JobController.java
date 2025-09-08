package com.freelance.controller;


import com.freelance.dao.JobDAO;
import com.freelance.model.Bid;
import com.freelance.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class JobController {
	
	 @Autowired
	    private JobDAO jobDAO;
	 
	 

	    @PostMapping("/jobs")
	    public ResponseEntity<Job> postJob(@RequestBody Job job) {
	        return ResponseEntity.ok(jobDAO.save(job));
	    }

	    @GetMapping("/jobs")
	    public List<Job> getAllJobs() {
	        return jobDAO.getAll();
	    }
	    
	    @GetMapping("/jobs/{jobId}/bids")
	    public ResponseEntity<List<Bid>> getBidsByJobId(@PathVariable Long jobId) {
	        List<Bid> bids = jobDAO.getBidsByJobId(jobId);
	        return new ResponseEntity<>(bids, HttpStatus.OK);
	    }


	    @GetMapping("/jobs/{id}")
	    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
	        Job job = jobDAO.getById(id);
	        return (job != null) ? ResponseEntity.ok(job) : ResponseEntity.notFound().build();
	    }
	    
 
	    @GetMapping("/jobs/freelancers/{freelancerId}")
	    public ResponseEntity<List<Job>> getJobsForFreelancer(@PathVariable Long freelancerId) {
	    return new ResponseEntity<>(jobDAO.getByFreelancerId(freelancerId), HttpStatus.OK);
	    }
	    
	   

	    @DeleteMapping("/jobs/{id}")
	    public ResponseEntity<Map<String, Boolean>> deleteJob(@PathVariable Long id) {
	        Job job = jobDAO.getById(id);
	        Map<String, Boolean> response = new HashMap<>();
	        if (job != null) {
	            jobDAO.delete(job);
	            response.put("deleted", true);
	        } else {
	            response.put("deleted", false);
	        }
	        return ResponseEntity.ok(response);
	    }
	    
	    @GetMapping("/jobs/browse")
	    public ResponseEntity<List<Job>> browseJobs(
	        @RequestParam(required = false) String keyword,
	        @RequestParam(required = false) String category,
	        @RequestParam(required = false) String status
	    ) {
	        List<Job> jobs = jobDAO.findJobsByFilters(keyword, category, status);
	        return ResponseEntity.ok(jobs);
	    }
	    
	    
	    @PutMapping("/jobs/{id}/close")
	    public void closeJob(@PathVariable Long id) {
	        jobDAO.closeJob(id);
	    }
	    
	    @GetMapping("/jobs/client/{clientId}")
	    public ResponseEntity<List<Job>> getJobsByClientId(@PathVariable Long clientId) {
	        List<Job> jobs = jobDAO.getByClientId(clientId);
	        return ResponseEntity.ok(jobs);
	    }


}
