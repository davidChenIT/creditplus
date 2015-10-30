/**
 * Administrator
 * 2015年10月28日
 */
package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

/**
 * @author Administrator
 *
 */
public interface OriginPlaceDao {
	
	List<Map> queryProvince();
	
	List<Map> queryCityByProvince(String type);

}
