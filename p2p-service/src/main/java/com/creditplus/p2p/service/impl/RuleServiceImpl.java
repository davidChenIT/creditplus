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

	
	private String getCheckSql(Map dismensionMap,Integer user_id){
		String tableName=(String) dismensionMap.get("table_name");
		String column_name=(String) dismensionMap.get("column_name");
		String semanteme=(String) dismensionMap.get("semanteme");
		String value=(String) dismensionMap.get("value");
		StringBuilder sbSql=new StringBuilder("select count(1) as total_record from ").append(tableName).append(" where ")
				.append(column_name).append(semanteme).append(value).append(" and ").append("user_id = ").append(user_id);
		System.out.println("rule check sql"+sbSql);
		return sbSql.toString();
		
	}
}
