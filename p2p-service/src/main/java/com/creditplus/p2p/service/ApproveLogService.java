package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

public interface ApproveLogService {

	@SuppressWarnings("rawtypes")
	Map getAppLogByLoanId(Map<?, ?> paramMap) throws Exception;

	void insertApproveLog(Map<?, ?> paramMap);
	
	void batchInsertApproveLog(List<Map> list);
}
