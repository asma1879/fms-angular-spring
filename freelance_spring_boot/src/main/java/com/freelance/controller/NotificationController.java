package com.freelance.controller;

import com.freelance.dao.NotificationDAO;
import com.freelance.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:4200")

public class NotificationController {
	
	@Autowired
	private NotificationDAO notificationDAO;

	@PostMapping
	public Notification create(@RequestBody Notification note) {
	    return notificationDAO.saveNotification(note);
	}

	@GetMapping
	public List<Notification> getAll() {
	    return notificationDAO.getAllNotifications();
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
	    notificationDAO.deleteNotification(id);
	}


}
