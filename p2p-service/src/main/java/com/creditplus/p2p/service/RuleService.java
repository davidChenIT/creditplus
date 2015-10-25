package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.model.PageVO;

public interface RuleService {

	PageVO getRulesListWithPage(Map paramMap);
	
	List<Map> getDimensionListByRuleId(Integer rule_id);
	
	void deleteRule(List<Integer> idList);
	
	void deleteDimension(List<Integer> idList);

	void insertRule(List<Map<String, Object>> dataList);
	
	void insertDimension(List<Map<String, Object>> dataList);
}
