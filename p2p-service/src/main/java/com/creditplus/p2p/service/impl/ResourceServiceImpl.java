package com.creditplus.p2p.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.ResourceDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.ResourceVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.ResourceService;

public class ResourceServiceImpl implements ResourceService{
	
	@Autowired
	private ResourceDao resourceDao;

	public void insertResource(ResourceVO resourceVO) {
		resourceDao.insertResource(resourceVO);
	}

	public PageVO getResourceListWithPage(PageVO pageVO,ResourceVO resourceVO) {
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		if(null == resourceVO){
			resourceVO = new ResourceVO();
		}
		
		//初始化分页信息
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());
		resourceDao.getResourceListWithPage(resourceVO);
		
		return PageUtil.getPageVO();
	}

}
