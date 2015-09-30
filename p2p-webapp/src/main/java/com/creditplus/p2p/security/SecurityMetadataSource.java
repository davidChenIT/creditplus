package com.creditplus.p2p.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import com.creditplus.p2p.dao.ResourceDao;
import com.creditplus.p2p.model.ResourceVO;

//1 加载资源与权限的对应关系
public class SecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

	private ResourceDao resourceDao;

	//由spring调用
	public SecurityMetadataSource(ResourceDao resourceDao) {
		this.resourceDao = resourceDao;
		loadResourceDefine();
	}
	
	private static Map<String, Collection<ConfigAttribute>> resourceMap = null;
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return true;
	}
	//加载所有资源与权限的关系
	private void loadResourceDefine() {
		if(resourceMap == null) {
			resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
			List<ResourceVO> resources = this.resourceDao.findAll();
			for (ResourceVO resource : resources) {
				Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
				//以权限名封装为Spring的security Object
				ConfigAttribute configAttribute = new SecurityConfig(resource.getName());
				configAttributes.add(configAttribute);
				resourceMap.put(resource.getUrl(), configAttributes);
			}
		}
		
		Set<Entry<String, Collection<ConfigAttribute>>> resourceSet = resourceMap.entrySet();
		Iterator<Entry<String, Collection<ConfigAttribute>>> iterator = resourceSet.iterator();
		
	}
	//返回所请求资源所需要的权限
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		
		String requestUrl = ((FilterInvocation) object).getRequestUrl();
		System.out.println("requestUrl is " + requestUrl);
		if(resourceMap == null) {
			loadResourceDefine();
		}
		return resourceMap.get(requestUrl);
	}

}
