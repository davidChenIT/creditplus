package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.LoanAppVO;

public interface LoanAppDao {

	LoanAppVO getLoappVoById(Integer id);
	
	List<LoanAppVO> getLoappVoList();
}
