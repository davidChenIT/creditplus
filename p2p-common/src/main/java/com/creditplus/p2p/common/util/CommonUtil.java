package com.creditplus.p2p.common.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.commons.lang3.StringUtils;
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
	
	
	public static boolean exeExpression(String jsExpression,Map<String,Object> paramMap) {
		boolean flag=false;
		if(StringUtils.isEmpty(jsExpression))
			return false;
		ScriptEngineManager factory = new ScriptEngineManager();
		ScriptEngine engine=factory.getEngineByName("js");
		Map variableMap=parseExpressionVariable(jsExpression, paramMap);
		if(variableMap!=null && variableMap.size()>0){
			jsExpression=jsExpression.replaceAll("#(.+?)#", "$1");
			for(Iterator<String> iterator=variableMap.keySet().iterator();iterator.hasNext();){
				String key=iterator.next();
				Object value=variableMap.get(key);
				engine.put(key, value);
			}
			try {
				Object result = engine.eval(jsExpression);
				if(result instanceof Boolean)
					flag=(Boolean) result;
			} catch (ScriptException e) {
				System.out.println(e);
			}
		}
		return flag;
	}
	
	private static Map parseExpressionVariable(String jsExpression,Map paramMap){
		if(paramMap==null)
			paramMap=new HashMap();
		Map variableMap=new HashMap();
		Pattern p=Pattern.compile("(#.+?#)");
		Matcher m=p.matcher(jsExpression);
		while(m.find()){
			String group=m.group();
			String key=group.replaceAll("#(.+?)#", "$1");
			Object value=paramMap.get(key);
			variableMap.put(key, value);
		}
		System.out.println(variableMap);
		return variableMap;
	}
	
	public static void main(String[] args) throws ScriptException {
		 String js="(#a#>#c# && #a#<2000) && #b#=='中国'";
		 Map variable=new HashMap();
		 variable.put("a", "1001.5");
		 variable.put("b", "中国");
		 variable.put("c", 1000);
		 System.out.println(exeExpression(js, variable));
		 
	}

}
