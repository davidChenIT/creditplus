package com.creditplus.p2p.service;

import java.util.Map;
import com.creditplus.p2p.model.PageVO;

public interface LoanOrderService {

	 //初审列表
	 PageVO getCreditFirstTrialListWithPage(@SuppressWarnings("rawtypes") Map paramMap);
	 
	 //复审列表
	 PageVO getCreditReviewListWithPage(@SuppressWarnings("rawtypes") Map paramMap);
	 
	 //初审详情
	 @SuppressWarnings("rawtypes")
	 Map creditFirstTrial( Map paramMap) throws Exception;
	 
	//复审详情
	 @SuppressWarnings("rawtypes")
	 Map creditReview(Map paramMap) throws Exception;
	 
}
