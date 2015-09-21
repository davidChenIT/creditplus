package com.creditplus.p2p.webapp.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.model.UserVO;
import com.creditplus.p2p.service.UserService;
import com.creditplus.p2p.webapp.UserAction;

public class UserActionImpl implements UserAction {
	
	public static final Logger logger = LogManager.getLogger(UserActionImpl.class);
	
	@Autowired
	private UserService userService ;

	public UserVO getUserById(String id) {	
    	logger.info("id=" + id);
    	UserVO userVO = userService.getUserById(id);
    	logger.info("======" + userVO.getUsername() );

    	return userVO;
	}

}
