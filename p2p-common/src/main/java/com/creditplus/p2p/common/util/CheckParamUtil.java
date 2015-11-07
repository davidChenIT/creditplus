package com.creditplus.p2p.common.util;

import java.util.HashMap;
import java.util.Map;

public class CheckParamUtil {

	public static void checkKey(Map<String,Object> paramMap,String...key) throws Exception{
		if(paramMap!=null && key!=null)
			for(int i=0;i<key.length;i++){
				Object value=paramMap.get(key[i]);
				if(value==null)
					throw new Exception(new StringBuilder("'").append(key[i]).append("' Can't be empty!").toString());
			}
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
