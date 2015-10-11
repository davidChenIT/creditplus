package com.creditplus.p2p.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.tools.SecurityUtil;
import com.creditplus.p2p.dao.UserDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.UserVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.UserService;

public class UserServiceImpl implements UserService {

	@Autowired 
	private UserDao userDao;
		
	public void addUser(UserVO userVO) {
		String password = userVO.getPassword();
		password = SecurityUtil.encode(password);
		userVO.setPassword(password);
		userDao.insertUser(userVO);
	}
	
	public void deleteUserById(int userId) {
		userDao.deleteUserById(userId);
	}

	public void updateUser(UserVO userVO) {
		String password = userVO.getPassword();
		password = SecurityUtil.encode(password);
		userVO.setPassword(password);		
		userDao.updateUser(userVO);
	}
	
	public void changePassword(UserVO userVO) {
		String password = userVO.getPassword();
		password = SecurityUtil.encode(password);
		userVO.setPassword(password);		
		userDao.changePassword(userVO);
	}	
	
	public UserVO getUserById(int userId) {
		return userDao.getUserById(userId);
	}
	
	public PageVO getUserListWithPage(PageVO pageVO,UserVO userVO){
		if(null == pageVO){
			pageVO = new PageVO();
		}
		
		if(null == userVO){
			userVO = new UserVO();
		}
		
		//初始化分页信息
		PageUtil.initPageInfo(pageVO.getCurrpage(), pageVO.getRowNum());
		userDao.getUserListWithPage(userVO);
		return PageUtil.getPageVO();
	}
}
