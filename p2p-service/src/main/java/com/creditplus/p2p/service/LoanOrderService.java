package com.creditplus.p2p.service;

import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.LoanOrderVO;
import com.creditplus.p2p.model.PageVO;

public interface LoanOrderService {

//	 LoanOrderVO getLoanOrderByLoanId(Map<?, ?> paramMap);
	 
	 PageVO getCreditFirstTrialListWithPage(Map<?, ?> paramMap);
	 
	 PageVO getCreditReviewListWithPage(Map<?, ?> paramMap);
	 
	 LoanOrderVO creditFirstTrial(@ParamName("loan_id")Integer loan_id);
	 
	 LoanOrderVO CreditReview(@ParamName("loan_id")Integer loan_id);
}
