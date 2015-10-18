package com.creditplus.p2p.dao;

import java.util.List;

import com.creditplus.p2p.model.RoleVO;

public interface RoleDao{
	
    void insertRole(RoleVO roleVO);
	
	void deleteRoleById(int roleId);
	
	void updateRole(RoleVO roleVO);
	
	RoleVO getRoleDetail(int roleId);
	
	List<RoleVO> getRoleListWithPage(RoleVO roleVO);
	
	List<RoleVO> getRoleList();
}
