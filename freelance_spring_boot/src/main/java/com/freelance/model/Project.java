package com.freelance.model;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "projects")

public class Project {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String title;

	    @Column(length = 1000)
	    private String description;

	    private Double budget;

	    private String deadline;

	    @ElementCollection
	    private List<String> skills;

	    // Constructors
	    public Project() {
	        // default constructor
	    }

	    public Project(String title, String description, Double budget, String deadline, List<String> skills) {
	        this.title = title;
	        this.description = description;
	        this.budget = budget;
	        this.deadline = deadline;
	        this.skills = skills;
	    }

	    // Getters and setters

	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public String getTitle() {
	        return title;
	    }

	    public void setTitle(String title) {
	        this.title = title;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public void setDescription(String description) {
	        this.description = description;
	    }

	    public Double getBudget() {
	        return budget;
	    }

	    public void setBudget(Double budget) {
	        this.budget = budget;
	    }

	    public String getDeadline() {
	        return deadline;
	    }

	    public void setDeadline(String deadline) {
	        this.deadline = deadline;
	    }

	    public List<String> getSkills() {
	        return skills;
	    }

	    public void setSkills(List<String> skills) {
	        this.skills = skills;
	    }

	    // Example method to create a project with default skills (for demo/test)
	    public static Project createSampleProject() {
	        return new Project(
	            "Demo Project",
	            "This is a sample project",
	            500.0,
	            "2025-06-01",
	            Arrays.asList("Java", "Spring Boot") // ✅ Java 8 compatible
	        );
	    }

}
