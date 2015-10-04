package com.creditplus.p2p.webapp.common.rest;

import java.lang.reflect.Method;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.creditplus.p2p.annotation.MethodParamType;
import com.creditplus.p2p.util.JsonUtils;

@Path(value="/")
@Produces(MediaType.APPLICATION_JSON)
public class RequestProcess{

	@GET
	@Path("/{module}/{method}/{request_data}") 
	@Produces(MediaType.APPLICATION_JSON)	
	@Consumes(MediaType.APPLICATION_XML)
	public Object execute(@PathParam("module")String module, @PathParam("method")String method, @PathParam("request_data")String request_data,@Context HttpServletRequest servletRequest) throws Exception  {
		Object result=null;
		Map requestMap=JsonUtils.json2Map(request_data);
		System.out.println("======servletContext"+servletRequest.getServletContext());
		ApplicationContext context=WebApplicationContextUtils.getRequiredWebApplicationContext(servletRequest.getServletContext());
		System.out.println("======contJson"+JsonUtils.object2Json(context));
		Object targetObj=context.getBean(module);
		
		if(targetObj==null)
			throw new Exception(new StringBuilder("request module='").append(module).append("' is not exist!").toString());
		//找到带有MethodParamType注解的方法
		Method methods[]=targetObj.getClass().getDeclaredMethods();
		Method m=null;
		for(Method methodObj:methods){
			if(methodObj.getName().equals(method) && methodObj.getAnnotation(MethodParamType.class)!=null){
				m=methodObj;
				break;
			}
			
		}
		
		if(m==null)
			throw new Exception(new StringBuilder("request method='").append(method).append("' is not exist!").toString());
		MethodParamType methodParamType=m.getAnnotation(MethodParamType.class);
		String []paramKey=methodParamType.paramKey();
		Class  []paramType=methodParamType.paramType();
		Object []objValue=new Object[paramKey.length];
		for(int z=0;z<paramKey.length;z++){
			Class clz=Object.class;
			if(z<paramType.length){
				clz=paramType[z];
			}
			objValue[z]=JsonUtils.json2Object(JsonUtils.object2Json(requestMap.get(paramKey[z])), clz);
		}
		result=m.invoke(targetObj, objValue);
		return result;
	}
	
	/*@SuppressWarnings("rawtypes")
	public static void main(String[] args) throws Exception {
		String module="",method = "updateUser";
		String userJson="{\"userVo\":{\"username\":\"23242\"}}";
		Map requestMap=JsonUtils.json2Map(userJson);
		Object targetObj=new UserServiceImpl();
		
		if(targetObj==null)
			throw new Exception(new StringBuilder("request module='").append(module).append("' is not exist!").toString());
		Method methods[]=targetObj.getClass().getDeclaredMethods();
		Method m=null;
		for(Method methodObj:methods){
			System.out.println("==="+methodObj.getName());
			if(methodObj.getName().equals(method) && methodObj.getAnnotation(MethodParamType.class)!=null){
				m=methodObj;
				break;
			}
			
		}
		if(m==null)
			throw new Exception(new StringBuilder("request method='").append(method).append("' is not exist!").toString());
		MethodParamType methodParamType=m.getAnnotation(MethodParamType.class);
		String []paramKey=methodParamType.paramKey();
		Class  []paramType=methodParamType.paramType();
		Object []objValue=new Object[paramKey.length];
		for(int z=0;z<paramKey.length;z++){
			Class clz=Object.class;
			if(z<paramType.length){
				clz=paramType[z];
			}
			objValue[z]=JsonUtils.json2Object(JsonUtils.object2Json(requestMap.get(paramKey[z])), clz);
		}
		Object result = m.invoke(targetObj, objValue);
	}*/
	
	

	
}
