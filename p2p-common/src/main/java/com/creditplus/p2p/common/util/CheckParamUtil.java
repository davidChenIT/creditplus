package com.creditplus.p2p.common.util;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

public class CheckParamUtil {

	public static void checkKey(Map<String,Object> paramMap,String...key) throws Exception{
		if(paramMap!=null && key!=null)
			for(int i=0;i<key.length;i++){
				Object value=paramMap.get(key[i]);
				if(value==null)
					throw new Exception(new StringBuilder("'").append(key[i]).append("' Can't be empty!").toString());
			}
	}
	
	
	public static void checkParamIsNumr(Map paramMap,String []key,String []message) throws Exception{
		if(paramMap!=null && key!=null && key.length>0 && message!=null && message.length==key.length){
			for(int i=0;i<key.length;i++){
				String value=paramMap.get(key[i])+"";
				if(!isNumber(value)){
					throw new Exception(new StringBuilder("'").append(message[i]).append("' is not a valid number!").toString());
				}
			}
		}
	}
	
	
	public static boolean isNumber(String value){
		if(StringUtils.isEmpty(value))
			return false;
		 Pattern p=Pattern.compile("\\d+(\\.\\d+)?");
		 Matcher m=p.matcher(value);
		 return m.matches();
	}	
	
	public static Map initParamMap(Map paramMap){
		if(paramMap==null)
			paramMap=new HashMap();
		paramMap.putAll(getPublicInfoMap());
		return paramMap;
	}
	
	public static Map getPublicInfoMap(){
		Map publicMap=new HashMap();
		publicMap.put("last_updated_by", CommonUtil.getCurrentUser());
		return publicMap;
	}
}
