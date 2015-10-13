package com.creditplus.p2p.service.impl;

import java.util.List;

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
		urgentDao.insertBatch(urgentList);
	}

	public void deleteByUserId(Integer user_id) {
		urgentDao.deleteByUserId(user_id);
	}


}
