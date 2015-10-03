package com.creditplus.p2p.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.UserDao;
import com.creditplus.p2p.model.UserVO;
import com.creditplus.p2p.ws.ServiceInterface;

public class UserServiceImpl implements ServiceInterface  {
	
	@Autowired 
	private UserDao userDao;
	
	public void addUser(UserVO userVO) {
		
	}

	public void deleteUserById(String id) {
		System.out.println("====执行删除======");
	}
	
	public void deleteUserById(int userId) {
	}

	public void updateUser(UserVO userVO) {
		
	}
	
	public UserVO getUserById(int userId) {
		return userDao.getUserById(userId);
	}

	public Object execute(String module, String method, String request_data) throws Exception {
		if("deleteUserById".equals(method))
			deleteUserById("12");
		return null;
	}

	
}
