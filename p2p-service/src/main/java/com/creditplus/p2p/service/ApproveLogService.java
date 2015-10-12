package com.creditplus.p2p.service;

import java.util.Map;

public interface ApproveLogService {

	@SuppressWarnings("rawtypes")
	Map getAppLogByLoanId(Map<?, ?> paramMap) throws Exception;

	void insertApproveLog(Map<?, ?> paramMap,boolean flag) throws Exception;
	
}
