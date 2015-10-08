package com.creditplus.p2p.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.ApproveLogDao;
import com.creditplus.p2p.model.ApproveLogVO;
import com.creditplus.p2p.service.ApproveLogService;

public class ApproveLogServiceImpl  implements ApproveLogService{

	@Autowired
	private ApproveLogDao dao;
	
	public List<ApproveLogVO> getAppLogByLoanId(Integer loan_id) {
		return dao.getAppLogByLoanId(loan_id);
	}

	public void deletedeleteApproveLogByLoanId(Integer loan_id) {
		dao.deleteAppLogByLoanId(loan_id);
	}

	public void insertApproveLog(ApproveLogVO approveLogVo) {
		dao.insertApproveLog(approveLogVo);
	}

}
