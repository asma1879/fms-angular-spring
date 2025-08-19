package com.freelance.dao;

import java.util.List;

import com.freelance.model.PaymentReport;

public interface PaymentReportDAO {

	 PaymentReport save(PaymentReport report);
	    List<PaymentReport> findByClientId(Long clientId);
	    List<PaymentReport> findByFreelancerId(Long freelancerId);
	    List<PaymentReport> findAll();
	    PaymentReport findByJobIdAndClientIdAndFreelancerId(Long jobId, Long clientId, Long freelancerId);

}
