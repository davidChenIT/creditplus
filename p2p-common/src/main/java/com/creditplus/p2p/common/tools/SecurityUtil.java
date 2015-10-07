package com.creditplus.p2p.common.tools;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SecurityUtil {
	
	public static String encode(String password){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.encode(password);
	}
}
