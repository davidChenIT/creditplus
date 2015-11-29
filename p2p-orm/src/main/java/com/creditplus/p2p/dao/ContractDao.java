/**
 * 
 */
package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

/**
 * @author frank
 *
 */
public interface ContractDao {

	/***
	 * 查询合同列表
	 * @param map
	 * @return
	 */
	List<Map> getContractListWithPage(Map map);
	
}
