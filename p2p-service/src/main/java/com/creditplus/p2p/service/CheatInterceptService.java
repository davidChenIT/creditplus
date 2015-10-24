package com.creditplus.p2p.service;

import com.creditplus.p2p.common.annotation.ParamName;

public interface CheatInterceptService {

	boolean intercept(@ParamName("user_id")Integer user_id,@ParamName("loan_id")Integer loan_id);
}
