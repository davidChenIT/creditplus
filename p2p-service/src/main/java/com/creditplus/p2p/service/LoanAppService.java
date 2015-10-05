package com.creditplus.p2p.service;

import java.util.List;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.LoanAppVO;

public interface LoanAppService {

	LoanAppVO getLoappVoById(@ParamName("loan_id")Integer loan_id);

	List<LoanAppVO> getLoappVoList();
}
