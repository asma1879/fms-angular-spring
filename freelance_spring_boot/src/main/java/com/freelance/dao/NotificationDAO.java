package com.freelance.dao;

import java.util.List;

import com.freelance.model.Notification;

public interface NotificationDAO {
	
	Notification saveNotification(Notification note);
	List<Notification> getAllNotifications();
	void deleteNotification(int id);

}
