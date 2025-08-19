package com.freelance.dao;


import com.freelance.model.Bid;
import com.freelance.model.Job;

import java.util.List;

public interface BidDAO {

	Bid save(Bid bid);
    List<Bid> getAll();
    
    Bid getById(Long id);
    
    Bid findById(Long id);  // Add this
    List<Job> getJobsByFreelancerId(Long freelancerId);
    
    List<Bid> getBidsByProjectId(Long projectId);
    Bid findByProjectIdAndFreelancerId(Long projectId, Long freelancerId);


    void delete(Bid bid);
    List<Bid> findByFreelancerId(Long freelancerId);
    List<Bid> findByFreelancerIdAndNotified(Long freelancerId);
    List<Bid> getBidsByClientId(Long clientId);
    Bid findAcceptedBidByProjectIdAndFreelancerId(Long projectId, Long freelancerId);




}
