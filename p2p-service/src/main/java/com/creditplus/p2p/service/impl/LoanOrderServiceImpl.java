package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import com.creditplus.p2p.common.constant.PageConstant;
import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.dao.LoanOrderDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.ApproveLogService;
import com.creditplus.p2p.service.LoanOrderService;

public class LoanOrderServiceImpl implements LoanOrderService{

	@Autowired 
	private LoanOrderDao loanAppDao;
	@Autowired
	private ApproveLogService approveLogService;

	
	public Map getCreditFirstTrialDetailByLoanId(Map paramMap) throws Exception {
		if(paramMap==null){
			paramMap=new HashMap();
		}
		paramMap.putAll(getCurrentUserMap());
		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state");
		approveLogService.insertApproveLog(paramMap, true);
		insertLoanApply(paramMap);
		return loanAppDao.getCreditFirstTrialDetailByLoanId(Integer.valueOf(paramMap.get("loan_id")+""));
	}

	
	
	public Map getCreditReviewDetailByLoanId(Map paramMap) throws Exception {
		if(paramMap==null){
			paramMap=new HashMap();
		}
		paramMap.putAll(getCurrentUserMap());
		CheckParamUtil.checkKey(paramMap, "loan_id","approve_content","apply_state");
		approveLogService.insertApproveLog(paramMap,true);
		insertLoanApply(paramMap);
		return loanAppDao.getCreditReviewDetailByLoanId(Integer.valueOf(paramMap.get("loan_id")+""));
	}
	
	
	
	
	public Map creditFirstTrial(Map paramMap) throws Exception{
		return null;
	}
	
	/**
	 * 信用复审
	 * 1.先插入复审日志
	   2.向借款申扩展表插入状态，复审人，版本
	   3.查看复审详情
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	public Map creditReview(Map paramMap) throws Exception{
		return paramMap;
	
		
	}
	
	
	
	public void insertLoanApply(Map paramMap){
		List loanAppList=loanAppDao.selectLoanApplyList(paramMap);
		int apply_state=Integer.valueOf(paramMap.get("apply_state")+"");
		if(apply_state==2){
			paramMap.put("first_assign_user", paramMap.get("last_updated_by"));
			paramMap.put("version", 1.0);
		}
		if(apply_state==3){
			paramMap.put("review_assign_user", paramMap.get("last_updated_by"));
			paramMap.put("version", 2.0);
		}
		
		if(loanAppList.size()==0){
			loanAppDao.insertLoanApply(paramMap);
		}else{
			loanAppDao.updateLoanOrder(paramMap);
		}
	}
	
	
	
	
	public PageVO getCreditFirstTrialListWithPage(Map paramMap) {
		if(paramMap==null){
			paramMap=new HashMap(getCurrentUserMap());
		}
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(PageConstant.CURRPAGE)!=null || paramMap.get(PageConstant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(PageConstant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(PageConstant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanAppDao.getCreditFirstTrialListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		System.out.println("=====>"+pageVo);
		System.out.println("=====>"+pageVo.getGriddata());
		return pageVo;
	}

	public PageVO getCreditReviewListWithPage(Map paramMap) {
		if(paramMap==null){
			paramMap=new HashMap(getCurrentUserMap());
		}
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(PageConstant.CURRPAGE)!=null || paramMap.get(PageConstant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(PageConstant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(PageConstant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		loanAppDao.getCreditReviewListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		System.out.println("=====>"+pageVo);
		System.out.println("=====>"+pageVo.getGriddata());
		return pageVo;
	}

	
	public Map getCurrentUserMap(){
		User user = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal());
		System.out.println("user=====>:"+user);
		Map userMap=new HashMap();
		userMap.put("last_updated_by", user.getUsername());
		return userMap;
	}

	public double generatorVersion(String version,int apply_state){
		return 1.0;
	}

}
