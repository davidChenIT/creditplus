/**
 * Administrator
 * 2015年11月5日
 */
package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

/**
 * @author Administrator
 *
 */
public interface CreditScoreDao {

	List<Map> getCreditScoreList(Map dataMap);
	
	void deleteCreditScore(List<Integer> idList);
	
	List<Map> getCreditItemById(Integer score_id);
	
	void deleteCreditItem(List<Integer> idList);
	
	void deleteCreditItemBySid(Integer score_id);
	
	void insertCreditScore(Map dataMap);
	
	void insertCreditItems(Map<String, Object> dataMap);
	
	void updateCreditScore(Map dataMap);
	
	Integer findByName(String dimension_name);
}
