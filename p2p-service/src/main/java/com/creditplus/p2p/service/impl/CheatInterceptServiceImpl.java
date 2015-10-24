package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.CheatInterceptDao;
import com.creditplus.p2p.dao.CommonInfoDao;
import com.creditplus.p2p.dao.LoanOrderDao;
import com.creditplus.p2p.dao.RuleDao;
import com.creditplus.p2p.service.CheatInterceptService;

public class CheatInterceptServiceImpl implements CheatInterceptService {

	@Autowired
	CommonInfoDao commonInfoDao;
	@Autowired
	RuleDao ruleDao;
	@Autowired
	CheatInterceptDao cheatInterceptDao;
	@Autowired
	LoanOrderDao loanOrderDao;
	
	
	public void intercept(Integer user_id,Integer loan_id) {
		List<Map> ruleList=getRuleList();
		if(ruleList!=null && ruleList.size()>0){
			for(Map ruleMap:ruleList){
				Integer rule_id=Integer.valueOf(ruleMap.get("rule_id")+"");
				List<Map> dimensionList=getDimensionByRuleId(rule_id);
				if(dimensionList!=null && dimensionList.size()>0){
					for(Map dismensionMap:dimensionList){
						executeChectSql(dismensionMap, user_id,loan_id);
					}
				}
			}
		}
	}
	
	private List<Map> getRuleList(){
		/*String sql="select rule_id,rule_name from rule_t where state=1 and rule_id=#{rule_id}";
		Map sqlMap=new HashMap();
		sqlMap.put("sql",sql);
		sqlMap.put("rule_id", rule_id);
		return commonInfoDao.executeDonamicSQL(sqlMap);*/
		return ruleDao.getRulesList();
	}
	
	private List<Map> getDimensionByRuleId(Integer rule_id){
		/*String sql="select rule_id, table_name,column_name,semanteme,value,arithmetic from dimension_t where rule_id=#{rule_id}";
		Map sqlMap=new HashMap();
		sqlMap.put("sql",sql);
		sqlMap.put("rule_id", rule_id);
		return commonInfoDao.executeDonamicSQL(sqlMap);*/
		return ruleDao.getDimensionListByRuleId(rule_id);
	}

	
	private void executeChectSql(Map dismensionMap,Integer user_id,Integer loan_id){
		String tableName=(String) dismensionMap.get("table_name");
		String column_name=(String) dismensionMap.get("column_name");
		String semanteme=(String) dismensionMap.get("semanteme");
		String value=(String) dismensionMap.get("value");
		StringBuilder sbSql=new StringBuilder("select count(1) as total_record from ").append(tableName).append(" where ")
				.append(column_name).append(semanteme).append("#{value} and ").append("user_id = #{user_id}");
		
		Map sqlMap=new HashMap();
		sqlMap.put(sqlMap, sbSql.toString());
		sqlMap.put("sql", sbSql.toString());
		sqlMap.put("value", value);
		sqlMap.put("user_id", user_id);
		
		System.out.println("rule check sql"+sbSql);
		List<Map> list=commonInfoDao.executeDonamicSQL(sqlMap);
		Integer total_record=0;
		if(list!=null && list.size()>0)
			total_record=Integer.valueOf(list.iterator().next().get("total_record")+"");
		
		System.out.println("total_record===="+total_record);
		boolean checkFlag=false;
		if(semanteme.contains("!=")){
			checkFlag=total_record==0?true:false;
		}else if(semanteme.contains(">")){
			checkFlag=total_record==0?true:false;
		}else if(semanteme.contains("<")){
			checkFlag=total_record==0?false:true;
		}
		
		if(checkFlag){
			System.out.println("有欺诈=============");
			
			String userName=CommonUtil.getCurrentUser();
			Map loanOrderMap=new HashMap();
			loanOrderMap.put("loan_id", loan_id);
			loanOrderMap.put("apply_state", 2);
			loanOrderMap.put("last_updated_by", userName);
			loanOrderDao.updateLoanOrderByLoanId(loanOrderMap);
			
			Map cheatMap=new HashMap();
			cheatMap.put("loan_id", loan_id);
			cheatMap.put("intercept_source", "system");
			cheatMap.put("check_item", dismensionMap.get("rule_name"));
			cheatMap.put("intercept_cause", "检查 "+dismensionMap.get("column_name")+" 不通过");
			cheatMap.put("last_updated_by", userName);
			cheatInterceptDao.insertBatch(cheatMap);
		}
	}

}