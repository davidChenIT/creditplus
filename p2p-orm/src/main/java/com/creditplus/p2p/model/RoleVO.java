package com.creditplus.p2p.model;

import java.util.HashSet;
import java.util.Set;

public class RoleVO implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	// Fields
	private Integer id;
	private Integer enable;
	private String name;
	private Set<RoleVO> roles = new HashSet<RoleVO>(0);
	private Set<ResourceVO> resources = new HashSet<ResourceVO>(0);
	
	/** default constructor */
	public RoleVO() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEnable() {
		return this.enable;
	}

	public void setEnable(Integer enable) {
		this.enable = enable;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<RoleVO> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleVO> roles) {
		this.roles = roles;
	}

	public Set<ResourceVO> getResources() {
		return resources;
	}

	public void setResources(Set<ResourceVO> resources) {
		this.resources = resources;
	}


}