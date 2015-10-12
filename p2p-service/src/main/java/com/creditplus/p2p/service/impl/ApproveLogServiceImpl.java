package com.creditplus.p2p.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.util.CheckParameterUtil;
import com.creditplus.p2p.dao.ApproveLogDao;
import com.creditplus.p2p.service.ApproveLogService;

public class ApproveLogServiceImpl  implements ApproveLogService{

	@Autowired
	private ApproveLogDao approveLogDao;
	
	public List<?> getAppLogByLoanId(Map paramMap) throws Exception {
		CheckParameterUtil.checkKey(paramMap, "loan_id");
		return approveLogDao.getAppLogByLoanId(paramMap);
	}

	public void insertApproveLog(Map paramMap) throws Exception {
		//判断是否已插入日志
		CheckParameterUtil.checkKey(paramMap, "loan_id","approve_content","state");
		List logList=approveLogDao.getAppLogByLoanId(paramMap);
		if(logList.size()==0)
			approveLogDao.insertApproveLog(paramMap);
	}
	

}
