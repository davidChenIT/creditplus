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
	private RedisService redisService;
	
	@Autowired
	private CatalogDao catalogDao;

	public void insertCatalog(int parentId,List<Map<String,Object>> dataList) {
    	String currentUser = CommonUtil.getCurrentUser();
    	if(null != dataList && !dataList.isEmpty()){
    		List<Integer>  updateList = new ArrayList<Integer>();
			for(Map<String,Object> map : dataList){
				Object catalogId =map.get("catalogId");
				if(null != catalogId){
					updateList.add((Integer)catalogId);
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
	
	public void deleteCatalog(List<Integer> idList){
		catalogDao.deleteCatalog(idList);
		deleteChildrenCascade(idList);
	}
	
	private void deleteChildrenCascade(List<Integer> idList){		
		List<Integer> deleteList = getCatalogListByParentId(idList);
		if(!deleteList.isEmpty()){
			catalogDao.deleteCatalog(deleteList);
			deleteChildrenCascade(deleteList);
		}
	}
	
	private List<Integer> getCatalogListByParentId(List<Integer> idList){
		return catalogDao.getCatalogListByParentId(idList);
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
	
	public List<Map<String,Object>> getCatalogTree(){
		String catalogCacheKey="catalog_cache";
		List<Map<String,Object>> catalogList=redisService.getListObj(catalogCacheKey);
		if(catalogList!=null && catalogList.size()>0){
			return catalogList;
		}
		//重数据库中获取菜单数据
		catalogList = catalogDao.getCatalogTree();
		//并将数据添加到redis缓存中,三十分钟后过期
		redisService.setList(catalogCacheKey, catalogList,1800);
		return catalogList;
	}	
}
