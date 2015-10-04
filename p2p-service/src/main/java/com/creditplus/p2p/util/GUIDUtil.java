package com.creditplus.p2p.util;

import java.util.UUID;

import org.springframework.util.StringUtils;

public class GUIDUtil {

	public static String getGuid(){
		String guid=UUID.randomUUID().toString();
		if(!StringUtils.isEmpty(guid))
			guid=guid.replaceAll("-", "");
		return guid; 
	}
	
	public static void main(String[] args) {
		System.out.println(getGuid());
	}
}
