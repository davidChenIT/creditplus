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
	
	
	public boolean intercept(Integer user_id,Integer loan_id) {
		boolean checkFlag=false;
		List<Map> ruleList=getRuleList();
		if(ruleList!=null && ruleList.size()>0){
			for(Map ruleMap:ruleList){
				Integer rule_id=Integer.valueOf(ruleMap.get("rule_id")+"");
				List<Map> dimensionList=getDimensionByRuleId(rule_id);
				if(dimensionList!=null && dimensionList.size()>0){
					for(Map dismensionMap:dimensionList){
						checkFlag=executeChectSql(dismensionMap, user_id,loan_id);
						
					}
				}
			}
		}
		return checkFlag;
	}
	
	private List<Map> getRuleList(){
		return ruleDao.getRulesList();
	}
	
	private List<Map> getDimensionByRuleId(Integer rule_id){
		return ruleDao.getDimensionListByRuleId(rule_id);
	}
	
/*	private executeChectSql(List<Map> dismensionList,Integer user_id,Integer loan_id){
		StringBuilder sbSql=new StringBuilder("select count(1) as total_record from ");
		if(dismensionList!=null && dismensionList.size()>0){
			String tableName=(String) dismensionList.iterator().next().get("table_name");
			sbSql.append(tableName).append(" where ");
		}
			
		for(int i=0;i<dismensionList.size();i++){
			Map dismensionMap=dismensionList.get(i);
			String tableName=(String) dismensionMap.get("table_name");
			String column_name=(String) dismensionMap.get("column_name");
			String semanteme=(String) dismensionMap.get("semanteme");
			String value=(String) dismensionMap.get("value");
			sbSql.append(column_name).append(semanteme).append("#{value} ");
			if(i<dismensionList.size()-1)
				sbSql.append(c)
		}
	} */

	
	/**
	 * 校验单个维度
	 * @param dismensionMap
	 * @param user_id
	 * @param loan_id
	 * @return
		boolean
	 */
	private boolean executeChectSql(Map dismensionMap,Integer user_id,Integer loan_id){
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
			
			//更新申请单状态
			String userName=CommonUtil.getCurrentUser();
			Map loanOrderMap=new HashMap();
			loanOrderMap.put("loan_id", loan_id);
			loanOrderMap.put("apply_state", 6);
			loanOrderMap.put("last_updated_by", userName);
			loanOrderDao.updateLoanOrderByLoanId(loanOrderMap);
			
			//插入拦截日志
			Map cheatMap=new HashMap();
			cheatMap.put("loan_id", loan_id);
			cheatMap.put("intercept_source", "system");
			cheatMap.put("check_item", dismensionMap.get("rule_name"));
			cheatMap.put("intercept_cause", "检查 "+dismensionMap.get("column_name")+" 不通过");
			cheatMap.put("last_updated_by", userName);
			cheatInterceptDao.insertBatch(cheatMap);
			
			//插入审批日志
			Map approveMap=new HashMap();
			approveMap.put("loan_id", loan_id);
			approveMap.put("apply_state", 6);
			approveMap.put("approve_content", dismensionMap.get("rule_name")+"检查 "+dismensionMap.get("column_name")+" 不通过");
			approveMap.put("last_updated_by", userName);
			
		}
		return checkFlag;
	}

}
