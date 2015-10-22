package com.creditplus.p2p.service;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.RoleVO;

public interface RoleService {
	
    void insertRole(RoleVO roleVO,@ParamName("resList")List<Map<String,Object>> resList);
	
	void deleteRoleById(List<Integer> roleIdList);
	
	void updateRole(RoleVO roleVO,@ParamName("resList")List<Map<String,Object>> resList);
	
	RoleVO getRoleDetail(@ParamName("roleId") int roleId);
	
	List<RoleVO> getRoleList();
	
	PageVO getRoleListWithPage(PageVO pageVO,RoleVO roleVO);
	
	List<Map<String,Object>> getRoleResourceByRoleId(@ParamName("roleId") int roleId); 
}
