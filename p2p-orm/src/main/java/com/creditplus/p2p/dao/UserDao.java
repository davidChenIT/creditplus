package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.UserVO;

public interface UserDao {
	
	void insertUser(UserVO userVO);
	
	void deleteUserById(int userId);
	
	void updateUser(UserVO userVO);
	
	UserVO getUserById(int userId);
	
	UserVO findByName(String username);
	
	List<UserVO> getUserListWithPage(UserVO userVO);

}
