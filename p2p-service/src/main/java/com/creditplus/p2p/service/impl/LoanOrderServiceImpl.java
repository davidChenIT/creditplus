package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.annotation.ParamName;
import com.creditplus.p2p.common.constant.Constant;
import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.dao.CustomerInfoDao;
import com.creditplus.p2p.dao.LoanOrderDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.ApproveLogService;
import com.creditplus.p2p.service.CheatInterceptService;
import com.creditplus.p2p.service.CommonInfoService;
import com.creditplus.p2p.service.LoanOrderService;
import com.creditplus.p2p.service.UrgentContactorService;


public class LoanOrderServiceImpl implements LoanOrderService{

	@Autowired 
	private LoanOrderDao loanOrderDao;
	@Autowired
	private ApproveLogService approveLogService;
	@Autowired
	private UrgentContactorService urgentContactorService;
	@Autowired
	private CustomerInfoDao customerInfoDao;
	@Autowired
	private CommonInfoService commonInfoService;
	@Autowired
	CheatInterceptService cheatInterceptService;

	
	
	/**
	 * 初审详情查看
	 * 1.先插入初审日志
	   2.向借款申扩展表插入初审状态，初审人，版本
	   3.查看复审详情
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	public Map getCreditFirstTrialDetailByLoanId(Map paramMap) throws Exception {
		paramMap=initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE);
		
		approveLogService.insertApproveLog(paramMap, true);
		updateLoanApply(paramMap);
		Map loanOrderMap= loanOrderDao.getCreditFirstTrialDetailByLoanId(Integer.valueOf(paramMap.get(Constant.LOAN_ID)+""));
		//根据身份证号算出身份证相关信息
		if(loanOrderMap!=null && loanOrderMap.size()>0){
			Map cardInfo=commonInfoService.getCardInfoById(loanOrderMap.get(Constant.ID_NUM)+"");
			if(cardInfo!=null && cardInfo.size()>0)
				loanOrderMap.putAll(cardInfo);
		}
		return loanOrderMap;
	}

	
	/**
	 * 复审详情查看
	 * 1.先插入复审日志
	   2.向借款申扩展表更新状态，复审人，版本
	   3.查看复审详情
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	public Map getCreditReviewDetailByLoanId(Map paramMap) throws Exception {
		paramMap=initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE);
		
		approveLogService.insertApproveLog(paramMap,true);
		updateLoanApply(paramMap);
		Map loanOrderMap=loanOrderDao.getCreditReviewDetailByLoanId(Integer.valueOf(paramMap.get(Constant.LOAN_ID)+""));
		if(loanOrderMap!=null && loanOrderMap.size()>0){
			Map cardInfo=commonInfoService.getCardInfoById(loanOrderMap.get(Constant.ID_NUM)+"");
			if(cardInfo!=null && cardInfo.size()>0)
				loanOrderMap.putAll(cardInfo);
		}
		return loanOrderMap;
	}
	

	public Map getBiaoDetailByLoanId(Integer loan_id){
		return loanOrderDao.getBiaoDetailByLoanId(loan_id);
	}
	
	/**
	 * 初审服务
	 * 1.插入初审完成日志
	 * 2.向customer_info_t表插入初审人补填字段
	 * 3.更新紧急联系人列表
	 * @param paramMap 
	 * @return
	 * @throws Exception 
	 */
	public void creditFirstTrial(Map paramMap) throws Exception{
		paramMap=initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE,Constant.USER_ID);
		Integer user_id=Integer.valueOf(paramMap.get(Constant.USER_ID)+"");
		Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
		//更新客户信息
		updateCustomerInfo(paramMap, user_id);
		//防欺诈拦截
		boolean checkFlag=cheatInterceptService.intercept(user_id, loan_id);
		if(checkFlag)
			return;
		//出入初审日志
		approveLogService.insertApproveLog(paramMap,false);
		//更新紧急联系人
		List urgentList=(List) paramMap.get("urgentList");
		updateUrgentContactor(urgentList, user_id);
		//更新申请单状态
		updateLoanApply(paramMap);
	}
	
	
	/**
	 * 信用复审服务
	 */
	public void creditReview(Map paramMap) throws Exception{
		paramMap=initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE,Constant.USER_ID);
		Integer user_id=Integer.valueOf(paramMap.get(Constant.USER_ID)+"");
		Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
		updateCustomerInfo(paramMap, user_id);
		boolean checkFlag=cheatInterceptService.intercept(user_id, loan_id);
		if(checkFlag)
			return;
		
		List urgentList=(List) paramMap.get("urgentList");
		approveLogService.insertApproveLog(paramMap,false);
		updateUrgentContactor(urgentList, user_id);
		//更新状态
		updateLoanApply(paramMap);
	}
	
	
	/**
	 * 复审驳回
	 * 1.更新loan_order_t状态为初审状态2，复审人为空
	 * 2.插入驳回日志
	 * @throws Exception 
	 */
	public void creditReviewReject(Map paramMap) throws Exception {
		paramMap=initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE);
		
		loanOrderDao.creditReviewRejectUpdate(paramMap);
		approveLogService.insertApproveLog(paramMap, false);
	}
	
	
	
	/**
	 * 初审复审更新状态,并且插入审核日志
	 * @param paramMap
	 */
	public void updateLoanApply(Map paramMap){
		Map loanMap=new HashMap(paramMap);
		Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
		Integer apply_state=Integer.valueOf(loanMap.get(Constant.APPLY_STATE)+"");
		//2开始初审 3初审完毕 4开始复审 5复审完毕
		if(apply_state==2 || apply_state==3){
			loanMap.put(Constant.FIRST_ASSIGN_USER, CommonUtil.getCurrentUser());
			loanMap.put(Constant.VERSION, 1.0);
		}
		if(apply_state==4 || apply_state==5){
			loanMap.put(Constant.REVIEW_ASSIGN_USER, CommonUtil.getCurrentUser());
		}
		
		List<Map> loanAppList=(List<Map>) loanOrderDao.selectLoanApplyList(loanMap); 
//		Integer total_record=loanOrderDao.getCountByLoanId(loan_id);
		System.out.println("updateLoanApply===loanMap:"+loanMap);
		if(loanAppList.size()==0){
			loanOrderDao.insertLoanApply(loanMap);
		}else{
			Integer db_apply_state=Integer.valueOf(loanAppList.iterator().next().get(Constant.APPLY_STATE)+"");
			if(apply_state>db_apply_state){ 			//防止点击初审复审详情时再次更新状态
				loanOrderDao.updateLoanOrderByLoanId(loanMap);
			}
		}
	}
	
	//更新紧急联系人
	public void updateUrgentContactor(List<Map> insertList,int user_id){
		if(insertList!=null){
			for(Map map:insertList){
				map.putAll(getPublicInfoMap());
				map.put(Constant.USER_ID, user_id);
			}
			urgentContactorService.deleteByUserId(user_id);
			urgentContactorService.insertBatch(insertList);
		}
	}
	
	
	//更新客户信息 先删后增
	private void updateCustomerInfo(Map paramMap,int user_id){
		customerInfoDao.deleteByUserId(user_id);
		customerInfoDao.insert(paramMap);
	}
	
	
	public PageVO getCreditFirstTrialListWithPage(Map paramMap) {
		paramMap=initParamMap(paramMap);
		int currentPage=1,pageSize=10;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.getCreditFirstTrialListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}

	public PageVO getCreditReviewListWithPage(Map paramMap) {
		paramMap=initParamMap(paramMap);
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.getCreditReviewListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}

	
	
	public PageVO rankingPoolListWithPage(Map paramMap) {
		paramMap=initParamMap(paramMap);
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.rankingPoolListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}

	
	public PageVO checkInterceptListWithPage(Map paramMap){
		paramMap=initParamMap(paramMap);
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.checkInterceptListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}
	
	
	public PageVO faBiaoListWithPage(Map paramMap) {
		paramMap=initParamMap(paramMap);
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.faBiaoListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}

	
	/* 
	 * @param paramMap
	 * @return
	 */
	public PageVO touBiaoListWithPage(Map paramMap) {
		// TODO Auto-generated method stub
		return null;
	}


	public void joinTheBackList(Map paramMap) {
		List list=(List) paramMap.get("list");
		if(list!=null && list.size()>0)
			loanOrderDao.joinTheBackList(paramMap);
	}
	
	
	
	
	public Map initParamMap(Map paramMap){
		if(paramMap==null)
			paramMap=new HashMap();
		paramMap.putAll(getPublicInfoMap());
		return paramMap;
	}
	
	private Map getPublicInfoMap(){
		Map publicMap=new HashMap();
		publicMap.put("last_updated_by", CommonUtil.getCurrentUser());
		return publicMap;
	}
	
	public void updateMuiltLoanOrderByLoanId(List<Map> updateList){
		if(updateList!=null && updateList.size()>0){
			Map paramMap=new HashMap();
			paramMap.put("list", updateList);
			loanOrderDao.updateMuiltLoanOrderByLoanId(paramMap);
		}
	}

	/* 
	 * 更新申请单状态 
	 * @param loanOrderMap
	 */
	public void updateLoanOrderState(List<Map> updateList) throws Exception {
		if(updateList!=null && updateList.size()>0){
			for(Map map:updateList){
				CheckParamUtil.checkKey(map, Constant.LOAN_ID,Constant.APPLY_STATE,Constant.APPROVE_CONTENT);
				initParamMap(map);
			}
		}
		updateMuiltLoanOrderByLoanId(updateList);
		approveLogService.batchInsertApproveLog(updateList);
	}


}
