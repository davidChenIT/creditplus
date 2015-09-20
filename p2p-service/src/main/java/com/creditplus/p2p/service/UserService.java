package com.creditplus.p2p.service;

import com.creditplus.p2p.model.UserVO;

public interface UserService {
	
	/***
	 * get user by id
	 * @param id user id
	 * @return user
	 */
	UserVO getUserById(String id);
	
	/**
	 * add user
	 * @param userVO user
	 */
	void addUser(UserVO userVO);

}
