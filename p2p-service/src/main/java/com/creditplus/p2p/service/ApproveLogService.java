package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

public interface ApproveLogService {

	List<?> getAppLogByLoanId(Map<?, ?> paramMap) throws Exception;

	void insertApproveLog(Map<?, ?> paramMap) throws Exception;
	
}
