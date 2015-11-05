/**
 * Administrator
 * 2015年11月5日
 */
package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.CommonInfoDao;
import com.creditplus.p2p.dao.CreditScoreDao;
import com.creditplus.p2p.service.CreditScoreService;

/**
 * @author Administrator
 *
 */
public class CreditScoreServiceImpl implements CreditScoreService{

	@Autowired
	CreditScoreDao creditScoreDao;
	@Autowired
	CommonInfoDao commonInfoDao;
	/* 
	 * @param user_id
	 * @param loan_id
	 * @return
	 */
	public Map creditScore(Integer user_id, Integer loan_id) {
		return getCreditScore(user_id);
	}
	
	private Map getCreditScore(Integer user_id){
		List<Map> creditScores=creditScoreDao.getCreditScoreList();
		Map scoreMap=new HashMap();
		if(creditScores!=null && creditScores.size()>0){
			for(Map cs:creditScores){
				Integer score_id=(Integer) cs.get("score_id");
				String model_name=(String) cs.get("model_name");
				List<Map> itemList=creditScoreDao.getCreditItemById(score_id);
				if(itemList!=null && itemList.size()>0){
					for(Map itemMap:itemList){
						Integer score=getItemResultSet(itemMap, user_id);
						if(score>0){
							scoreMap.put(model_name, score);
							break;
						}
					}
				}
			}
		}
		return scoreMap;
	}
	
	private Integer getItemResultSet(Map credit_item,Integer user_id){
		String main_table=(String) credit_item.get("main_table");
		String child_table=(String) credit_item.get("child_table");
		String relevance_colum=(String) credit_item.get("relevance_colum");
		String expression=(String) credit_item.get("expression");
		Integer score=Integer.valueOf(credit_item.get("score")+"");
		StringBuilder sbSql=new StringBuilder("select * from ").append(main_table).append(" t ");
		if(StringUtils.isNotEmpty(child_table) && StringUtils.isNotEmpty(relevance_colum)){
			sbSql.append("left join ").append(child_table).append(" c on t.").append(relevance_colum).append(" = c.").append(relevance_colum);
		}
		sbSql.append(" where user_id = ").append("#{user_id}");
		
		Map sqlMap=new HashMap();
		sqlMap.put("user_id", user_id);
		sqlMap.put("sql", sbSql.toString());
		System.out.println("creditScoreSql:"+sbSql.toString());
		List<Map> result=commonInfoDao.executeDonamicSQL(sqlMap);
		System.out.println("=====result:"+result);
		if(result!=null && result.size()>0){
			for(int i=0;i<result.size();i++){
				Map paramMap=result.get(i);
				boolean flag=CommonUtil.exeExpression(expression, paramMap);
				if(flag)
					return score;
			}
		}
		
		return 0;
	}
	
	public static void main(String[] args) {
		Map map=new HashMap();
		map.put("main_table", "user_info");
		map.put("child_table", "approve_log_t");
		map.put("relevance_colum", "user_id");
		map.put("expression", "#city#='深圳'");
		new CreditScoreServiceImpl().getItemResultSet(map, 13);
	}

}
