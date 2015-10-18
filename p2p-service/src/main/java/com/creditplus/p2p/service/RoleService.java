package com.creditplus.p2p.service;

import java.util.List;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.RoleVO;

public interface RoleService {
	
    void insertRole(RoleVO roleVO);
	
	void deleteRoleById(@ParamName("roleId") int roleId);
	
	void updateRole(RoleVO roleVO);
	
	RoleVO getRoleDetail(@ParamName("roleId") int roleId);
	
	List<RoleVO> getRoleList();
	
	PageVO getRoleListWithPage(PageVO pageVO,RoleVO roleVO);
}
