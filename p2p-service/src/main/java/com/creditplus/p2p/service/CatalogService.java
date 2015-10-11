package com.creditplus.p2p.service;

import com.creditplus.p2p.model.CatalogVO;
import com.creditplus.p2p.model.PageVO;

public interface CatalogService {
	
	void insertCatalog(CatalogVO dictVO);
	
	PageVO getCatalogListWithPage(PageVO pageVO,CatalogVO catalogVO);
}
