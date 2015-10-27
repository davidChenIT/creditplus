package com.creditplus.p2p.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.constant.Constant;
import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.RuleDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.RuleService;

public class RuleServiceImpl implements RuleService{

	@Autowired
	RuleDao ruleDao;

	/* 
	 * @param paramMap
	 * @return
	 */
	public PageVO getRulesListWithPage(Map paramMap) {
		int currentPage=1,pageSize=10;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		ruleDao.getRulesListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}

	/* 
	 * @param rule_id
	 * @return
	 */
	public List<Map> getDimensionListByRuleId(Map  dimensionMap) {
		return ruleDao.getDimensionListByRuleId(dimensionMap);
	}

	/* 
	 * @param idList
	 */
	public void deleteRule(List<Integer> idList) {
		if(idList!=null && idList.size()>0){
			ruleDao.deleteRule(idList);
			ruleDao.deleteDimensionByRuleId(idList);
		}
	}

	/* 
	 * @param idList
	 */
	public void deleteDimension(List<Integer> idList) {
		if(idList!=null && idList.size()>0)
			ruleDao.deleteDimension(idList);
	}


	/* 
	 * @param dataList
	 */
	public void insertDimension(List<Map> dataList) {
		if(dataList!=null && dataList.size()>0){
			for(Map dimenMap:dataList){
				initParamMap(dimenMap);
			}
			
			Map dataMap=new HashMap();
			dataMap.put("list", dataList);
			ruleDao.insertDimension(dataMap);
		}
	}

	/* 
	 * @param ruleMap
	 * @param dimensionList
	 */
	public void insertRule(Map ruleMap, List dimensionList) {
		if(ruleMap!=null && ruleMap.size()>0){
			initParamMap(ruleMap);
			ruleDao.insertRule(ruleMap);
		}
		insertDimension(dimensionList);
	}

	
	public Map initParamMap(Map paramMap){
		if(paramMap==null)
			paramMap=new HashMap();
		paramMap.putAll(getPublicInfoMap());
		return paramMap;
	}
	
	private Map getPublicInfoMap(){
		Map publicMap=new HashMap();
		publicMap.put("last_updated_by", CommonUtil.getCurrentUser());
		return publicMap;
	}

	/* 
	 * @param ruleMap
	 * @param dimensionList
	 * @throws Exception
	 */
	public void updateRule(Map ruleMap, List<Map> dimensionList) throws Exception {
		String currentUser=CommonUtil.getCurrentUser();
		if(dimensionList!=null && dimensionList.size()>0){
			List<Integer> updateList=new ArrayList<Integer>();
			for(Map dimenMap:dimensionList){
				Object dis_id=dimenMap.get(Constant.DIS_ID);
				if(dis_id!=null){
					updateList.add((Integer) dis_id);
				}
			}
			ruleDao.deleteDimension(updateList);
			insertDimension(dimensionList);
		}
		
		if(ruleMap!=null && ruleMap.size()>0){
			List<Integer> deleteList=new ArrayList<Integer>();
			Object rule_id=ruleMap.get(Constant.RULE_ID);
			if(rule_id!=null){
				deleteList.add((Integer) rule_id);
				initParamMap(ruleMap);
				ruleDao.deleteRule(deleteList);
				ruleDao.insertRule(ruleMap);
			}
		}
	}

	/* 
	 * @param rule_id
	 * @return
	 */
	public Map getRuleDetailById(Integer rule_id) {
		return ruleDao.getRuleDetailById(rule_id);
	}

	
}
