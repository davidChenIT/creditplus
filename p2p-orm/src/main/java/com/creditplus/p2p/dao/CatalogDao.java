package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.CatalogVO;

public interface CatalogDao {
	
	void insertCatalog(CatalogVO catalogVO);
	
	List<CatalogVO> getCatalogListWithPage(CatalogVO catalogVO);
}
