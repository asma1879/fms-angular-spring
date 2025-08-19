package com.freelance.controller;

import com.freelance.dao.MessageDAO;
import com.freelance.model.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class MessageController {
	
	 @Autowired
	    private MessageDAO messageDAO;

	    @PostMapping("/messages")
	    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
	        return ResponseEntity.ok(messageDAO.save(message));
	    }

	    @GetMapping("/messages")
	    public List<Message> getMessages() {
	        return messageDAO.getAll();
	    }

}
