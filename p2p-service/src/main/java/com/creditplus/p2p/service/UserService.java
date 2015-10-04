package com.creditplus.p2p.service;

import com.creditplus.p2p.common.annotation.MethodDesc;
import com.creditplus.p2p.common.annotation.ParamDesc;
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
	
	/***
	 * get user by id
	 * @param id user id
	 * @return user
	 */
	@MethodDesc(Desc={@ParamDesc(paramName="userId",paramType=Integer.class)})
	UserVO getUserById(int userId);

}
