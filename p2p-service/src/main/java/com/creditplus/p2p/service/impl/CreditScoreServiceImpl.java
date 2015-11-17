/**
 * Administrator
 * 2015年11月5日
 */
package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.constant.Constant;
import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.CommonInfoDao;
import com.creditplus.p2p.dao.CreditScoreDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
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

	
	public Map getCreditScore(Integer user_id, Integer loan_id) {
		return getCreditScoreMap(user_id,loan_id);
	}
	
	
	private Map getCreditScoreMap(Integer user_id,Integer loan_id){
		List<Map> creditScores=creditScoreDao.getCreditScoreList(new HashMap());
		Map<String,Integer> score1=new HashMap<String,Integer>();
		Map<String,Integer> score2=new HashMap<String,Integer>();
		Integer total1=0,total2=0;     //信用总分，模型1，明星2
		if(creditScores!=null && creditScores.size()>0){
			
			for(Map creditMap:creditScores){
				String fact_table=(String) creditMap.get("fact_table");
				String fact_column=(String) creditMap.get("fact_column");
				Integer model_name= (Integer) creditMap.get("model_name");
				String dimension_name=(String) creditMap.get("dimension_name");
				String proportion=(String) creditMap.get("proportion");
				Integer baifenbi=Integer.valueOf(proportion.substring(0, proportion.indexOf("%")).trim());
				Integer score_id=(Integer) creditMap.get("score_id");
				List<Map> itemsList=creditScoreDao.getCreditItemById(score_id);
				if(itemsList!=null && itemsList.size()>0){
					
					//查询评分维度字段值
					StringBuilder sbSql=new StringBuilder("select t.").append(fact_column).append(" from ").append(fact_table).append(" t left join loan_list l on t.user_id=l.user_id where l.user_id=#{user_id} and l.loan_id=#{loan_id}");
					Map sqlMap=new HashMap();
					sqlMap.put("user_id", user_id);
					sqlMap.put("loan_id", loan_id);
					sqlMap.put("sql", sbSql.toString());
					List<Map> result=commonInfoDao.executeDonamicSQL(sqlMap);
					System.out.println("=====result:"+result);
					Object value=null;
					if(result!=null && result.size()>0){
						Map resultMap=result.get(0);
						if(resultMap!=null && resultMap.size()>0)
							value=result.iterator().next().get(fact_column);
					}
					Map valueMap=new HashMap();
					valueMap.put(fact_column, value);
					
					Integer dimesion_score=0;
					for(Map itemMap:itemsList){
						String arithmetic=(String) itemMap.get("arithmetic");
						String dimension_value=(String) itemMap.get("dimension_value");
						Integer score=Integer.valueOf(itemMap.get("score")+"");
						StringBuilder expression=new StringBuilder(fact_column);
						if("like".equalsIgnoreCase(arithmetic.trim())){
							expression.append(".indexOf('").append(dimension_value).append("')");
						}else{
							if(CommonUtil.isNumber(dimension_value))
								expression.append(arithmetic).append(dimension_value);
							else
								expression.append(arithmetic).append("'").append(dimension_value).append("'");
						}
						
						//执行维度评分逻辑表达式
						boolean flag=CommonUtil.exeExpression(expression.toString(), valueMap);
						if(flag){
							dimesion_score=score*baifenbi/100;
							System.out.println("score:"+score);
						}
						
						if(model_name==1){
							score1.put(dimension_name, dimesion_score);
							total1+=dimesion_score;
						}else if(model_name==2){
							score2.put(dimension_name, dimesion_score);
							total2+=dimesion_score;
						}
						if(flag)
							break;
					}
				}
			}
			
		}
		
		score1.put("credit_total_score", total1);
		score2.put("credit_total_score", total2);
		Map scoreMap=new HashMap();
		scoreMap.put("score1", score1);
		scoreMap.put("score2", score2);
		scoreMap.put("credit_score1", total1);
		scoreMap.put("credit_score2", total2);
		scoreMap.put("credit_score_total", (total1+total2));
		return scoreMap;
	}
	
	
	private Integer getItemResultSet(Map credit_item,Integer user_id){
		String main_table=(String) credit_item.get("main_table");
		String child_table=(String) credit_item.get("child_table");
		String relevance_colum=(String) credit_item.get("relevance_colum");
		String expression=(String) credit_item.get("expression");
		Integer score=Integer.valueOf(credit_item.get("score")+"");
		StringBuilder sbSql=new StringBuilder();
		if(StringUtils.isNotEmpty(child_table) && StringUtils.isNotEmpty(relevance_colum)){
			sbSql.append("select z.*,c.* from ").append(main_table).append(" z left join ").append(child_table).append(" c on z.").append(relevance_colum).append(" = c.").append(relevance_colum);
		}else{
			sbSql.append("select * from ").append(main_table);
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
	
	

	public PageVO getCreditScoreListWithPage(Map paramMap) {
		int currentPage=1,pageSize=10;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		creditScoreDao.getCreditScoreList(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}

	/* 
	 * @param idList
	 */
	public void deleteCreditScore(List<Integer> idList) {
		if(idList!=null && idList.size()>0){
			creditScoreDao.deleteCreditScore(idList);
			for(int i=0;i<idList.size();i++){
				creditScoreDao.deleteCreditItemBySid(idList.get(i));
			}
		}
	}

	/* 
	 * @param score_id
	 * @return
	 */
	public List<Map> getCreditItemById(Integer score_id) {
		return creditScoreDao.getCreditItemById(score_id);
	}

	/* 
	 * @param idList
	 */
	public void deleteCreditItem(List<Integer> idList) {
		if(idList!=null && idList.size()>0)
			creditScoreDao.deleteCreditItem(idList);
	}

	/* 
	 * @param dataMap
	 */
	public void insertCreditScore(Map creditMap,List itemsList) {
		if(creditMap!=null && creditMap.size()>0){
			CheckParamUtil.initParamMap(creditMap);
			creditScoreDao.insertCreditScore(creditMap);
			
			if(itemsList!=null && itemsList.size()>0){
				Integer score_id=creditScoreDao.findByName(creditMap.get("dimension_name")+"");
				saveCreditItems(score_id, itemsList);
			}
		}
		
	}

	
	private void saveCreditItems(Integer score_id,List<Map> dataList){
		creditScoreDao.deleteCreditItemBySid(score_id);
		if(dataList!=null && dataList.size()>0){
			String currentUser=CommonUtil.getCurrentUser();
			for(Map dataMap:dataList){
				dataMap.put("last_updated_by",currentUser);
				dataMap.put("score_id", score_id);
			}
			Map creditItemMap=new HashMap();
			creditItemMap.put("list", dataList);
			creditScoreDao.insertCreditItems(creditItemMap);
		}
	}
	
	

	/* 
	 * @param dataMap
	 */
	public void updateCreditScore(Map dataMap,List<Map> itemsList) throws Exception {
		if(dataMap!=null && dataMap.size()>0){
			CheckParamUtil.checkKey(dataMap, "score_id");
			Integer score_id=Integer.valueOf(dataMap.get("score_id")+"");
			CheckParamUtil.initParamMap(dataMap);
			creditScoreDao.updateCreditScore(dataMap);
			if(itemsList!=null && itemsList.size()>0){
				this.saveCreditItems(score_id, itemsList);
			}
		}
	}

	/* 
	 * @param score_id
	 * @return
	 */
	public Map getCreditScoreById(Integer score_id) {
		return creditScoreDao.getCreditScoreById(score_id);
	}
	
	public static void main(String[] args) {
		Integer i=40;
		String proportion="12%";
		Integer baifenbi=Integer.valueOf(proportion.substring(0, proportion.indexOf("%")).trim());
		System.out.println(i*baifenbi/100);
	}
	

}
