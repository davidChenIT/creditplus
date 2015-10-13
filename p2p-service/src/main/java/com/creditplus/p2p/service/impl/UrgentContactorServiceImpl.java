package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.UrgentContactorDao;
import com.creditplus.p2p.service.UrgentContactorService;

public class UrgentContactorServiceImpl implements UrgentContactorService {

	@Autowired
	UrgentContactorDao urgentDao;
	
	public List<?> getListByUserId(Integer user_id) {
		return urgentDao.getListByUserId(user_id);
	}

	public void insertBatch(List<?> urgentList) {
		Map urgentMap=new HashMap();
		urgentMap.put("list", urgentList);
		urgentDao.insertBatch(urgentMap);
	}

	public void deleteByUserId(Integer user_id) {
		urgentDao.deleteByUserId(user_id);
	}


}
