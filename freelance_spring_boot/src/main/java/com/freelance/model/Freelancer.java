package com.freelance.model;

import javax.persistence.*;

@Entity
@Table(name = "freelancers")

public class Freelancer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;
	private String skill;

	@Column(name = "hourly_rate")
	private double hourlyRate;
	
	@Column(name = "experience")
	private double experience;

	// Constructors
	public Freelancer() {}

	public Freelancer(String name, String skill, double hourlyRate) {
	    this.name = name;
	    this.skill = skill;
	    this.hourlyRate = hourlyRate;
	}

	// Getters and Setters
	public int getId() {
	    return id;
	}

	public void setId(int id) {
	    this.id = id;
	}

	public String getName() {
	    return name;
	}

	public void setName(String name) {
	    this.name = name;
	}

	public String getSkill() {
	    return skill;
	}

	public void setSkill(String skill) {
	    this.skill = skill;
	}

	public double getHourlyRate() {
	    return hourlyRate;
	}

	public void setHourlyRate(double hourlyRate) {
	    this.hourlyRate = hourlyRate;
	}

	public double getExperience() {
		return experience;
	}

	public void setExperience(double experience) {
		this.experience = experience;
	}

	
}
