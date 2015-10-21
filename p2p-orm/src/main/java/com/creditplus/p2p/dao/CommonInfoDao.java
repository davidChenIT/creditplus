package com.creditplus.p2p.dao;

import java.util.Map;

public interface CommonInfoDao {

	Map getCardInfoById(String id_first_num);
	
	Map getPhoneInfoById(String area);
}
