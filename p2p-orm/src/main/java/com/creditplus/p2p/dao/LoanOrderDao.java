package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;
import com.creditplus.p2p.model.LoanOrderVO;


public interface LoanOrderDao {

	 LoanOrderVO getLoanOrderByLoanId(Map<?, ?> paramMap);
	 
	 List<?> getLoanOrderList(Map<?, ?> paramMap);
}
