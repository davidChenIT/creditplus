package com.creditplus.p2p.service;

import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.ResourceVO;

public interface ResourceService {
	
	void insertResource(ResourceVO resourceVO);
	
	PageVO getResourceListWithPage(PageVO pageVO,ResourceVO resourceVO);
}
