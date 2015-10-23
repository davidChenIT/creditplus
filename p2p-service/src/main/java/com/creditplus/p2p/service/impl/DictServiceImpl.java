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
		DictVO dictVO = new DictVO();
		dictVO.setParentId(parentId);
		List<DictVO> paramList = new ArrayList<DictVO>();
		paramList.add(dictVO);
		List<DictVO> rsList = this.getDictListByParentId(paramList);
		if(null != rsList && !rsList.isEmpty()){
			List<DictVO>  deleteList = new ArrayList<DictVO>();
			if(null != dataList && !dataList.isEmpty()){
				for(DictVO rDictVO : rsList){
					boolean deleteFlag = true;
					int dictId = rDictVO.getDictId();
					for(Map<String,Object> map : dataList){
						Object pDictId = map.get("dict_id");
						if(null != pDictId && dictId == (Integer)pDictId){
							deleteFlag = false;
							break;
						}
					}
					
					if(deleteFlag){
						deleteList.add(rDictVO);
					}
				}
			}else{
				deleteList.addAll(rsList);
			}
			
			dictDao.deleteDict(deleteList);
			deleteChildrenCascade(deleteList);
		}
		
    	String currentUser = CommonUtil.getCurrentUser();
    	if(null != dataList && !dataList.isEmpty()){
    		List<DictVO>  updateList = new ArrayList<DictVO>();
			for(Map<String,Object> map : dataList){
				Object dictId =map.get("dict_id");
				if(null != dictId){
					DictVO pDictVO = new DictVO();
					pDictVO.setDictId((Integer)dictId);
					updateList.add(pDictVO);
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
	
	private void deleteChildrenCascade(List<DictVO> dataList){		
		List<DictVO>  deleteList = getDictListByParentId(dataList);
		if(!deleteList.isEmpty()){
			dictDao.deleteDict(deleteList);
			deleteChildrenCascade(deleteList);
		}
	}
	
	public List<DictVO> getDictListByParentId(List<DictVO> dataList){
		return dictDao.getDictListByParentId(dataList);
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

	public List getDictItems(DictVO dictVO) {
		if(null == dictVO){
			dictVO = new DictVO();
		}
		return dictDao.getDictItems(dictVO);
	}


}
