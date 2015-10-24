package com.creditplus.p2p.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.util.Assert;

import com.creditplus.p2p.model.RoleVO;

public class RoleGrantedAuthority implements GrantedAuthority {

	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

	private final RoleVO roleVO;	
	
	public RoleGrantedAuthority(RoleVO roleVO) {
		String roleName = null == roleVO ? null:roleVO.getRoleName();
		Assert.hasText(roleName, "A granted authority textual representation is required");
		this.roleVO = roleVO;
	}
	
	public String getAuthority() {
		return roleVO.getRoleName();
	}
	
	public RoleVO getRoleVO() {
		return roleVO;
	}

	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (obj instanceof RoleGrantedAuthority) {
			return roleVO.equals(((RoleGrantedAuthority) obj).roleVO);
		}

		return false;
	}

	public int hashCode() {
		return this.roleVO.hashCode();
	}

	public String toString() {
		return null == this.roleVO ? null : this.roleVO.getRoleName();
	}
}
