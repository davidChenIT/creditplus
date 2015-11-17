package com.creditplus.p2p.common.util;

import java.math.BigDecimal;
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

import com.creditplus.p2p.common.json.JSONTools;

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
		if(!StringUtils.isEmpty(jsExpression)){
			ScriptEngineManager factory = new ScriptEngineManager();
			ScriptEngine engine=factory.getEngineByName("js");
			if(paramMap!=null && paramMap.size()>0){
				for(Iterator<String> iterator=paramMap.keySet().iterator();iterator.hasNext();){
					String key=iterator.next();
					Object value=paramMap.get(key);
					engine.put(key, value);
				}
			}
			try {
				System.out.println("exeute expression: "+jsExpression+"  paramMap:"+JSONTools.Object2Json(paramMap));
				Object result=engine.eval(jsExpression);
				if(result instanceof Boolean)				//js逻辑运算
					flag=(Boolean) result;
				if(result instanceof Integer)				//js indexOf函数
					flag=((Integer)result!=-1)?true:false;
			} catch (ScriptException e) {
				System.out.println("exeExpression error:"+e);
			} catch (Exception e) {
				System.out.println(e);
			}
			System.out.println("exeute result: "+flag);
		}
		return flag;
	}
	
	
	public static boolean isNumber(String value){
		if(StringUtils.isEmpty(value))
			return false;
		 Pattern p=Pattern.compile("\\d+(\\.\\d+)?");
		 Matcher m=p.matcher(value);
		 return m.matches();
	}
	
	public static String formatDouble(double num){
		 java.text.DecimalFormat myformat=new java.text.DecimalFormat("0.0");
		 return myformat.format(num);
	}
	
	public static void main(String[] args) throws ScriptException {
		 String jsex="certificate_type_v>0.5";
		 ScriptEngineManager factory = new ScriptEngineManager();
		 ScriptEngine engine=factory.getEngineByName("js");
		 engine.put("certificate_type_v", 0.0);
		 Object result=engine.eval(jsex);
		 System.out.println(result);
		 Map paramMap=new HashMap();
		 paramMap.put("certificate_type_v", 0.0);
		 exeExpression(jsex, paramMap); 
		 
		 BigDecimal b=new BigDecimal(7.5);
		 System.out.println(b.doubleValue());
		 System.out.println(b.intValue());
		 double c=(7.5);
		 java.text.DecimalFormat myformat=new java.text.DecimalFormat("0.0");
		 String str = myformat.format(c); 
		 System.out.println(str);
	}

}
