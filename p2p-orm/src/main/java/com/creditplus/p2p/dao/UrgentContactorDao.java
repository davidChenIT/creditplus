package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;


public interface UrgentContactorDao {

	public List<?> getListByUserId(Integer user_id);
	
	public void insertBatch(Map<String,List<?>> urgentMap);
	
	public void deleteByUserId(Integer user_id);
	
}
