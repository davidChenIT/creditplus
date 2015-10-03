package com.creditplus.p2p.dao;

import com.creditplus.p2p.model.UserInfoVO;

public interface UserInfoDao {

	void insertUserInfo(UserInfoVO vo);
	
	void deleteUserInfoById(int userId);
	
	void updateUserInfo(UserInfoVO vo);
	
	UserInfoVO getUserInfoById(int userid);
}
