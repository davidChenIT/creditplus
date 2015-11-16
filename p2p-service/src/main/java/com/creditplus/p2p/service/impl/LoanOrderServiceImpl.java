package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
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
import com.creditplus.p2p.service.CreditScoreService;
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
	@Autowired
	CreditScoreService creditScoreService;

	
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE);
		
		//更新申请单状态并且插入日志
		updateLoanApply(paramMap);
		Map loanOrderMap= loanOrderDao.getCreditFirstTrialDetailByLoanId(Integer.valueOf(paramMap.get(Constant.LOAN_ID)+""));
		//根据身份证号算出身份证相关信息
		if(loanOrderMap!=null && loanOrderMap.size()>0){
			Map cardInfo=commonInfoService.getCardInfoById(loanOrderMap.get(Constant.ID_NUM)+"");
			if(cardInfo!=null && cardInfo.size()>0)
				loanOrderMap.putAll(cardInfo);
			filterColumnByRole(loanOrderMap);
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE);
		
		//更新申请单状态并且插入日志
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
		Map loanOrderMap = loanOrderDao.getBiaoDetailByLoanId(loan_id);
		if(loanOrderMap!=null && loanOrderMap.size()>0){
			Map cardInfo=commonInfoService.getCardInfoById(loanOrderMap.get(Constant.ID_NUM)+"");
			if(cardInfo!=null && cardInfo.size()>0)
				loanOrderMap.putAll(cardInfo);
		}
		return loanOrderMap;
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE,Constant.USER_ID);
		Integer user_id=Integer.valueOf(paramMap.get(Constant.USER_ID)+"");
		Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
		//更新客户信息
		updateCustomerInfo(paramMap, user_id);
		//防欺诈拦截
		boolean checkFlag=cheatInterceptService.intercept(user_id, loan_id);
		if(checkFlag)
			return;
		//更新紧急联系人
		List urgentList=(List) paramMap.get("urgentList");
		updateUrgentContactor(urgentList, user_id);
		//更新申请单状态并且插入日志
		updateLoanApply(paramMap);
	}
	
	
	/**
	 * 信用复审服务
	 */
	public void creditReview(Map paramMap) throws Exception{
		paramMap=CheckParamUtil.initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE,Constant.USER_ID);
		Integer user_id=Integer.valueOf(paramMap.get(Constant.USER_ID)+"");
		Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
		//增加信用维度工作可验证参数
		String company_name_v=(String) paramMap.get("company_name_v");
		String profession_img_v=(String) paramMap.get("profession_img_v");
		Integer work_verify=0;
		if(StringUtils.isNotEmpty(company_name_v))
			work_verify=1;
		paramMap.put("work_verify", work_verify);
		//保存上传的证书图片
		if(StringUtils.isNotEmpty(profession_img_v)){
			paramMap.put("type", 11);
			paramMap.put("url", profession_img_v);
			commonInfoService.savePic(paramMap);
		}
		
		
		updateCustomerInfo(paramMap, user_id);
		boolean checkFlag=cheatInterceptService.intercept(user_id, loan_id);
		if(checkFlag)
			return;
		
		List urgentList=(List) paramMap.get("urgentList");
		updateUrgentContactor(urgentList, user_id);
		//计算信用分
		Map creditMap=creditScoreService.getCreditScore(user_id, loan_id);
		paramMap.putAll(creditMap);
		//更新申请单状态并且插入日志
		updateLoanApply(paramMap);
	}
	
	
	/**
	 * 复审驳回
	 * 1.更新loan_order_t状态为初审状态2，复审人为空
	 * 2.插入驳回日志
	 * @throws Exception 
	 */
	public void creditReviewReject(Map paramMap) throws Exception {
		paramMap=CheckParamUtil.initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, Constant.LOAN_ID,Constant.APPROVE_CONTENT,Constant.APPLY_STATE);
		
		loanOrderDao.creditReviewRejectUpdate(paramMap);
		approveLogService.insertApproveLog(paramMap);
	}
	
	
	
	/**
	 * 初审复审更新状态,并且插入审核日志
	 * @param paramMap
	 */
	private void updateLoanApply(Map paramMap){
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
			approveLogService.insertApproveLog(paramMap);
		}else{
			Integer db_apply_state=Integer.valueOf(loanAppList.iterator().next().get(Constant.APPLY_STATE)+"");
			if(apply_state>db_apply_state){ 			//防止点击初审复审详情时再次更新状态  
				loanOrderDao.updateLoanOrderByLoanId(loanMap);
				approveLogService.insertApproveLog(paramMap);
			}
		}
	}
	
	//更新紧急联系人
	private void updateUrgentContactor(List<Map> insertList,int user_id){
		if(insertList!=null){
			for(Map map:insertList){
				map.putAll(CheckParamUtil.getPublicInfoMap());
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
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
		paramMap=CheckParamUtil.initParamMap(paramMap);
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(Constant.CURRPAGE)!=null || paramMap.get(Constant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(Constant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(Constant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.touBiaoListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		return pageVo;
	}


	public void joinTheBackList(Map paramMap) {
		List list=(List) paramMap.get("list");
		if(list!=null && list.size()>0)
			loanOrderDao.joinTheBackList(paramMap);
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
				CheckParamUtil.initParamMap(map);
			}
		}
		updateMuiltLoanOrderByLoanId(updateList);
		approveLogService.batchInsertApproveLog(updateList);
	}


	private void filterColumnByRole(Map dataMap){
		if(dataMap!=null && dataMap.size()>0){
			if(!CommonUtil.isSuperUser()){
				for(int i=0;i<adminKey.length;i++){
					String key=adminKey[i];
					dataMap.remove(key);
				}
			}
		}
	}
	private String []adminKey={"thnic_v","registered_place_v","address_phone","address_phone_v","current_province_v","current_city_v","current_address_v","id_num_name_v","id_num_v","mobile_place_v","company_name_v","work_tel_v","work_tel_place_v","work_name_v","work_position_v","income_v","income_name_v","seasame_score_v","tencent_credit_v","certificate_type_v","certificate_name_v","profession_grade_v","mobile_name_v","mobile_online_time_v","profession_code","degree_name_v","school_name_v","highest_degree_v","grad_school_level_v"};
}
