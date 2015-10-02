package com.creditplus.p2p.model;

import java.util.HashSet;
import java.util.Set;

public class ResourceVO extends BaseVO {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	private Integer resourceId;
	private String resourceName;	
	private String url;
	private Integer priority;
	private Integer resourceType;
	private String remark;
	private Set<RoleVO> roles = new HashSet<RoleVO>(0);
	public Integer getResourceId() {
		return resourceId;
	}
	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getPriority() {
		return priority;
	}
	public void setPriority(Integer priority) {
		this.priority = priority;
	}
	public Integer getResourceType() {
		return resourceType;
	}
	public void setResourceType(Integer resourceType) {
		this.resourceType = resourceType;
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