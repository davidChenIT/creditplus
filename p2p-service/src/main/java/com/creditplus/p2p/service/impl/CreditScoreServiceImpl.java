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

	
	public Map creditScore(Integer user_id, Integer loan_id) {
		return getCreditScore(user_id);
	}
	
/*	private Map getCreditScore(Integer user_id){ 
		List<Map> creditScores=creditScoreDao.getCreditScoreList(new HashMap());
		Map<String,Integer> score1=new HashMap<String,Integer>();
		Map<String,Integer> score2=new HashMap<String,Integer>();
		if(creditScores!=null && creditScores.size()>0){
			Integer total1=0,total2=0;
			for(Map creditMap:creditScores){
				Integer score_id=(Integer) creditMap.get("score_id");
				Integer model_name=(Integer) creditMap.get("model_name");
				String dimension_name=(String) creditMap.get("dimension_name");
				List<Map> itemList=creditScoreDao.getCreditItemById(score_id);
				if(itemList!=null && itemList.size()>0){
					for(Map itemMap:itemList){
						Integer score=getItemResultSet(itemMap, user_id);
						if(model_name==1){
							score1.put(dimension_name, score);
							total1+=score;
						}
						if(model_name==2){
							score2.put(dimension_name, score);
							total2+=score;
						}
						if(score>0){
							break;
						}
					}
				}
			}
			score1.put("total", total1);
			score2.put("total", total2);
			
		}
		
		Map scoreMap=new HashMap();
		scoreMap.put("score1", score1);
		scoreMap.put("score2", score2);
		return scoreMap;
	}*/
	
	private Map getCreditScore(Integer user_id){
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
				Integer score_id=(Integer) creditMap.get("score_id");
				List<Map> itemsList=creditScoreDao.getCreditItemById(score_id);
				if(itemsList!=null && itemsList.size()>0){
					
					//查询得到需要评分字段的值
					StringBuilder sbSql=new StringBuilder("select ").append(fact_column).append(" from ").append(fact_table).append(" where user_id=#{user_id}");
					Map sqlMap=new HashMap();
					sqlMap.put("user_id", user_id);
					sqlMap.put("sql", sbSql.toString());
					List<Map> result=commonInfoDao.executeDonamicSQL(sqlMap);
					System.out.println("=====result:"+result);
					Object value=null;
					if(result!=null && result.size()>0)
						value=result.iterator().next().get(fact_column);
					Map valueMap=new HashMap();
					valueMap.put(fact_column, value);
					
					for(Map itemMap:itemsList){
						String arithmetic=(String) itemMap.get("arithmetic");
						String dimension_value=(String) itemMap.get("dimension_value");
						Integer score=Integer.valueOf(itemMap.get("score")+"");
						StringBuilder expression=new StringBuilder(fact_column).append(arithmetic).append("'").append(dimension_value).append("'");
						boolean flag=CommonUtil.exeExpression(expression.toString(), valueMap);
						if(flag){
							if(model_name==1){
								score1.put(dimension_name, score);
								total1+=score;
							}else if(model_name==2){
								score2.put(dimension_name, score);
								total2+=score;
							}
							break;
						}
					}
				}
			}
			
		}
		
		Map scoreMap=new HashMap();
		scoreMap.put("score1", score1);
		scoreMap.put("score2", score2);
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
	
	public static void main(String[] args) {
		Map map=new HashMap();
		map.put("main_table", "user_info");
		map.put("child_table", "approve_log_t");
		map.put("relevance_colum", "user_id");
		map.put("expression", "#city#='深圳'");
		new CreditScoreServiceImpl().getItemResultSet(map, 13);
	}

	/* 
	 * @return
	 */
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


}
