package com.creditplus.p2p.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.dao.RoleDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.RoleVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.RoleService;

public class RoleServiceImpl implements RoleService {
	
	@Autowired 
	private RoleDao roleDao;	

	public void insertRole(RoleVO roleVO) {
		roleDao.insertRole(roleVO);
	}

	public void deleteRoleById(int roleId) {
		roleDao.deleteRoleById(roleId);
	}

	public void updateRole(RoleVO roleVO) {
		roleDao.updateRole(roleVO);
	}

	public RoleVO getRoleDetail(int roleId) {
		return roleDao.getRoleDetail(roleId);
	}
	
	public List<RoleVO> getRoleList(){
		return roleDao.getRoleList();
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
