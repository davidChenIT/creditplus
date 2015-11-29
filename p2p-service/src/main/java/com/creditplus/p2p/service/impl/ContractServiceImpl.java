/**
 * 
 */
package com.creditplus.p2p.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.ContractDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.ContractService;

/**
 * @author frank
 *
 */
public class ContractServiceImpl implements ContractService {
	
	@Autowired
	private ContractDao contractDao;

	public PageVO getContractListWithPage(PageVO pageVO,Map map) {
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());		
		contractDao.getContractListWithPage(map);
		return PageUtil.getPageVO();	
	}

	public String getContractUrl(String contract_id) {
		return contractDao.getContractUrl(contract_id);
	}
	
	
	
	public void insert(Map paramMap) {
		contractDao.insert(paramMap);
	}

}
