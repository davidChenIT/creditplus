package com.creditplus.p2p.service;

import java.util.List;

import com.creditplus.p2p.common.annotation.ParamName;

public interface UrgentContactorService {

	
	public List<?> getListByUserId(@ParamName("user_id")Integer user_id);
	
	public void insertBatch(List<?> urgentList);
	
	public void deleteByUserId(Integer user_id);
	
	void getUrgentListByUserId(Integer user_id);
	
}
