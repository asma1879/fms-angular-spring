package com.freelance.model;

import javax.persistence.*;

import java.time.LocalDateTime;
//import java.util.Date;

@Entity
@Table(name = "notification")


public class Notification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String message;

	private LocalDateTime time;

	// Getters and Setters
	public int getId() {
	    return id;
	}

	public void setId(int id) {
	    this.id = id;
	}

	public String getMessage() {
	    return message;
	}

	public void setMessage(String message) {
	    this.message = message;
	}

	public LocalDateTime getTime() {
	    return time;
	}

	public void setTime(LocalDateTime time) {
	    this.time = time;
	}


}
