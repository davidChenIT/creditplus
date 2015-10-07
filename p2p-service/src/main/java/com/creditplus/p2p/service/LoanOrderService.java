package com.creditplus.p2p.service;

import java.util.Map;
import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.LoanOrderVO;
import com.creditplus.p2p.model.PageVO;

public interface LoanOrderService {

	 LoanOrderVO getLoanOrderByLoanId(@ParamName("condition")Map<?, ?> paramMap);
	 
	 PageVO getLoanOrderListWithPage(@ParamName("condition")Map<?, ?> paramMap);
	 
}
