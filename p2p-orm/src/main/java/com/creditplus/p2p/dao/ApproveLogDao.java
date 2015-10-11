package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.ApproveLogVO;

public interface ApproveLogDao {

	List<?> getAppLogByLoanId(Integer loan_id);
	
	void insertApproveLog(ApproveLogVO approveLogVo);
}
