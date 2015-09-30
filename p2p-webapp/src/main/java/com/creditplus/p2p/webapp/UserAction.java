package com.creditplus.p2p.webapp;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.creditplus.p2p.model.UserVO;

@Path(value = "/user")
public interface UserAction {

	@GET
	@Path("/getUserById/{id}")
	@Produces({ MediaType.APPLICATION_JSON})	
	public UserVO getUserById(@PathParam("id") String id);

}
