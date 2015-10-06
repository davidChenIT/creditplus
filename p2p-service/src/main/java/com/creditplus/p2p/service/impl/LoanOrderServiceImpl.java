package com.creditplus.p2p.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.creditplus.p2p.dao.LoanOrderDao;
import com.creditplus.p2p.model.LoanOrderVO;
import com.creditplus.p2p.service.LoanOrderService;

public class LoanOrderServiceImpl implements LoanOrderService{

	@Autowired 
	private LoanOrderDao loanAppDao;

	public LoanOrderVO getLoanOrderByLoanId(Map<?, ?> paramMap) {
		return loanAppDao.getLoanOrderByLoanId(paramMap);
	}

	public List<?> getLoanOrderList(Map<?, ?> paramMap) {
		return loanAppDao.getLoanOrderList(paramMap);
	}


}
