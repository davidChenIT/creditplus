package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.constant.Constant;
import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.dao.ApproveLogDao;
import com.creditplus.p2p.service.ApproveLogService;

public class ApproveLogServiceImpl  implements ApproveLogService{

	@Autowired
	private ApproveLogDao approveLogDao;
	
	public Map getAppLogByLoanId(Map paramMap) throws Exception {
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID);
		List applogList=approveLogDao.getAppLogByLoanId(paramMap);
		Map gridMap=new HashMap();
		gridMap.put("griddata", applogList);
		return gridMap;
	}
	
	
	/**
	 * 日志插入
	 */
	public void insertApproveLog(Map paramMap,boolean flag) throws Exception {
		//判断是否已插入日志
//		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state");
		System.out.println("paramMap:"+paramMap);
		if(flag){
			Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
			Integer total_record=approveLogDao.getCountByLoanId(loan_id);
			if(total_record==0)
				approveLogDao.insertApproveLog(paramMap);
		}else{
			approveLogDao.insertApproveLog(paramMap);
		}
	}

}
