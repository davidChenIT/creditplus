package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.UserVO;

public interface UserService {
		
	/**
	 * add user
	 * @param userVO user
	 */
	void addUser(UserVO userVO,@ParamName("griddata")List<Map<String,Object>> userRoleList) throws Exception;
	
	/**
	 * delete user by id
	 * @param userIdList
	 */
	void deleteUserById(List<Integer> userIdList);
	
	/**
	 * update user 
	 * @param userVO
	 */
	void updateUser(UserVO userVO,@ParamName("griddata")List<Map<String,Object>> userRoleList) throws Exception;
	
	/**
	 * change password
	 * @param userVO
	 */
	void changePassword(UserVO userVO)throws Exception; 
	
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
	
	/***
	 * get user role list
	 * @param userId
	 * @return
	 */
	List<Map<String,Object>> getUserRoleListByUserID(@ParamName("userId") int userId);

}
