package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.DictVO;
import com.creditplus.p2p.model.PageVO;

public interface DictService {
	
	void insertDict(@ParamName("parentId") int parentId,@ParamName("griddata")List<Map<String,Object>> dataList);
	
	void deleteDict(List<Integer> idList);

	PageVO getDictListWithPage(PageVO pageVO,DictVO dictVO);
	
	List<DictVO> getDictItems(DictVO dictVO);
	
	
}
