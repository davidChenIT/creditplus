package com.creditplus.p2p.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.constant.Constant;
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
	public List<Map> getDimensionListByRuleId(Integer rule_id) {
		return ruleDao.getDimensionListByRuleId(rule_id);
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
	public void insertRule(List<Map<String, Object>> dataList) {
		if(dataList!=null && dataList.size()>0)
			ruleDao.insertRule(dataList);
	}

	/* 
	 * @param dataList
	 */
	public void insertDimension(List<Map<String, Object>> dataList) {
		if(dataList!=null && dataList.size()>0)
			ruleDao.insertDimension(dataList);
	}

	
	
}
