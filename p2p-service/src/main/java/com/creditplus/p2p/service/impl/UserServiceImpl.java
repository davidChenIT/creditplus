package com.creditplus.p2p.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.dao.UserDao;
import com.creditplus.p2p.model.UserVO;
import com.creditplus.p2p.service.UserService;

public class UserServiceImpl implements UserService {

	@Autowired 
	private UserDao userDao;
		
	public void addUser(UserVO userVO) {
		userDao.insertUser(userVO);
	}
	
	public void deleteUserById(int userId) {
		userDao.deleteUserById(userId);
	}

	public void updateUser(UserVO userVO) {
		userDao.updateUser(userVO);
	}
	
	public UserVO getUserById(int userId) {
		return userDao.getUserById(userId);
	}
	
	public List<UserVO> getUsersWithPage(){
		return null;
	}
}
