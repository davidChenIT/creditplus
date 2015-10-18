package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.model.UserVO;

public interface UserDao {
	
	void insertUser(UserVO userVO);
	
	void deleteUserById(List<Integer> userIdList);
	
	void updateUser(UserVO userVO);
	
	void changePassword(UserVO userVO);
	
	UserVO getUserById(int userId);
	
	UserVO findByName(String username);
		
	List<UserVO> getUserListWithPage(UserVO userVO);
	
	List<Map<String,Object>> getUserRoleListByUserID(int userId);
	
	void deleteUserRoleByUserId(int userId);
	
	void insertUserRole(List<Map<String,Object>> dataList);
}
