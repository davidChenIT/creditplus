package com.creditplus.p2p.util;

import java.beans.PropertyEditorManager;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.util.StringUtils;

public class PropertiesRead {

	private static Map<String,String> proMap=new HashMap<String, String>();
	
	public static String getValueByKey(String key){
		String value=proMap.get(key);
		if(StringUtils.isEmpty(value)){
			Properties p=new Properties();
			try {
				p.load(ClassLoader.getSystemResourceAsStream("classRolute.properties"));
				value=p.getProperty(key);
				if(!StringUtils.isEmpty(value))
					proMap.put(key, value);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return value;
	}
	
	public static void main(String[] args) {
		Properties p=new Properties();
		try {
			p.load(ClassLoader.getSystemResourceAsStream("classRolute.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(p.get("userService"));
	}
}
