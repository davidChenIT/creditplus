package com.creditplus.p2p.common.util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

public class CommonUtil {
	
	public static String getCurrentUser(){
    	String currentUser = "System";
    	User user = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal());        	
    	if(null != user){
    		currentUser = user.getUsername();
    	}
    	
    	return currentUser;
	}

}
