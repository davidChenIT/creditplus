package com.creditplus.p2p.service;

import java.util.Map;
import com.creditplus.p2p.model.LoanOrderVO;
import com.creditplus.p2p.model.PageVO;

public interface LoanOrderService {

	 LoanOrderVO getLoanOrderByLoanId(Map<?, ?> paramMap);
	 
	 PageVO getLoanOrderListWithPage(Map<?, ?> paramMap);
	 
}
