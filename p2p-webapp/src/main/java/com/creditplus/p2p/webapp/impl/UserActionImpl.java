package com.creditplus.p2p.webapp.impl;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.model.UserVO;
import com.creditplus.p2p.service.UserService;
import com.creditplus.p2p.webapp.UserAction;

@Path(value = "/user")
public class UserActionImpl implements UserAction {
	
	@Autowired
	private UserService userService ;

    @GET
	@Path("/getUserById/{id}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public UserVO getUserById(String id) {	
    	System.out.println("test");
    	UserVO userVO = userService.getUserById(id);
    	System.out.println("+++++");

    	return userVO;
	}

}
