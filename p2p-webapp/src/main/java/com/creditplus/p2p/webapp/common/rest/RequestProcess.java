package com.creditplus.p2p.webapp.common.rest;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.creditplus.p2p.common.annotation.MethodDesc;
import com.creditplus.p2p.common.annotation.ParamDesc;
import com.creditplus.p2p.common.json.JSONTools;

@Path(value="/")
@Produces(MediaType.APPLICATION_JSON)
public class RequestProcess{

	@POST
	@Path("/{module}/{method}/{request_data}")
	@Produces(MediaType.APPLICATION_JSON)	
	@Consumes(MediaType.APPLICATION_XML)
	public Object execute(@PathParam("module")String module,
			@PathParam("method")String method, 
			@PathParam("request_data")String request_data,@Context HttpServletRequest request) throws Exception {
		if(StringUtils.isBlank(module)){
			throw new Exception("module is error,please check it exist!");
		}
		
		if(StringUtils.isBlank(method)){
			throw new Exception("method is error,please check it exist!");
		}
		
		ApplicationContext appContext = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
		Object service = appContext.getBean(module);
		if(null == service){
			throw new Exception("module is error,please check it exist!");
		}
		
        Method classMethod = this.getMethod(service, method);
        if(null == classMethod){
			throw new Exception("method is error,please check it exist!");        	
        }
		
        Object[] args = getArgs(classMethod,request_data);        
        Object object = classMethod.invoke(service, args);
        if((classMethod.getReturnType()) == void.class) {
        	Map<String, Boolean> rsMap = new HashMap<String, Boolean>();
        	rsMap.put("result", true);
        	return rsMap;
        }
               
		return object;
	}
	
	private Method getMethod(Object object,String methodName){
		Method[] classMethods = object.getClass().getMethods();
		for(Method classMethod : classMethods){
			if(methodName.equals(classMethod.getName()) && Modifier.isPublic(classMethod.getModifiers())){
				return classMethod;
			}
		}
		
		return null;
	}
	
	private Object[] getArgs(Method classMethod,String requestData)throws Exception{
        MethodDesc methodDesc = classMethod.getAnnotation(MethodDesc.class);
        if(null == methodDesc){
        	return null;
        }
        
        ParamDesc[] paramDescs = methodDesc.Desc();
        if(null == paramDescs || paramDescs.length <=  0){
        	return null;
        }
        
        Object[] args = new Object[paramDescs.length];
        for(int i = 0;i < paramDescs.length;i++){
        	ParamDesc paramDesc = paramDescs[i];
        	String paramName = paramDesc.paramName();
        	Class<?> paramClass = paramDesc.paramType();
        	args[i] = JSONTools.JSON2Object(requestData, paramName, paramClass);
        }
        
        return args;
	}	
}
