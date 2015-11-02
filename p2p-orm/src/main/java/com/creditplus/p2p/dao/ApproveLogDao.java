package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

public interface ApproveLogDao {

	List<?> getAppLogByLoanId(Map<?, ?> paramMap);
	
	Integer getCountByParam(Map<?, ?> paramMap);
	
	void insertApproveLog(Map<?, ?> paramMap);
	
	void batchInsertApproveLog(Map approveLogMap);
}
