package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.model.DictVO;
import com.creditplus.p2p.model.PageVO;

public interface DictService {
	
	void insertDict(List<Map<String,Object>> dataList);
	
	PageVO getDictListWithPage(PageVO pageVO,DictVO dictVO);
}
