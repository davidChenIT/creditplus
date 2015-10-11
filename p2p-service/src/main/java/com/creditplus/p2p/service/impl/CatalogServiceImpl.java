/**
 * 
 */
package com.creditplus.p2p.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.CatalogDao;
import com.creditplus.p2p.model.CatalogVO;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.CatalogService;

/**
 * @author frank
 *
 */
public class CatalogServiceImpl implements CatalogService{
	
	@Autowired
	private CatalogDao catalogDao;

	public void insertCatalog(CatalogVO catalogVO) {
		catalogDao.insertCatalog(catalogVO);
	}

	public PageVO getCatalogListWithPage(PageVO pageVO,CatalogVO catalogVO) {
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		if(null == catalogVO){
			catalogVO = new CatalogVO();
		}
		
		//初始化分页信息
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());
		catalogDao.getCatalogListWithPage(catalogVO);
		return PageUtil.getPageVO();
	}

}
