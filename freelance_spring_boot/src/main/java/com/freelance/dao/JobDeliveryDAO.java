package com.freelance.dao;



import com.freelance.model.JobDelivery;
import java.util.List;
public interface JobDeliveryDAO {
	JobDelivery save(JobDelivery delivery);
	List<JobDelivery> getAll();
	void addDelivery(JobDelivery delivery);
	List<JobDelivery> getDeliveriesByClientId(Long clientId);
	JobDelivery getById(Long id);
	// JobDelivery save(JobDelivery delivery);
	    JobDelivery findByJobIdAndFreelancerId(Long jobId, Long freelancerId);


	}


