/**
 * 
 */
package com.creditplus.p2p.common.json;

import java.io.IOException;

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
		ObjectMapper mapper = new ObjectMapper();
		try {
			final JsonNode node = mapper.readTree(json);
			return mapper.readValue(node.get(key).traverse(), clazz);
		} catch (JsonParseException e) {
			throw new Exception(e);
		} catch (JsonMappingException e) {
			throw new Exception(e);
		} catch (IOException e) {
			throw new Exception(e);
		}
	}
}
