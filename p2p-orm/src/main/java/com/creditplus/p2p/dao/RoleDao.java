package com.creditplus.p2p.dao;

import java.util.List;
import java.util.Map;

import com.creditplus.p2p.model.RoleVO;

public interface RoleDao{
	
    void insertRole(RoleVO roleVO);
	
	void deleteRoleById(List<Integer> roleIdList);
	
	void updateRole(RoleVO roleVO);
	
	RoleVO getRoleDetail(int roleId);
	
	int getRoleIdByName(String roleName);
	
	List<RoleVO> getRoleListWithPage(RoleVO roleVO);
	
	List<RoleVO> getRoleList();
	
	void insertRoleResource(List<Map<String,Object>> resList);
	
	void deleteRoleResourceByRoleId(int roleId);
	
	List<Map<String,Object>> getRoleResourceByRoleId(int roleId); 
}
