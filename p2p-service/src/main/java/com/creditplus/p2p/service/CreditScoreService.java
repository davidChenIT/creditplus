package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.PageVO;


public interface CreditScoreService {

	Map getCreditScore(@ParamName("user_id")Integer user_id,@ParamName("loan_id")Integer loan_id);
	
	PageVO getCreditScoreListWithPage(Map paramMap);
	
	void deleteCreditScore(List<Integer> idList);
	
	Map getCreditScoreById(@ParamName("score_id")Integer score_id);
	
	List<Map> getCreditItemById(@ParamName("score_id")Integer score_id);
	
	void deleteCreditItem(List<Integer> idList);
	
	void insertCreditScore(@ParamName("creditInfo")Map dataMap,@ParamName("creditItemsList")List<Map> itemsList);
	
	void updateCreditScore(@ParamName("creditInfo")Map dataMap,@ParamName("creditItemsList")List<Map> itemsList) throws Exception;
}
