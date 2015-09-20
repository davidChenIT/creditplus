package com.creditplus.p2p.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.UserDao;
import com.creditplus.p2p.model.UserVO;
import com.creditplus.p2p.service.UserService;

public class UserServiceImpl implements UserService {
	
	@Autowired 
	private UserDao userDao;
	
	public void addUser(UserVO userVO) {
		
	}

	public void deleteUserById(String id) {
		
	}

	public void updateUser(UserVO userVO) {
		
	}
	
	public UserVO getUserById(String id) {
		return userDao.getUserById(id);
	}
}
