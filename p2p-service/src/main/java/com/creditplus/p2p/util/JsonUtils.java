package com.creditplus.p2p.util;

import com.creditplus.p2p.model.UserInfoVO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

	public static void main(String[] args) throws JsonProcessingException {
		ObjectMapper objMapper=new ObjectMapper();
		String info=objMapper.writeValueAsString(new UserInfoVO());
		System.out.println(info);
	}
}
