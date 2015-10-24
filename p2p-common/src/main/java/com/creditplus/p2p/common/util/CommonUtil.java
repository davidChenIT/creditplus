package com.creditplus.p2p.common.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

public class CommonUtil {
	
	private static final String ADMINISTRATOR="admin";
	
	public static String getCurrentUser(){
    	String currentUser = "System";
    	User user = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal());        	
    	if(null != user){
    		currentUser = user.getUsername();
    	}
    	
    	return currentUser;
	}
	
	public static boolean isSuperUser(){
    	User user = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()); 
    	if(null == user){
    		return false;
    	}
    	
    	Collection<GrantedAuthority> authorities = user.getAuthorities();
    	if(null == authorities || authorities.isEmpty()){
    		return false;
    	}
    	
    	Iterator<GrantedAuthority> iter = authorities.iterator();
    	while(iter.hasNext()){
    		GrantedAuthority authority = iter.next();
    		if(null != authority && ADMINISTRATOR.equals(authority.getAuthority())){
    			return true;
    		}
    	}
    	
    	return false;
	}
	
	public static List<String> getCurrentUserRoleList(){
		List<String> currentUserRoleList = new ArrayList<String>();
    	User user = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()); 
    	if(null == user){
    		return currentUserRoleList;
    	}
    	
    	Collection<GrantedAuthority> authorities = user.getAuthorities();
    	if(null == authorities || authorities.isEmpty()){
    		return currentUserRoleList;
    	}
    	
    	Iterator<GrantedAuthority> iter = authorities.iterator();
    	while(iter.hasNext()){
    		GrantedAuthority authority = iter.next();
    		if(null != authority){
    			currentUserRoleList.add(authority.getAuthority());
    		}
    	}
    	
    	return currentUserRoleList;
		
	}

}
