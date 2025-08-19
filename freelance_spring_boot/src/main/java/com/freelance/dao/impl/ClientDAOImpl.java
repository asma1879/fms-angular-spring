package com.freelance.dao.impl;



import com.freelance.dao.ClientDAO;
import com.freelance.model.Client;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional

public class ClientDAOImpl implements ClientDAO {
	
	 @PersistenceContext
	    private EntityManager entityManager;

	    @Override
	    public Client save(Client client) {
	        return entityManager.merge(client);
	    }

	    @Override
	    public List<Client> getAll() {
	        return entityManager.createQuery("FROM Client", Client.class).getResultList();
	    }

	    @Override
	    public Client getById(int id) {
	        return entityManager.find(Client.class, id);
	    }

	    @Override
	    public void delete(Client client) {
	        entityManager.remove(entityManager.contains(client) ? client : entityManager.merge(client));
	    }
	    }


