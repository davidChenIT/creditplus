package com.creditplus.p2p.test;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.creditplus.p2p.model.UserInfoVO;

public class TestConnection {

	public static void main(String[] args) {
//		ApplicationContext ct =new ClassPathXmlApplicationContext("applicationContext-dao.xml");  
//		System.out.println(ct);
//		SqlSessionFactory sessionFactory = (SqlSessionFactory)ct.getBean("sqlSessionFactory"); 
//		SqlSession session=sessionFactory.openSession();
//		System.out.println(session);
//		session.getMapper(type)
		
		Method method=BeanUtils.findMethod(UserInfoVO.class, "getAge",null);
		try {
			UserInfoVO vo=new UserInfoVO();
			vo.setAge(12);
			Object obj=method.invoke(vo, null);
			System.out.println(obj);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
