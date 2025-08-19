package com.freelance.dao.impl;

import com.freelance.dao.ProjectDAO;
import com.freelance.model.Project;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class ProjectDAOImpl implements ProjectDAO{

	 @PersistenceContext
	    private EntityManager em;

	    @Override
	    public List<Project> getAll() {
	        return em.createQuery("from Project", Project.class).getResultList();
	    }

	    @Override
	    public Project getById(Long id) {
	        return em.find(Project.class, id);
	    }

	    @Override
	    public Project save(Project project) {
	        if (project.getId() == null) {
	            em.persist(project);
	            return project;
	        } else {
	            return em.merge(project);
	        }
	    }

	    @Override
	    public void delete(Long id) {
	        Project project = em.find(Project.class, id);
	        if (project != null) {
	            em.remove(project);
	        }
	    }
}
