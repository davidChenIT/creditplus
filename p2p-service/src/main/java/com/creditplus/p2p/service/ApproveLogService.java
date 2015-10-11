package com.creditplus.p2p.service;

import java.util.List;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.ApproveLogVO;

public interface ApproveLogService {

	List<?> getAppLogByLoanId(@ParamName("loan_id")Integer loan_id);

	void insertApproveLog(@ParamName("approveLogVo")ApproveLogVO approveLogVo);
}
