package com.creditplus.p2p.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.tools.SecurityUtil;
import com.creditplus.p2p.dao.UserDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.UserVO;
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
		
		userVO.setStartNum((pageVO.getCurrpage() - 1)* pageVO.getRowNum());
		userVO.setPageSize(pageVO.getRowNum());		
		int count = userDao.getUserCount(userVO);
		pageVO.setTotalrecords(count);
		
		List<UserVO> userVOList = userDao.getUserListWithPage(userVO);
		pageVO.setGriddata(userVOList);				
		return pageVO;
	}
}
