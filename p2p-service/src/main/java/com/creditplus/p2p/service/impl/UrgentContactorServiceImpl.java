package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.UrgentContactorDao;
import com.creditplus.p2p.service.CommonInfoService;
import com.creditplus.p2p.service.UrgentContactorService;

public class UrgentContactorServiceImpl implements UrgentContactorService {

	@Autowired
	UrgentContactorDao urgentDao;
	@Autowired
	CommonInfoService commonInfoService;
	
	/**
	 * 先查urgent_contactor_t表，如果该表没有数据就查urgent_list表
	 */
	public List<?> getListByUserId(Integer user_id) {
		List<Map> list=(List<Map>) urgentDao.getListByUserId(user_id);
		if(list!=null && list.size()>0)
			//补全号码归属地
			for(Map map:list){
				String phoneNum=(String) map.get("mobile");
				Map phoneMap=commonInfoService.getPhoneInfoById(phoneNum);
				if(phoneMap!=null && phoneMap.size()>0)
					map.putAll(phoneMap);
			}
		return list;
		
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
