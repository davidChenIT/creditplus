package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.model.CatalogVO;

public interface CatalogDao {
	
	void insertCatalog(List<Map<String,Object>> dataList);
	
	void deleteCatalog(List<CatalogVO> dataList);
	
	List<CatalogVO> getCatalogListWithPage(CatalogVO catalogVO);
	
	List<CatalogVO> getCatalogListByParentId(List<CatalogVO> dataList);
	
}
