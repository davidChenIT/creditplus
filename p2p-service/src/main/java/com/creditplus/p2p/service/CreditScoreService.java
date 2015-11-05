package com.creditplus.p2p.service;

import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;


public interface CreditScoreService {

	Map creditScore(@ParamName("user_id")Integer user_id,@ParamName("loan_id")Integer loan_id);
}
