/**
 * 
 */
package com.creditplus.p2p.common.json;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author frank
 *
 */
public class JSONTools {
	
	public static Object JSON2Object(String json ,String key,Class<?> clazz) throws Exception{
		if(StringUtils.isBlank(json)){
			return null;
		}
		
		ObjectMapper mapper = new ObjectMapper();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		mapper.setDateFormat(dateFormat);
		
		try {
			final JsonNode node = mapper.readTree(json);
			JsonNode jsonNode = node.get(key);
			if(null != jsonNode){			
				return mapper.readValue(node.get(key).traverse(), clazz);
			}else{
				return null;
			}
		} catch (JsonParseException e) {
			throw new Exception(e);
		} catch (JsonMappingException e) {
			throw new Exception(e);
		} catch (IOException e) {
			throw new Exception(e);
		}
	}
	
	public static Object JSON2Object(String json ,Class<?> clazz) throws Exception{
		if(StringUtils.isBlank(json)){
			return null;
		}
		
		ObjectMapper mapper = new ObjectMapper();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		mapper.setDateFormat(dateFormat);
		try {
			return mapper.readValue(json, clazz);
		} catch (JsonParseException e) {
			throw new Exception(e);
		} catch (JsonMappingException e) {
			throw new Exception(e);
		} catch (IOException e) {
			throw new Exception(e);
		}
	}	
}
