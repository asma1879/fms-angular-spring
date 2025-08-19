package com.freelance.controller;

import com.freelance.dao.ProjectDAO;
import com.freelance.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")

public class ProjectController {
	
	 @Autowired
	    private ProjectDAO projectDAO;

	    @GetMapping("/projects")
	    public List<Project> getAll() {
	        return projectDAO.getAll();
	    }

	    @GetMapping("/projects/{id}")
	    public Project getById(@PathVariable Long id) {
	        return projectDAO.getById(id);
	    }

	    @PostMapping("/projects")
	    public Project create(@RequestBody Project project) {
	        return projectDAO.save(project);
	    }

	    @PutMapping("projects/{id}")
	    public Project update(@PathVariable Long id, @RequestBody Project project) {
	        project.setId(id);
	        return projectDAO.save(project);
	    }

	    @DeleteMapping("projects/{id}")
	    public void delete(@PathVariable Long id) {
	        projectDAO.delete(id);
	    }

}
