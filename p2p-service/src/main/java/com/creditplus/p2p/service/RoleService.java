package com.creditplus.p2p.service;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.RoleVO;

public interface RoleService {
	
    void insertRole(RoleVO roleVO);
	
	void deleteRoleById(@ParamName("roleId") int roleId);
	
	void updateRole(RoleVO roleVO);
	
	RoleVO getRoleDetail(@ParamName("roleId") int roleId);
	
	PageVO getRoleListWithPage(PageVO pageVO,RoleVO roleVO);
}
