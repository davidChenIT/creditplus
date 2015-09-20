package com.creditplus.p2p.service;

import com.creditplus.p2p.model.UserVO;

public interface UserService {
		
	/**
	 * add user
	 * @param userVO user
	 */
	void addUser(UserVO userVO);
	
	/**
	 * delete user by id
	 * @param id
	 */
	void deleteUserById(String id);
	
	/**
	 * update user 
	 * @param userVO
	 */
	void updateUser(UserVO userVO);
	
	/***
	 * get user by id
	 * @param id user id
	 * @return user
	 */
	UserVO getUserById(String id);

}
