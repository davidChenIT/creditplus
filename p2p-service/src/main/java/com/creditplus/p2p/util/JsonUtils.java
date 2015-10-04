package com.creditplus.p2p.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import com.creditplus.p2p.model.UserVO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

	private static ObjectMapper objMapper=null;
	public static void main(String[] args) throws Exception {
		ObjectMapper objMapper=new ObjectMapper();
		objMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		 
		String json="{\"userVO\":{\"username\":\"23242\"}}";
		String userJson="{\"username\":\"23242\"}";
		Map map=new HashMap();
		map.put("id", 1231231);
		map.put("created_date", new java.util.Date());
		
		Map jsonMap=json2Map(json);
		System.out.println(jsonMap.get("userVO").getClass());
		System.out.println(objMapper.readValue(objMapper.writeValueAsString(jsonMap.get("userVO")), UserVO.class).getUsername());
		System.out.println(json);
	}
	
	public static Map json2Map(String json) throws Exception{
		Map map=null;
		try {
			map= objMapper.readValue(json, Map.class);
		} catch (IOException e) {
			throw new Exception(e);
		}
		return map;
	}
	
	public static String object2Json(Object obj) throws JsonProcessingException{
		return objMapper.writeValueAsString(obj);
	}
	
	public static Object json2Object(String json,Class clz) throws Exception{
		Object obj=null;
		try {
			obj= objMapper.readValue(json, clz);
		} catch (IOException e) {
			throw new Exception(e);
		}
		return obj;
	}
	
	static{
		objMapper=new ObjectMapper();
		objMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
	}
	
}
