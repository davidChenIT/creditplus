/**
 * Administrator
 * 2015年10月28日
 */
package com.creditplus.p2p.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.OriginPlaceDao;
import com.creditplus.p2p.service.OriginPlaceService;

/**
 * @author Administrator
 *
 */
public class OriginPlaceServiceImpl implements OriginPlaceService {

	@Autowired
	OriginPlaceDao originPlaceDao;
	/* 
	 * @return
	 */
	public List<Map> queryProvince() {
		return originPlaceDao.queryProvince();
	}

	/* 
	 * @param id
	 * @return
	 */
	public List<Map> queryCityByProvince(String province) {
		return originPlaceDao.queryCityByProvince(province);
	}

}
