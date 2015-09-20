package com.creditplus.p2p.webapp;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.creditplus.p2p.model.UserVO;

@Path(value = "/user")
public interface UserAction {

	@GET
	@Path("/getUserById/{id}")
	public UserVO getUserById(@PathParam("id") String id);

}
