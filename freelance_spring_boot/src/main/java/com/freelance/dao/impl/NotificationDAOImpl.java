package com.freelance.dao.impl;

//import org.springframework.stereotype.Repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.freelance.dao.NotificationDAO;
import com.freelance.model.Notification;

//import javax.transaction.Transactional;

@Repository
@Transactional

public class NotificationDAOImpl implements NotificationDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public Notification saveNotification(Notification note) {
	    if (note.getId() == 0) {
	        em.persist(note);
	        return note;
	    } else {
	        return em.merge(note);
	    }
	}

	@Override
	public List<Notification> getAllNotifications() {
	    return em.createQuery("FROM Notification", Notification.class).getResultList();
	}

	@Override
	public void deleteNotification(int id) {
	    Notification n = em.find(Notification.class, id);
	    if (n != null) {
	        em.remove(n);
	    }
	}


}
