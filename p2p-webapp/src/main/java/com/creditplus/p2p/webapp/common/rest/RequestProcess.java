package com.creditplus.p2p.webapp.common.rest;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.creditplus.p2p.annotation.MethodParamType;
import com.creditplus.p2p.service.impl.UserServiceImpl;

@Path(value="/")
@Produces(MediaType.APPLICATION_JSON)
public class RequestProcess{

	@POST
	@Path("/{module}/{method}/{request_data}")
	@Produces(MediaType.APPLICATION_JSON)	
	@Consumes(MediaType.APPLICATION_XML)
	public Object execute(@PathParam("module")String module, @PathParam("method")String method, @PathParam("request_data")String request_data) throws Exception  {
		Object result=null;
		ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext-webapp.xml");
		Object targetObj=context.getBean(module);
		if(targetObj==null)
			throw new Exception(new StringBuilder("request module='").append(module).append("' is not exist!").toString());
		Method methods[]=targetObj.getClass().getDeclaredMethods();
		Method m=null;
		for(int i=0;i<methods.length;i++){
			Method methodObj=methods[i];
			if(methodObj.getName().equals(method) && methodObj.getAnnotation(MethodParamType.class)!=null){
				m=methodObj;
				break;
			}
			
		}
		if(m==null)
			throw new Exception(new StringBuilder("request module='").append(module).append("' is not exist!").toString());
		MethodParamType mp=m.getAnnotation(MethodParamType.class);
		String []paramKey=mp.paramType();
		Object []objValue=new Object[paramKey.length];
		for(int z=0;z<paramKey.length;z++){
			Map map = null;
			objValue[z]=map.get(paramKey[z]);
		}
		m.invoke(targetObj, objValue);
		return result;
	}
	
	public static void main(String[] args) throws Exception {
		String module="",method = "deleteUserById";
		Map map=new HashMap();
		map.put("id", "12312");
//		ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext-webapp");
//		Object targetObj=context.getBean(module);
		Object targetObj=new UserServiceImpl();
		Method methods[]=targetObj.getClass().getDeclaredMethods();
		System.out.println(methods.length);
		for(int i=0;i<methods.length;i++){
			Method m=methods[i];
			if(m.getName().equals(method) && m.getAnnotation(MethodParamType.class)!=null){
				MethodParamType mp=m.getAnnotation(MethodParamType.class);
				String []paramKey=mp.paramType();
				Object []objValue=new Object[paramKey.length];
				for(int z=0;z<paramKey.length;z++){
					objValue[z]=map.get(paramKey[z]);
				}
				m.invoke(targetObj, objValue);
			}
			
		}
	}
	
	

	
}
