package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.ResourceVO;

public interface ResourceDao{
	
	List<ResourceVO> findAll();
	
	void insertResource(ResourceVO resourceVO);
	
	List<ResourceVO> getResourceListWithPage(ResourceVO resourceVO);
	
}
