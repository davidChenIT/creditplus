package com.creditplus.p2p.service;

import java.util.Map;

public interface CommonInfoService {

	Map getCardInfoById(String cardNo);
	
	Map getPhoneInfoById(String phoneNum);
	
	String getPictureSrcByUserIdAndType(Map paramsMap);
	
	void savePic(Map paramMap);
	
	Map getAntiRistByLoanId(Integer loan_id);
}
