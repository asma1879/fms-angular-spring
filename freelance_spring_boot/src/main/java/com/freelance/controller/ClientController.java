package com.freelance.controller;

import com.freelance.dao.ClientDAO;
import com.freelance.model.Bid;
import com.freelance.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin

@RestController
@RequestMapping("/api/clients")

public class ClientController {
	
	@Autowired
    private ClientDAO clientDAO;

    @PostMapping
    public void save(@RequestBody Client client) {
        clientDAO.save(client);
    }

    @GetMapping
    public List<Client> getAll() {
        return clientDAO.getAll();
    }

    @GetMapping("/{id}")
    public Client getById(@PathVariable int id) {
        return clientDAO.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        Client client = clientDAO.getById(id);
        if (client != null) {
            clientDAO.delete(client);
        }
    }
    
}
