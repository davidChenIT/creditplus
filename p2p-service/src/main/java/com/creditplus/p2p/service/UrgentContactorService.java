package com.creditplus.p2p.service;

import java.util.List;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.UrgentContactorVO;

public interface UrgentContactorService {

	public List<?> getListByUserId(@ParamName("user_id")Integer user_id);
	
	public void insertBatch(@ParamName("urgentList")List<UrgentContactorVO> urgentList);
	
	public void updateBath(@ParamName("urgentList")List<UrgentContactorVO> urgentList);
	
}
