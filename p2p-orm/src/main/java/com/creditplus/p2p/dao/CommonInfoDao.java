package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

public interface CommonInfoDao {

	Map getCardInfoById(String id_first_num);
	
	Map getPhoneInfoById(String area);
	
	List executeDonamicSQL(Map sqlMap);
	
	Map getPictureSrcByUserIdAndType(Map paramsMap);
	
	void savePic(Map paramMap);
	
	void deletePic(Map paramMap);
	
	Map getAntiRistByLoanId(Integer loan_id);
}
