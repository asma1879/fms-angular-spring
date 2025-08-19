package com.freelance.controller;


import org.springframework.web.bind.annotation.*;

import com.freelance.model.DashboardStats;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/dashboard")

public class DashboardController {
	
	@GetMapping("/{userId}")
	public DashboardStats getDashboardStats(@PathVariable Long userId) {
	    DashboardStats stats = new DashboardStats();

	    // Dummy data for now (replace with DB queries later)
	    stats.setTotalProjects(15);
	    stats.setActiveContracts(6);
	    stats.setPendingPayments(2);
	    stats.setMessages(9);

	    return stats;
	}

}
