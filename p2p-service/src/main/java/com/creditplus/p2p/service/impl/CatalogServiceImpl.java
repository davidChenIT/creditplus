/**
 * 
 */
package com.creditplus.p2p.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.CatalogDao;
import com.creditplus.p2p.model.CatalogVO;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.CatalogService;

/**
 * @author frank
 *
 */
public class CatalogServiceImpl implements CatalogService{
	
	@Autowired
	private CatalogDao catalogDao;

	public void insertCatalog(int parentId,List<Map<String,Object>> dataList) {
		CatalogVO catalogVO = new CatalogVO();
		catalogVO.setParentId(parentId);
		List<CatalogVO> paramList = new ArrayList<CatalogVO>();
		paramList.add(catalogVO);
		List<CatalogVO> rsList = this.getCatalogListByParentId(paramList);
		if(null != rsList && !rsList.isEmpty()){
			List<CatalogVO>  deleteList = new ArrayList<CatalogVO>();
			if(null != dataList && !dataList.isEmpty()){
				for(CatalogVO rCatalogVO : rsList){
					boolean deleteFlag = true;
					int catalogId = rCatalogVO.getCatalogId();
					for(Map<String,Object> map : dataList){
						Object pCatalogId = map.get("catalog_id");
						if(null != pCatalogId && catalogId == (Integer)pCatalogId){
							deleteFlag = false;
							break;
						}
					}
					
					if(deleteFlag){
						deleteList.add(rCatalogVO);
					}
				}
			}else{
				deleteList.addAll(rsList);
			}
			
			catalogDao.deleteCatalog(deleteList);
			deleteChildrenCascade(deleteList);
		}
		
    	String currentUser = CommonUtil.getCurrentUser();
    	if(null != dataList && !dataList.isEmpty()){
    		List<CatalogVO>  updateList = new ArrayList<CatalogVO>();
			for(Map<String,Object> map : dataList){
				Object catalogId =map.get("catalog_id");
				if(null != catalogId){
					CatalogVO pCatalogVO = new CatalogVO();
					pCatalogVO.setCatalogId((Integer)catalogId);
					updateList.add(pCatalogVO);
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
				catalogDao.deleteCatalog(updateList);
			}
			
			if(null != dataList && !dataList.isEmpty()){
				System.out.println("==dataList==" + dataList);
				catalogDao.insertCatalog(dataList);
			}
    	}
	}
	
	private void deleteChildrenCascade(List<CatalogVO> dataList){		
		List<CatalogVO>  deleteList = getCatalogListByParentId(dataList);
		if(!deleteList.isEmpty()){
			catalogDao.deleteCatalog(deleteList);
			deleteChildrenCascade(deleteList);
		}
	}
	
	public List<CatalogVO> getCatalogListByParentId(List<CatalogVO> dataList){
		return catalogDao.getCatalogListByParentId(dataList);
	}

	public PageVO getCatalogListWithPage(PageVO pageVO,CatalogVO catalogVO) {
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		if(null == catalogVO){
			catalogVO = new CatalogVO();
		}
		
		//初始化分页信息
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());
		catalogDao.getCatalogListWithPage(catalogVO);
		
		return PageUtil.getPageVO();
	}
}
