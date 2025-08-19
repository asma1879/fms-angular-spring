package com.freelance.dao.impl;

import com.freelance.dao.MessageDAO;
import com.freelance.model.Message;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
@Transactional

public class MessageDAOImpl implements MessageDAO{
	
	@PersistenceContext
    private EntityManager entityManager;

    @Override
    public Message save(Message message) {
        if (message.getTimestamp() == null) {
            message.setTimestamp(new Date()); // auto set timestamp
        }
        return entityManager.merge(message);
    }

    @Override
    public List<Message> getAll() {
        return entityManager.createQuery("FROM Message", Message.class).getResultList();
    }

}
