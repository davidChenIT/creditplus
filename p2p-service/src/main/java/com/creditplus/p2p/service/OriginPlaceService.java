/**
 * Administrator
 * 2015年10月28日
 */
package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;

/**
 * @author Administrator
 *
 */
public interface OriginPlaceService {
	
	List<Map> queryProvince(); 
	
	List<Map> queryCityByProvince(@ParamName("type")String province);

}
