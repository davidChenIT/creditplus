package com.creditplus.p2p.webapp.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.model.ResourceVO;
import com.creditplus.p2p.model.RoleVO;
import com.creditplus.p2p.security.RoleGrantedAuthority;
import com.creditplus.p2p.service.CatalogService;
import com.creditplus.p2p.webapp.CommonAction;


public class CommonActionImpl implements CommonAction {
	
	public static final Logger logger = LogManager.getLogger(CommonActionImpl.class);
	
	@Autowired
	private CatalogService catalogService;

	
	public List<Map<String, Object>> getCatalogLeftTree() throws Exception {
		List<Map<String, Object>> rsList = new ArrayList<Map<String, Object>> ();
		List<Map<String, Object>> catalogList = catalogService.getCatalogLeftTree();
		if(CommonUtil.isSuperUser()){
			rsList = catalogList;
			return rsList;
		}
		
    	User user = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    	if(null == user){
    		return rsList;
    	}
    	
    	Collection<GrantedAuthority> authorities = user.getAuthorities();
    	if(null == authorities || authorities.isEmpty()){
    		return rsList;
    	}
    	
    	Set<ResourceVO> resourceSet = new HashSet<ResourceVO>(); 
    	Iterator<GrantedAuthority> iter = authorities.iterator();
    	while(iter.hasNext()){
    		RoleGrantedAuthority authority = (RoleGrantedAuthority)iter.next();
    		if(null != authority){
    			RoleVO roleVO = authority.getRoleVO();
    			resourceSet.addAll(roleVO.getResources());
    		}
    	}
    	
    	if(!resourceSet.isEmpty() && null != catalogList && !catalogList.isEmpty()){
    		for(Map<String,Object> catalogMap : catalogList){
    			int catalogId = (Integer) catalogMap.get("catalog_id");
	        	Iterator<ResourceVO> resIter = resourceSet.iterator();
	        	while(resIter.hasNext()){
	        		ResourceVO resourceVO = resIter.next();
	        		if(catalogId == resourceVO.getResourceId()){
	        			rsList.add(catalogMap);
	        		}
	        	}
    		}
    	}
    	
		return rsList;
	}
}
