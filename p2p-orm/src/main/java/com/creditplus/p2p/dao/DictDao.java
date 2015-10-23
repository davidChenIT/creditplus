package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.model.DictVO;

public interface DictDao {
	
	void insertDict(List<Map<String,Object>> dataList);
	
	void deleteDict(List<DictVO> dataList);
	
	List<DictVO> getDictListWithPage(DictVO dictVO);
	
	List<DictVO> getDictListByParentId(List<DictVO> dataList);

	List<DictVO> getDictItems(DictVO dictVO);
}
