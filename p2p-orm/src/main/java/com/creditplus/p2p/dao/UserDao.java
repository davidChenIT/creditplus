package com.creditplus.p2p.dao;

import com.creditplus.p2p.model.UserVO;

public interface UserDao {
	
	void insertUser(UserVO userVO);
	
	void deleteUserById(String id);
	
	void updateUser(UserVO userVO);
	
	UserVO getUserById(String id);

}
