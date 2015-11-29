package com.creditplus.p2p.service;

import java.util.Map;

import com.creditplus.p2p.model.PageVO;

public interface ContractService {

	/***
	 * 查询合同列表
	 * @param map
	 * @return
	 */
	PageVO getContractListWithPage(PageVO pageVO,Map map);
	
	void insert(Map paramMap);
}
