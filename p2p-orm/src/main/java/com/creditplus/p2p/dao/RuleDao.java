package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

public interface RuleDao {

	List<Map> getRulesList(Map<String, Object> paramMap);
	
	Map getRuleDetailById(Integer rule_id);
	
	List<Map> getRulesListWithPage(Map<String, Object> paramMap);
	
	List<Map> getDimensionListByRuleId(Map dimensionMap);
	
	Map findByName(String rule_name);

	void deleteRule(List<Integer> idList);
	
	void updateRule(Integer rule_id);
	
	void deleteDimension(List<Integer> idList);
	
	void deleteDimensionByRuleId(Integer rule_id);

	void insertRule(Map ruleMap);
	
	void insertDimension(Map<String, Object> dataMap);
	
	
}
