package com.creditplus.p2p.service;

import java.util.Map;
import com.creditplus.p2p.model.PageVO;

public interface LoanOrderService {

	//初审列表
	@SuppressWarnings("rawtypes")
	 PageVO getCreditFirstTrialListWithPage(Map paramMap);
	 
	 //复审列表
	 PageVO getCreditReviewListWithPage(@SuppressWarnings("rawtypes") Map paramMap);
	 
	 //初审详情
	 @SuppressWarnings("rawtypes")
	 Map creditFirstTrial( Map paramMap) throws Exception;
	 
	//复审详情
	 @SuppressWarnings("rawtypes")
	 Map creditReview(Map paramMap) throws Exception;
	 
	 @SuppressWarnings("rawtypes")
	 Map getCreditFirstTrialDetailByLoanId(Map paramMap) throws Exception;
	 
	 @SuppressWarnings("rawtypes")
	 Map getCreditReviewDetailByLoanId(Map paramMap) throws Exception;
	 
	 
	 
}
