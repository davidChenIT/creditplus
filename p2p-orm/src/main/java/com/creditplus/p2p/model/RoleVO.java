package com.creditplus.p2p.model;

import java.util.HashSet;
import java.util.Set;

public class RoleVO extends BaseVO{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	// Fields
	private Integer roleId;
	private Integer enable;
	private String  roleName;
	private Set<ResourceVO> resources = new HashSet<ResourceVO>(0);
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public Integer getEnable() {
		return enable;
	}
	public void setEnable(Integer enable) {
		this.enable = enable;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public Set<ResourceVO> getResources() {
		return resources;
	}
	public void setResources(Set<ResourceVO> resources) {
		this.resources = resources;
	}
}