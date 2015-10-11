package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.DictVO;

public interface DictDao {
	
	void insertDict(DictVO dictVO);
	
	List<DictVO> getDictListWithPage(DictVO dictVO);

}
