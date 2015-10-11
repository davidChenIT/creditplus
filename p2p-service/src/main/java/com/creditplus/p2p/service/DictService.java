package com.creditplus.p2p.service;

import com.creditplus.p2p.model.DictVO;
import com.creditplus.p2p.model.PageVO;

public interface DictService {
	
	void insertDict(DictVO dictVO);
	
	PageVO getDictListWithPage(PageVO pageVO,DictVO dictVO);
}
