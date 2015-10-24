package com.creditplus.p2p.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import com.creditplus.p2p.dao.ResourceDao;
import com.creditplus.p2p.model.ResourceVO;

//1 加载资源与权限的对应关系
public class SecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

	private ResourceDao resourceDao;
	
	private Map<String, Collection<ConfigAttribute>> resourceMap = null;
	
	private Collection<ConfigAttribute> allConfigAttributes;

	//由spring调用
	public SecurityMetadataSource(ResourceDao resourceDao) {
		this.resourceDao = resourceDao;
		loadResourceDefine();
	}
		
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		return allConfigAttributes;
	}

	public boolean supports(Class<?> clazz) {
		return true;
	}
	
	//加载所有资源与权限的关系
	private void loadResourceDefine() {
		if(resourceMap == null) {
			allConfigAttributes = new ArrayList<ConfigAttribute>();
			resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
			List<ResourceVO> resources = this.resourceDao.findAll();
			for (ResourceVO resource : resources) {
				Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
				ConfigAttribute configAttribute = new SecurityConfig(resource.getResourceName());
				configAttributes.add(configAttribute);
				allConfigAttributes.add(configAttribute);
				resourceMap.put(resource.getUrl(),configAttributes);
			}
		}	
	}
	
	//返回所请求资源所需要的权限
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		FilterInvocation filter = (FilterInvocation) object;
		HttpServletRequest request = filter.getHttpRequest();
		String module = request.getParameter("module");
		String method = request.getParameter("method");

		String requestUrl = ((FilterInvocation) object).getRequestUrl();
		if(resourceMap == null) {
			loadResourceDefine();
		}
		
		if(null != module && null != method){
			requestUrl += "?module=" + module + "&method=" + method;
		}
		
		System.out.println("requestUrl is " + requestUrl);
		return resourceMap.get(requestUrl);
	}
}
