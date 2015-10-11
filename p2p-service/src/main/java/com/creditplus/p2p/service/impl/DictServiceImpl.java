package com.creditplus.p2p.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.DictDao;
import com.creditplus.p2p.model.DictVO;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.DictService;

public class DictServiceImpl implements DictService {
	
	@Autowired
	private DictDao dictDao;

	public void insertDict(DictVO dictVO) {
		dictDao.insertDict(dictVO);
	}

	public PageVO getDictListWithPage(PageVO pageVO,DictVO dictVO) {
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		if(null == dictVO){
			dictVO = new DictVO();
		}
		
		//初始化分页信息
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());
		dictDao.getDictListWithPage(dictVO);
		
		return PageUtil.getPageVO();
	}

}
