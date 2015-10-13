package com.creditplus.p2p.dao;

import java.util.List;


public interface UrgentContactorDao {

	public List<?> getListByUserId(Integer user_id);
	
	public void insertBatch(List<?> urgentList);
	
	public void deleteByUserId(Integer user_id);
	
}
