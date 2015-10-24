package com.creditplus.p2p.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.RuleDao;
import com.creditplus.p2p.service.RuleService;

public class RuleServiceImpl implements RuleService{

	@Autowired
	RuleDao ruleDao;
	
	public boolean checkRule(Integer user_id) {
		List<Map> rules= ruleDao.getRulesList();
		for(Map ruleMap:rules){
			Integer rule_id=Integer.valueOf(ruleMap.get("rule_id")+"");
			List dimensionList=ruleDao.getDimensionListByRuleId(rule_id);
		}
		return false;
	}
	
	private boolean executeSql(String sql){
		return false;
		
	}
	
}
