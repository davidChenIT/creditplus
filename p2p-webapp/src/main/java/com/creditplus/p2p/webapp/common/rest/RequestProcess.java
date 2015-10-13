package com.creditplus.p2p.webapp.common.rest;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.common.json.JSONTools;
import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.model.BaseVO;

@Path(value="/process")
@Produces(MediaType.APPLICATION_JSON)
public class RequestProcess{
	
	public static final Logger logger = LogManager.getLogger(RequestProcess.class);

	
	public final static String PACKAGE_NAME = "com.creditplus.p2p";
	
	@Context
	private HttpServletRequest request;

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Object execute(@FormParam("module")String module,
			@FormParam("method")String method, 
			@FormParam("request_data")String request_data) throws Exception {
		logger.info("module==" + module);
		logger.info("method==" + method);
		logger.info("request_data==" + request_data);
		
		if(StringUtils.isBlank(module)){
			throw new Exception("module is error,please check it exist!");
		}
		
		if(StringUtils.isBlank(method)){
			throw new Exception("method is error,please check it exist!");
		}
				
		ApplicationContext appContext = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
		String beans[]=appContext.getBeanDefinitionNames();
		for(int i=0;i<beans.length;i++)
			System.out.println("beanName:"+beans[i]);
		Object service = appContext.getBean(module);
		if(null == service){
			throw new Exception("module is error,please check it exist!");
		}
		
        Method classMethod = this.getMethod(service, method);
        if(null == classMethod){
			throw new Exception("method is error,please check it exist!");        	
        }
		
        Object[] args = getArgs(classMethod,request_data);     
        logger.info("method parameter:"+JSONTools.Object2Json(args));
        Object object = classMethod.invoke(service, args);
        if((classMethod.getReturnType()) == void.class) {
        	Map<String, Boolean> rsMap = new HashMap<String, Boolean>();
        	rsMap.put("result", true);
        	return rsMap;
        }
               
		return object;
	}
	
	private Method getMethod(Object object,String methodName){
		Class<?> clazz = object.getClass();
		if(!clazz.getName().startsWith(PACKAGE_NAME)){		
			Class<?>[] classInterfaces = clazz.getInterfaces();
			for(Class<?> classInterface :classInterfaces){
				if(classInterface.getName().startsWith(PACKAGE_NAME)){
					clazz = classInterface;
					break;
				}
			}
		}

		Method[] classMethods = clazz.getMethods();
		for(Method classMethod : classMethods){
			if(methodName.equals(classMethod.getName())){
				return classMethod;
			}
		}
		
		return null;
	}
	
	private static Object[] getArgs(Method classMethod,String requestData)throws Exception{	
		Annotation[][] annotations = classMethod.getParameterAnnotations();
        if(null == annotations || annotations.length == 0){
        	return null;
        }
   
        List<Object> argsList = new ArrayList<Object>();
        Class<?>[] clazz = classMethod.getParameterTypes();        
        for(int i = 0; i < annotations.length;i++){
        	Annotation[] paramAnnotations = annotations[i];
        	if(paramAnnotations.length == 0){
    			Object obj = JSONTools.JSON2Object(requestData,clazz[i]);
        		argsList.add(obj);
        	}else{
        		for(int j = 0;j < paramAnnotations.length;j++){
        			ParamName  paramName = (ParamName)annotations[i][j];
        			Object obj = JSONTools.JSON2Object(requestData, paramName.value(),clazz[i]);
        			argsList.add(obj);
        		}
        	}
        }
        
        Object[] args = argsList.toArray();
        if( null != args && args.length > 0){
        	String currentUser = CommonUtil.getCurrentUser();
        	for(Object arg : args){
        		if(arg instanceof BaseVO){
        			BaseVO baseVO = (BaseVO)arg;
        			baseVO.setLast_updated_by(currentUser);        			
        			String createdBy = baseVO.getCreated_by();
        			if(StringUtils.isBlank(createdBy)){
        				baseVO.setCreated_by(currentUser);
        			}
        			
        			Date createdDate = baseVO.getCreated_date();
        			if(null == createdDate){
        				baseVO.setCreated_date(new Date());
        			}
        		}        		
        	}
        }
        
        return args;
	}	
	
	public static void main(String[] args) {
		try {
			Object obj = JSONTools.JSON2Object("",BaseVO.class);
			System.out.println("===" + obj);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
   

		
	}
}
