package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;
import com.creditplus.p2p.model.LoanOrderVO;


public interface LoanOrderDao {

	 LoanOrderVO getLoanOrderByLoanId(Integer loan_id);
	 
	 List<?> getLoanOrderListWithPage(Map<?, ?> paramMap);
	 
	 void updateLoanOrder(LoanOrderVO loanOrder);
	 
	 void deleteByLoanId(Integer loan_id);
}
