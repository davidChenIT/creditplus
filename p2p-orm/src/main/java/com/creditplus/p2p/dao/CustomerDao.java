package com.creditplus.p2p.dao;

import com.creditplus.p2p.model.CustomerVO;

public interface CustomerDao {

	void insertUserInfo(CustomerVO vo);
	
	void deleteUserInfoById(Integer userId);
	
	void updateUserInfo(CustomerVO vo);
	
	CustomerVO getUserInfoById(Integer userid);
}
