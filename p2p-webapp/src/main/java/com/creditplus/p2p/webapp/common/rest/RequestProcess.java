package com.creditplus.p2p.webapp.common.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.creditplus.p2p.util.PropertiesRead;
import com.creditplus.p2p.ws.ServiceInterface;

@Path(value="/")
@Produces(MediaType.APPLICATION_JSON)
public class RequestProcess{

	@POST
	@Path("/{module}/{method}/{request_data}")
	@Produces(MediaType.APPLICATION_JSON)	
	@Consumes(MediaType.APPLICATION_XML)
	public Object execute(@PathParam("module")String module, @PathParam("method")String method, @PathParam("request_data")String request_data) throws Exception {
		String className=PropertiesRead.getValueByKey(module);
		ServiceInterface serviceinterface;
		try {
			serviceinterface = (ServiceInterface) Class.forName(className).newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		serviceinterface.execute(module, method, request_data);
		return null;
	}
	

	
}
