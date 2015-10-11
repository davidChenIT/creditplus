package com.creditplus.p2p.service;

import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.RoleVO;

public interface RoleService {
	
    void insertRole(RoleVO roleVO);
	
	void deleteRoleById(int roleId);
	
	void updateRole(RoleVO roleVO);
	
	RoleVO getRoleDetail(int roleId);
	
	PageVO getRoleListWithPage(PageVO pageVO,RoleVO roleVO);
}
