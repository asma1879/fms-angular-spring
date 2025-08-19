package com.freelance.dao;

import com.freelance.model.Message;
import java.util.List;


public interface MessageDAO {
	
	 Message save(Message message);
	    List<Message> getAll();

}
