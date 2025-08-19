package com.freelance.dao;

import com.freelance.model.Payment;
import java.util.List;


public interface PaymentDAO {
	
	 Payment save(Payment payment);
	    List<Payment> getAll();
	    Payment getById(Long id);
	    void delete(Payment payment);

}
