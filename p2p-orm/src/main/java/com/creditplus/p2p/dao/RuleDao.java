package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

public interface RuleDao {

	List<Map> getRulesList(Map<String, Object> paramMap);
	
	List<Map> getRulesListWithPage(Map<String, Object> paramMap);
	
	List<Map> getDimensionListByRuleId(Map dimensionMap);
	
	void deleteRule(List<Integer> idList);
	
	void deleteDimension(List<Integer> idList);
	
	void deleteDimensionByRuleId(List<Integer> idList);

	void insertRule(Map ruleMap);
	
	void insertDimension(Map<String, Object> dataMap);
	
}
