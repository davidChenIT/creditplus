package com.creditplus.p2p.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.DictDao;
import com.creditplus.p2p.model.DictVO;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.DictService;

public class DictServiceImpl implements DictService {
	
	public static final Logger logger = LogManager.getLogger(DictServiceImpl.class);

	
	@Autowired
	private DictDao dictDao;

	public void insertDict(List<Map<String,Object>> dataList) {
		if(null == dataList || dataList.isEmpty()){
			return;
		}
		
    	String currentUser = CommonUtil.getCurrentUser();
		for(Map<String,Object> map : dataList){
			map.put("last_updated_by",currentUser);        			
			String createdBy = (String)map.get("created_by");
			if(StringUtils.isBlank(createdBy)){
				map.put("created_by",currentUser);        			
			}
			
			String createdDate = (String)map.get("created_date");
			if(StringUtils.isBlank(createdDate)){
				map.put("created_date",(new Date()));   
			}	
			
			logger.info("map===" + map);
		}
		
		dictDao.insertDict(dataList);
	}

	public PageVO getDictListWithPage(PageVO pageVO,DictVO dictVO) {
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		if(null == dictVO){
			dictVO = new DictVO();
		}
		
		//初始化分页信息
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());
		dictDao.getDictListWithPage(dictVO);
		
		return PageUtil.getPageVO();
	}

}
