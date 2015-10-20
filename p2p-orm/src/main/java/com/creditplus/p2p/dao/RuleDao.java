package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

public interface RuleDao {

	List<Map> getRulesList();
	
	List<Map> getDimensionListByRuleId(Integer rule_id);
	 
}
