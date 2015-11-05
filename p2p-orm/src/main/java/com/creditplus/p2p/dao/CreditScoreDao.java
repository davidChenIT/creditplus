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

	List<Map> getCreditScoreList();
	
	List<Map> getCreditItemById(Integer score_id);
}
