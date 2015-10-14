package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import com.creditplus.p2p.common.constant.PageConstant;
import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.dao.CustomerInfoDao;
import com.creditplus.p2p.dao.LoanOrderDao;
import com.creditplus.p2p.dao.UrgentContactorDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.ApproveLogService;
import com.creditplus.p2p.service.LoanOrderService;


public class LoanOrderServiceImpl implements LoanOrderService{

	@Autowired 
	private LoanOrderDao loanOrderDao;
	@Autowired
	private ApproveLogService approveLogService;
	@Autowired
	private UrgentContactorDao urgentContactorDao;
	@Autowired
	private CustomerInfoDao customerInfoDao;

	
	
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
		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state");
		
		approveLogService.insertApproveLog(paramMap, true);
		updateLoanApply(paramMap);
		return loanOrderDao.getCreditFirstTrialDetailByLoanId(Integer.valueOf(paramMap.get("loan_id")+""));
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
		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state");
		
		approveLogService.insertApproveLog(paramMap,true);
		updateLoanApply(paramMap);
		return loanOrderDao.getCreditReviewDetailByLoanId(Integer.valueOf(paramMap.get("loan_id")+""));
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
		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state","user_id");
		
		Integer user_id=Integer.valueOf(paramMap.get("user_id")+"");
		List urgentList=(List) paramMap.get("urgentList");
		approveLogService.insertApproveLog(paramMap,false);
		updateCustomerInfo(paramMap, user_id);
		updateUrgentContactor(urgentList, user_id);
		//更新状态
		updateLoanApply(paramMap);
	}
	
	
	public void creditReview(Map paramMap) throws Exception{
		paramMap=initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state","user_id");
		
		Integer user_id=Integer.valueOf(paramMap.get("user_id")+"");
		List urgentList=(List) paramMap.get("urgentList");
		approveLogService.insertApproveLog(paramMap,false);
		updateCustomerInfo(paramMap, user_id);
		updateUrgentContactor(urgentList, user_id);
		//更新状态
		updateLoanApply(paramMap);
	}
	
	
	/**
	 * 复审驳回
	 * 1.更新loan_order_t状态为初审，复审人为空
	 * 2.插入驳回日志
	 * @throws Exception 
	 */
	public void creditReviewReject(Map paramMap) throws Exception {
		paramMap=initParamMap(paramMap);
		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state");
		loanOrderDao.creditReviewRejectUpdate(paramMap);
		approveLogService.insertApproveLog(paramMap, false);
	}
	
	
	
	/**
	 * 初审复审更新借款申请扩展表
	 * 借款申请扩展表loan_apply_t插入
	 * @param paramMap
	 */
	public void updateLoanApply(Map paramMap){
		Map loanMap=new HashMap(paramMap);
		List loanAppList=loanOrderDao.selectLoanApplyList(loanMap);
		int apply_state=Integer.valueOf(loanMap.get("apply_state")+"");
		//2开始初审 3初审完毕 4开始复审 5复审完毕
		if(apply_state==2 || apply_state==3){
			loanMap.put("first_assign_user", getCurrentUser());
			loanMap.put("version", 1.0);
		}
		if(apply_state==4 || apply_state==5){
			loanMap.put("review_assign_user", getCurrentUser());
			loanMap.put("version", 2.0);
		}
		
		System.out.println("updateLoanApply===loanMap:"+loanMap);
		if(loanAppList.size()==0){
			loanOrderDao.insertLoanApply(loanMap);
		}else{
			if(apply_state!=2 && apply_state!=4){ //这两个状态只做插入动作
				loanOrderDao.updateLoanOrderByLoanId(loanMap);
			}
		}
	}
	
	//更新紧急联系人
	public void updateUrgentContactor(List<Map> insertList,int user_id){
		System.out.println("updateUrgentContactor===insertList:"+insertList);
		if(insertList!=null){
			for(Map map:insertList){
				map.putAll(getPublicInfoMap());
				map.put("user_id", user_id);
			}
			urgentContactorDao.deleteByUserId(user_id);
			Map urgentMap=new HashMap();
			urgentMap.put("list",insertList);
			urgentContactorDao.insertBatch(urgentMap);
		}
	}
	
	
	//更新客户信息
	public void updateCustomerInfo(Map paramMap,int user_id){
		customerInfoDao.deleteByUserId(user_id);
		customerInfoDao.insert(paramMap);
	}
	
	
	public PageVO getCreditFirstTrialListWithPage(Map paramMap) {
		paramMap=initParamMap(paramMap);
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(PageConstant.CURRPAGE)!=null || paramMap.get(PageConstant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(PageConstant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(PageConstant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.getCreditFirstTrialListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		System.out.println("=====>"+pageVo);
		System.out.println("=====>"+pageVo.getGriddata());
		return pageVo;
	}

	public PageVO getCreditReviewListWithPage(Map paramMap) {
		paramMap=initParamMap(paramMap);
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(PageConstant.CURRPAGE)!=null || paramMap.get(PageConstant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(PageConstant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(PageConstant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanOrderDao.getCreditReviewListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		System.out.println("=====>"+pageVo);
		System.out.println("=====>"+pageVo.getGriddata());
		return pageVo;
	}

	
	public Map initParamMap(Map paramMap){
		if(paramMap==null)
			paramMap=new HashMap();
		paramMap.putAll(getPublicInfoMap());
		return paramMap;
	}
	
	private Map getPublicInfoMap(){
		Map publicMap=new HashMap();
		publicMap.put("last_updated_by", getCurrentUser());
		return publicMap;
	}
	
	private String getCurrentUser(){
		User user = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal());
		return user.getUsername();
	}

	public double generatorVersion(String version,int apply_state){
		return 1.0;
	}


}
