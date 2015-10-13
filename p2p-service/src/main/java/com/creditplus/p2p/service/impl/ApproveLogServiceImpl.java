package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.dao.ApproveLogDao;
import com.creditplus.p2p.service.ApproveLogService;

public class ApproveLogServiceImpl  implements ApproveLogService{

	@Autowired
	private ApproveLogDao approveLogDao;
	
	public Map getAppLogByLoanId(Map paramMap) throws Exception {
		CheckParamUtil.checkKey(paramMap, "loan_id");
		List applogList=approveLogDao.getAppLogByLoanId(paramMap);
		Map gridMap=new HashMap();
		gridMap.put("griddata", applogList);
		return gridMap;
	}
	
	/**
	 * 
	 */
	public void insertApproveLog(Map paramMap,boolean flag) throws Exception {
		//判断是否已插入日志
//		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","state");
		System.out.println("paramMap:"+paramMap);
		if(flag){
			List logList=approveLogDao.getAppLogByLoanId(paramMap);
			if(logList.size()==0)
				approveLogDao.insertApproveLog(paramMap);
		}else{
			approveLogDao.insertApproveLog(paramMap);
		}
	}
	

}
