package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.model.PageVO;


public interface LoanOrderDao {

	 //初审详情查看服务
	 Map<?, ?> getCreditFirstTrialDetailByLoanId(Integer loan_id);
	 
	 //复审详情查看服务
	 Map<?, ?> getCreditReviewDetailByLoanId(Integer loan_id);
	 
	 //初审列表
	 List<?> getCreditFirstTrialListWithPage(Map<?, ?> paramMap);
	 
	 //复审列表
	 List<?> getCreditReviewListWithPage(Map<?, ?> paramMap);
	 
	 //排名池
	 List<?> rankingPoolListWithPage(Map paramMap);
	 
	 //欺诈拦截列表
	 List<?> checkInterceptListWithPage(Map paramMap);
	 
	 //已发表列表
	 List<?> faBiaoListWithPage(Map paramMap);
	 
	 //加入黑名单
	 void joinTheBackList(Map paramMap);
	 
	 //根据loan_id更新指定列
	 void updateLoanOrderByLoanId(Map paramMap);
	 
	 //复审驳回更新
	 void creditReviewRejectUpdate(Map paramMap);
	 
	 void deleteByLoanId(Integer loan_id);
	 
	 void insertLoanApply(Map<?, ?> paramMap);
	 
	 List<?> selectLoanApplyList(Map<?, ?> paramMap);
	 
}
