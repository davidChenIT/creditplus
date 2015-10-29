package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

public interface RuleDao {

	List<Map> getRulesList(Map<String, Object> paramMap);
	
	Map getRuleDetailById(Integer rule_id);
	
	List<Map> getRulesListWithPage(Map<String, Object> paramMap);
	
	List<Map> getDimensionListByRuleId(Integer rule_id);
	
	Map findByName(String rule_name);

	void deleteRuleById(List<Integer> idList);
	
	void updateRule(Map ruleMap);
	
	void deleteDimensionById(List<Integer> idList);
	
	void deleteDimensionByRuleId(Integer rule_id);

	void insertRule(Map ruleMap);
	
	void insertDimension(Map<String, Object> dataMap);
	
	
}
