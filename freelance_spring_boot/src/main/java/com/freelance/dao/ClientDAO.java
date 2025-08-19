package com.freelance.dao;

import java.util.List;

import com.freelance.model.Client;

public interface ClientDAO {
	
	 Client save(Client client);
	    List<Client> getAll();
	    Client getById(int id);
	    void delete(Client client);

}
