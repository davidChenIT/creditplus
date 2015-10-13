package com.creditplus.p2p.dao;

import java.util.Map;

public interface CustomerInfoDao {

	@SuppressWarnings("rawtypes")
	void insert(Map paramMap);
	
	@SuppressWarnings("rawtypes")
	void deleteByUserId(Integer user_id);
	
}
