package com.creditplus.p2p.service;

import java.util.List;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.PageVO;
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
	void deleteUserById(int userId);
	
	/**
	 * update user 
	 * @param userVO
	 */
	void updateUser(UserVO userVO);
	
	/**
	 * change password
	 * @param userVO
	 */
	void changePassword(UserVO userVO); 
	
	/***
	 * get user by id
	 * @param id user id
	 * @return user
	 */
	UserVO getUserById(@ParamName("userId") int userId);
	
	/**
	 * get user list whit page
	 * @param userVO
	 * @return
	 */
	PageVO getUserListWithPage(PageVO pageVO,UserVO userVO);

}
