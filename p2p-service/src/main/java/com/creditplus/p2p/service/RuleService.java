package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;
import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.PageVO;

public interface RuleService {

	PageVO getRulesListWithPage(Map paramMap);
	
	Map getRuleDetailById(@ParamName("rule_id")Integer rule_id);
	
	List<Map> getDimensionListByRuleId(Map dimensionMap);
	
	void deleteRule(List<Integer> idList);
	
	void deleteDimension(List<Integer> idList);

	void insertRule(@ParamName("ruleInfo")Map ruleMap,@ParamName("dimensionList")List<Map> dimensionList);
	
	void insertDimension(List<Map> dataList);
	
	void updateRule(@ParamName("ruleInfo")Map ruleMap,@ParamName("dimensionList")List<Map> dimensionList) throws Exception;
}
