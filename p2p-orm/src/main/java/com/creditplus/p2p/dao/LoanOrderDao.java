package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;


public interface LoanOrderDao {

	 Map<?, ?> getCreditFirstTrialDetailByLoanId(Integer loan_id);
	 
	 Map<?, ?> getCreditReviewDetailByLoanId(Integer loan_id);
	 
	 //初审列表
	 List<?> getCreditFirstTrialListWithPage(Map<?, ?> paramMap);
	 
	 //复审列表
	 List<?> getCreditReviewListWithPage(Map<?, ?> paramMap);
	 
	 void updateLoanOrder(Map paramMap);
	 
	 void deleteByLoanId(Integer loan_id);
	 
	 void insertLoanApply(Map<?, ?> paramMap);
	 
	 List<?> selectLoanApplyList(Map<?, ?> paramMap);
	 
}
