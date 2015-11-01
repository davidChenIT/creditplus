package com.creditplus.p2p.service.impl;

import java.util.ArrayList;
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

	public void insertDict(int parentId,List<Map<String,Object>> dataList) {		
    	String currentUser = CommonUtil.getCurrentUser();
    	if(null != dataList && !dataList.isEmpty()){
    		List<Integer>  updateList = new ArrayList<Integer>();
			for(Map<String,Object> map : dataList){
				Object dictId =map.get("dictId");
				if(null != dictId){
					updateList.add((Integer)dictId);
				}
				
				map.put("last_updated_by",currentUser);        			
				String createdBy = (String)map.get("created_by");
				if(StringUtils.isBlank(createdBy)){
					map.put("created_by",currentUser);        			
				}
				
				String createdDate = (String)map.get("created_date");
				if(StringUtils.isBlank(createdDate)){
					map.put("created_date",(new Date()));   
				}
			}
			
			if(!updateList.isEmpty()){
				dictDao.deleteDict(updateList);
			}
			
			if(null != dataList && !dataList.isEmpty()){
				dictDao.insertDict(dataList);
			}
    	}
	}
	
	public void deleteDict(List<Integer> idList){
		if(null == idList || idList.isEmpty()){
			return;
		}	
	
		dictDao.deleteDict(idList);
		deleteChildrenCascade(idList);
	}

	private void deleteChildrenCascade(List<Integer> idList){		
		List<Integer>  deleteList = getDictListByParentId(idList);
		if(!deleteList.isEmpty()){
			dictDao.deleteDict(deleteList);
			deleteChildrenCascade(deleteList);
		}
	}
	
	private List<Integer> getDictListByParentId(List<Integer> idList){
		return dictDao.getDictListByParentId(idList);
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

	public List<DictVO> getDictItems(DictVO dictVO) {
		if(null == dictVO){
			dictVO = new DictVO();
		}
		
		return dictDao.getDictItems(dictVO);
	}

}
