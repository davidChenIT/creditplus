package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.LoanOrderVO;

public interface LoanOrderService {

	 LoanOrderVO getLoanOrderByLoanId(@ParamName("condition")Map<?, ?> paramMap);
	 
	 List<?> getLoanOrderList(@ParamName("condition")Map<?, ?> paramMap);
	 
}
