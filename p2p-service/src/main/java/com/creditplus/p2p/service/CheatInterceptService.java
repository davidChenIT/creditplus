package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;

public interface CheatInterceptService {

	boolean intercept(@ParamName("user_id")Integer user_id,@ParamName("loan_id")Integer loan_id) throws Exception;
	
	List<Map> getCheatLogByLoanId(@ParamName("loan_id")Integer loan_id);
}
