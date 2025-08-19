package com.freelance.dao;

import com.freelance.model.Project;
import java.util.List;

public interface ProjectDAO {
	
	 List<Project> getAll();
	    Project getById(Long id);
	    Project save(Project project);
	    void delete(Long id);

}
