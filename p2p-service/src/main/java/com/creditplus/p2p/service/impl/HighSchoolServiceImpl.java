/**
 * Administrator
 * 2015年11月29日
 */
package com.creditplus.p2p.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.HighSchoolDao;
import com.creditplus.p2p.service.HighSchoolService;

/**
 * @author Administrator
 *
 */
public class HighSchoolServiceImpl implements HighSchoolService{
	
	@Autowired
	private HighSchoolDao highSchoolDao;

	public List<Map> getHighSchoolList() {
		return highSchoolDao.getHighSchoolList();
	}

	public List<Map> getHighSchoolLevel() {
		return highSchoolDao.getHighSchoolLevel();
	}

}
