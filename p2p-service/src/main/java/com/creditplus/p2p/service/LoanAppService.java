package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;

public interface LoanAppService {

	List<Map> getLoappVoList(@ParamName("loan_id")Integer loan_id);
}
