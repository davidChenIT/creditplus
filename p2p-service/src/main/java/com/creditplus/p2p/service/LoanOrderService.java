package com.creditplus.p2p.service;

import java.util.Map;
import com.creditplus.p2p.model.PageVO;

public interface LoanOrderService {

	//初审列表
	@SuppressWarnings("rawtypes")
	 PageVO getCreditFirstTrialListWithPage(Map paramMap);
	 
	 //复审列表
	 PageVO getCreditReviewListWithPage(@SuppressWarnings("rawtypes") Map paramMap);
	 
	 //排名池
	 PageVO rankingPoolListWithPage(Map paramMap);
	 
	 //欺诈拦截列表
	 PageVO checkInterceptListWithPage(Map paramMap);
	 
	 //已发表列表
	 PageVO faBiaoListWithPage(Map paramMap);
	 
	 //加入黑名单
	 void joinTheBackList(Map paramMap);
	 
	 //初审
	 @SuppressWarnings("rawtypes")
	 void creditFirstTrial( Map paramMap) throws Exception;
	 
	//复审
	 @SuppressWarnings("rawtypes")
	 void creditReview(Map paramMap) throws Exception;
	 
	 //初审详情
	 @SuppressWarnings("rawtypes")
	 Map getCreditFirstTrialDetailByLoanId(Map paramMap) throws Exception;
	 
	 //复审详情
	 @SuppressWarnings("rawtypes")
	 Map getCreditReviewDetailByLoanId(Map paramMap) throws Exception;
	 
	 //复审驳回
	 @SuppressWarnings("rawtypes")
	 void creditReviewReject(Map paramMap) throws Exception;
	 
	 void updateLoanOrderState(Map loanOrderMap) throws Exception;
	 
}
