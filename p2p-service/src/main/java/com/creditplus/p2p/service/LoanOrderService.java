package com.creditplus.p2p.service;

import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.LoanOrderVO;
import com.creditplus.p2p.model.PageVO;

public interface LoanOrderService {

	 //初审列表
	 PageVO getCreditFirstTrialListWithPage(Map<?, ?> paramMap);
	 
	 //复审列表
	 PageVO getCreditReviewListWithPage(Map<?, ?> paramMap);
	 
	 //初审详情
	 Map<?, ?> creditFirstTrial(@ParamName("loan_id")Integer loan_id);
	 
	 //复审详情
	 Map<?, ?> creditReview(@ParamName("loan_id")Integer loan_id);
	 
//	 void setHandlerBy(@ParamName(""));
}
