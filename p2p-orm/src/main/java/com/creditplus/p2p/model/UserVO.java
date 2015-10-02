package com.creditplus.p2p.model;

import java.util.HashSet;
import java.util.Set;

public class UserVO extends BaseVO{
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	private Integer userId;
	
	private Integer enable;
	
	private String username;
	
	private String password;	
	
	private String remark;
	
	private Set<RoleVO> roles = new HashSet<RoleVO>(0);

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getEnable() {
		return enable;
	}

	public void setEnable(Integer enable) {
		this.enable = enable;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Set<RoleVO> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleVO> roles) {
		this.roles = roles;
	}
}
