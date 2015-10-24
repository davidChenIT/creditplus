package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.CatalogVO;
import com.creditplus.p2p.model.PageVO;

public interface CatalogService {
	
	void insertCatalog(@ParamName("parentId") int parentId,@ParamName("griddata")List<Map<String,Object>> dataList);
	
	PageVO getCatalogListWithPage(PageVO pageVO,CatalogVO catalogVO);
	
	List<Map<String,Object>> getCatalogTree();
	
	List<Map<String,Object>> getCatalogLeftTree();
}
