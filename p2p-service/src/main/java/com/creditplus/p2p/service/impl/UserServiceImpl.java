package com.creditplus.p2p.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.tools.SecurityUtil;
import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.UserDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.model.UserVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.UserService;

public class UserServiceImpl implements UserService {

	@Autowired 
	private UserDao userDao;
		
	public void addUser(UserVO userVO,List<Map<String,Object>> userRoleList) throws Exception {
		String password = userVO.getPassword();
		password = SecurityUtil.encode(password);
		userVO.setPassword(password);
		userDao.insertUser(userVO);
		UserVO userDetailVO = userDao.findByName(userVO.getUsername());
		if(null != userRoleList && !userRoleList.isEmpty()){
			this.saveUserRole(userDetailVO.getUserId(), userRoleList);
		}
	}
	
	public void deleteUserById(List<Integer> userIdList) {
		if(null == userIdList || userIdList.isEmpty()){
			return;
		}
		
		userDao.deleteUserById(userIdList);
		for(int userId : userIdList){
			userDao.deleteUserRoleByUserId(userId);
		}
	}

	public void updateUser(UserVO userVO,List<Map<String,Object>> userRoleList) throws Exception{
		UserVO userDetailVO = userDao.getUserById(userVO.getUserId());
		if(null == userDetailVO){
			throw new Exception("用户已被删除！");
		}
		
		String password = userVO.getPassword();
		if(null == password){
			throw new Exception("用户密码不能为空！");
		}
		
		if(!password.equals(userDetailVO.getPassword())){
			password = SecurityUtil.encode(password);
			userVO.setPassword(password);			
		}
		
		userDao.updateUser(userVO);
		this.saveUserRole(userVO.getUserId(),userRoleList);
	}
	
	private void saveUserRole(int userId,List<Map<String,Object>> userRoleList){		
		userDao.deleteUserRoleByUserId(userId);

		if(null != userRoleList && !userRoleList.isEmpty()){
	    	String currentUser = CommonUtil.getCurrentUser();
			for(Map<String,Object> map : userRoleList){
				map.put("userId",userId);        			
				map.put("last_updated_by",currentUser);        			
				String createdBy = (String)map.get("created_by");
				if(StringUtils.isBlank(createdBy)){
					map.put("created_by",currentUser);        			
				}
				
				String createdDate = (String)map.get("created_date");
				if(StringUtils.isBlank(createdDate)){
					map.put("created_date",(new Date()));   
				}
			}
			
			userDao.insertUserRole(userRoleList);
		}
	}
	
	public void changePassword(UserVO userVO)throws Exception{
		String currentUsername = userVO.getLast_updated_by();
		UserVO currentUserVO = userDao.findByName(currentUsername);
		String oldPassword = userVO.getOldPassword();
		if(null == currentUserVO || null == oldPassword 
				|| !SecurityUtil.checkPassword(oldPassword,currentUserVO.getPassword())){
			throw new Exception("旧密码输入错误！");
		}
		
		String password = userVO.getPassword();
		password = SecurityUtil.encode(password);
		
		userVO.setUserId(currentUserVO.getUserId());
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
	
	public List<Map<String,Object>> getUserRoleListByUserID(int userId){
		return userDao.getUserRoleListByUserID(userId);
	}
}
