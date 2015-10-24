package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

public interface CheatInterceptDao {

	List<?> getCheatInfoListByLoanId(Integer loan_id);
	
	void insertBatch(Map cheatMap);
}
