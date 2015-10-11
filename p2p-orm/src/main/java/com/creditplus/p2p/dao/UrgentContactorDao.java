package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.UrgentContactorVO;

public interface UrgentContactorDao {

	public List<?> getListByUserId(Integer user_id);
	
	public void insertBatch(List<UrgentContactorVO> urgentList);
	
	public void deleteBatch(List<UrgentContactorVO> urgentList);
	
}
