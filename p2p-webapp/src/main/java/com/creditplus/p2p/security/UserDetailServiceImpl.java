package com.creditplus.p2p.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.creditplus.p2p.dao.UserDao;
import com.creditplus.p2p.model.ResourceVO;
import com.creditplus.p2p.model.RoleVO;
import com.creditplus.p2p.model.UserVO;

//2
public class UserDetailServiceImpl implements UserDetailsService {
	
	public static final Logger logger = LogManager.getLogger(UserDetailServiceImpl.class);

	@Autowired
	private UserDao userDao;

	//登录验证
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		logger.info("username is " + username);
		UserVO userVO = this.userDao.findByName(username);
		if(null == userVO){
			throw new UsernameNotFoundException("user " + username + " is not exist!");
		}
		
		Collection<GrantedAuthority> grantedAuths = obtionGrantedAuthorities(userVO);
		
		boolean enables = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		//封装成spring security的user
		User userdetail = new User(userVO.getUsername(), userVO.getPassword(), enables, accountNonExpired, credentialsNonExpired, accountNonLocked, grantedAuths);
		return userdetail;
	}
	
	//取得用户的权限
	private Set<GrantedAuthority> obtionGrantedAuthorities(UserVO userVO) {
		Set<GrantedAuthority> authSet = new HashSet<GrantedAuthority>();
		List<ResourceVO> resources = new ArrayList<ResourceVO>();
		Set<RoleVO> roles = userVO.getRoles();
		
		for(RoleVO role : roles) {
			logger.info("rolename==" + role.getRoleName());
			Set<ResourceVO> tempRes = role.getResources();
			for(ResourceVO res : tempRes) {
				resources.add(res);
			}
		}
		
		for(ResourceVO res : resources) {
			logger.info("resourcename==" + res.getResourceName());
			authSet.add(new SimpleGrantedAuthority(res.getResourceName()));
		}
		return authSet;
	}
}
