package com.creditplus.p2p.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.CatalogDao;
import com.creditplus.p2p.dao.RoleDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.RoleVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.RoleService;

public class RoleServiceImpl implements RoleService {
	
	@Autowired 
	private RoleDao roleDao;
	
	@Autowired
	private CatalogDao catalogDao;	

	public void insertRole(RoleVO roleVO,List<Map<String,Object>> resList) {
		roleDao.insertRole(roleVO);
		if(null != resList && !resList.isEmpty()){
			int roleId = roleDao.getRoleIdByName(roleVO.getRoleName());
	    	String currentUser = CommonUtil.getCurrentUser();
			for(Map<String,Object> resourceMap : resList){
				resourceMap.put("rr_id",null);
				resourceMap.put("role_id",roleId);
				resourceMap.put("resource_id",resourceMap.get("catalog_id")); 
				resourceMap.put("last_updated_by",currentUser);        			
				String createdBy = (String)resourceMap.get("created_by");
				if(StringUtils.isBlank(createdBy)){
					resourceMap.put("created_by",currentUser);        			
				}
				
				String createdDate = (String)resourceMap.get("created_date");
				if(StringUtils.isBlank(createdDate)){
					resourceMap.put("created_date",(new Date()));   
				}				
			}
			
			roleDao.insertRoleResource(resList);
		}
	}

	public void deleteRoleById(List<Integer> roleIdList) {
		if(null == roleIdList || roleIdList.isEmpty()){
			return;
		}
		roleDao.deleteRoleById(roleIdList);
		for(int roleId : roleIdList){
			roleDao.deleteRoleResourceByRoleId(roleId);
		}
	}

	public void updateRole(RoleVO roleVO,List<Map<String,Object>> resList) {
		roleDao.updateRole(roleVO);
		if(null != resList && !resList.isEmpty()){
			int roleId = roleVO.getRoleId();
	    	String currentUser = CommonUtil.getCurrentUser();
			for(Map<String,Object> resourceMap : resList){
				resourceMap.put("rr_id",null);
				resourceMap.put("role_id",roleId);
				resourceMap.put("resource_id",resourceMap.get("catalog_id")); 
				resourceMap.put("last_updated_by",currentUser);        			
				String createdBy = (String)resourceMap.get("created_by");
				if(StringUtils.isBlank(createdBy)){
					resourceMap.put("created_by",currentUser);        			
				}
				
				String createdDate = (String)resourceMap.get("created_date");
				if(StringUtils.isBlank(createdDate)){
					resourceMap.put("created_date",(new Date()));   
				}				
			}
			
			roleDao.deleteRoleResourceByRoleId(roleId);
			roleDao.insertRoleResource(resList);
		}
	}

	public RoleVO getRoleDetail(int roleId) {
		return roleDao.getRoleDetail(roleId);
	}
	
	public List<RoleVO> getRoleList(){
		return roleDao.getRoleList();
	}
	
	public List<Map<String,Object>> getRoleResourceByRoleId(int roleId){
		List<Map<String,Object>> treeList = catalogDao.getCatalogTree();
		List<Map<String,Object>> resList = roleDao.getRoleResourceByRoleId(roleId);
		if(null != treeList && null != resList && !treeList.isEmpty() && !resList.isEmpty()){
			for(Map<String,Object> treeMap : treeList){
				int catalogId = (Integer)treeMap.get("catalog_id");
				for(Map<String,Object> resMap : resList){
					int resId  = (Integer)resMap.get("resource_id");
					if(catalogId == resId){
						treeMap.put("checked", true);
						break;
					}
				}	
			}
		}
		
		return treeList;
	}

	public PageVO getRoleListWithPage(PageVO pageVO,RoleVO roleVO) {
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		if(null == roleVO){
			roleVO = new RoleVO();
		}
		
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());		
		roleDao.getRoleListWithPage(roleVO);
		return PageUtil.getPageVO();
	}
}
