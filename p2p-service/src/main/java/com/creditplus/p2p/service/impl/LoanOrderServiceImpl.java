package com.creditplus.p2p.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import com.creditplus.p2p.common.constant.Constant;
import com.creditplus.p2p.common.util.CheckParamUtil;
import com.creditplus.p2p.common.util.CommonUtil;
import com.creditplus.p2p.common.util.IDCardUtil;
import com.creditplus.p2p.dao.CustomerInfoDao;
import com.creditplus.p2p.dao.LoanOrderDao;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.ApproveLogService;
import com.creditplus.p2p.service.CheatInterceptService;
import com.creditplus.p2p.service.CommonInfoService;
import com.creditplus.p2p.service.ContractService;
import com.creditplus.p2p.service.CreditScoreService;
import com.creditplus.p2p.service.LoanOrderService;
import com.creditplus.p2p.service.OriginPlaceService;
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
	@Autowired
	OriginPlaceService originPlaceService;
	@Autowired
	ContractService contractService;

	
	public final Logger logger = LogManager.getLogger(LoanOrderServiceImpl.class);
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
			//工作电话号码归属地映射
			Map work_tel_address=getWorkAddress(loanOrderMap);
			if(work_tel_address!=null && work_tel_address.size()>0)
				loanOrderMap.putAll(work_tel_address);
//			filterColumnByRole(loanOrderMap);
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
	
	
	private Map getCityCode(Map loanOrderMap){
		Map codeMap=new HashMap();
		String registered_place_v=(String) loanOrderMap.get("registered_place_v");
		String registered_place_city_v=(String) loanOrderMap.get("registered_place_city_v");
		Map registeredMap=getCityCode(registered_place_v, registered_place_city_v, "registered_province_code", "registered_city_code");
		if(registeredMap!=null && registeredMap.size()>0)
			codeMap.putAll(registeredMap);
		
		String work_tel_place_v=(String) loanOrderMap.get("work_tel_place_v");
		String work_tel_place_city_v=(String) loanOrderMap.get("work_tel_place_city_v");
		Map workMap=getCityCode(work_tel_place_v, work_tel_place_city_v, "work_tel_province_code", "work_tel_city_code");
		if(workMap!=null && workMap.size()>0)
			codeMap.putAll(workMap);
		
		String id_province=(String) loanOrderMap.get("id_province");
		String id_city=(String) loanOrderMap.get("id_city");
		Map idMap=getCityCode(id_province, id_city, "id_province_code", "id_city_code");
		if(idMap!=null && idMap.size()>0)
			codeMap.putAll(idMap);
		return codeMap;
			
	}
	
	private Map getCityCode(String province,String city,String province_code,String city_code){
		Map codeMap=new HashMap();
		Map registeredMap=new HashMap();
		registeredMap.put("province", province);
		registeredMap.put("city", city);
		Integer code=originPlaceService.getCityCode(registeredMap);
		if(code!=null){
			codeMap.put("province_code", code);
			codeMap.put("city_code", code);
		}
		return codeMap;
	}

	
	private Map getWorkAddress(Map loanOrderMap){
		Map phone=new HashMap();
		String work_tel_place_v=(String) loanOrderMap.get("work_tel_place_v");
		String work_tel_place_city_v=(String) loanOrderMap.get("work_tel_place_city_v");
		if(StringUtils.isEmpty(work_tel_place_v)){
			String work_tel=(String) loanOrderMap.get("work_tel");
			Map phoneInfo=commonInfoService.getPhoneInfoById(work_tel);
			if(phoneInfo!=null && phoneInfo.size()>0){
				phone.put("work_tel_place_v", phoneInfo.get("mobile_province"));
				phone.put("work_tel_place_city_v", phoneInfo.get("mobile_city"));
			}
		}
		return phone;
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
		creditFirstParamCheck(paramMap);
		Integer user_id=Integer.valueOf(paramMap.get(Constant.USER_ID)+"");
		Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
		
		//获取城市编码
		Map codeMap=getCityCode(paramMap);
		if(codeMap!=null && codeMap.size()>0){
			logger.info("====codeMap:"+codeMap);
			paramMap.putAll(codeMap);
		}
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
		creditReviewParamCheck(paramMap);
		Integer user_id=Integer.valueOf(paramMap.get(Constant.USER_ID)+"");
		Integer loan_id=Integer.valueOf(paramMap.get(Constant.LOAN_ID)+"");
		//增加信用维度工作可验证参数
		String company_name_v=(String) paramMap.get("company_name_v");
		String profession_img_v=(String) paramMap.get("profession_img_v");
		//手机在线时长，除365得到手机年龄
		String mobile_online_time_v=(String) paramMap.get("mobile_online_time_v");  
		Integer work_verify=0;
		if(StringUtils.isNotEmpty(company_name_v))
			work_verify=1;
		paramMap.put("work_verify", work_verify);
		if(CheckParamUtil.isNumber(mobile_online_time_v)){
			String mobile_age=CommonUtil.formatDouble(Double.valueOf(mobile_online_time_v)/365);
			paramMap.put("mobile_age", mobile_age);
		}
		//保存上传的证书图片
//		if(StringUtils.isNotEmpty(profession_img_v)){
//			paramMap.put("type", 11);
//			paramMap.put("url", profession_img_v);
//			commonInfoService.savePic(paramMap);
//		}
		
		//获取城市编码
		Map codeMap=getCityCode(paramMap);
		if(codeMap!=null && codeMap.size()>0)
			paramMap.putAll(codeMap);
		
		//更新客户表信息
		updateCustomerInfo(paramMap, user_id);
		//防欺诈拦截
		boolean checkFlag=cheatInterceptService.intercept(user_id, loan_id);
		if(checkFlag)
			return;
		
		//更新紧急联系人信息
		List urgentList=(List) paramMap.get("urgentList");
		updateUrgentContactor(urgentList, user_id);
		//计算信用分
		Map creditMap=creditScoreService.getCreditScore(user_id, loan_id);
		paramMap.putAll(creditMap);
		//更新申请单状态并且插入日志并更新信用评分
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
		logger.info("updateLoanApply===loanMap:"+loanMap);
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
		initRownum(pageVo);
		return pageVo;
	}
	
	
	private void initRownum(PageVO pageVo){
		List<Map> gridData=pageVo.getGriddata();
		int rowNum=pageVo.getRowNum();
		int currpage=pageVo.getCurrpage();
		int startIndex=(currpage-1)*rowNum;
		logger.info("startIndex: "+startIndex+" currpage: "+currpage+" rowNum: "+rowNum);
		if(gridData!=null && gridData.size()>0){
			for(Map dataMap:gridData){
				dataMap.put("top", ++startIndex);
			}
		}
		pageVo.setGriddata(gridData);
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
	
	
	/**
	 * 初审基本参数校验
	 * @param paramMap
	 * @throws Exception
		void
	 */
	private void creditFirstParamCheck(Map paramMap) throws Exception{
		String[] key={"seasame_score_v","tencent_credit_v"};
		String[] message={"芝麻信用分数","腾讯信用分数"};
		CheckParamUtil.checkParamIsNumr(paramMap, key,message);
		String id_num_v=(String) paramMap.get("id_num_v");
		if(!IDCardUtil.isIDCard(id_num_v))
			throw new Exception("身份证验证号码不合法!");
			
	}
	
	private void creditReviewParamCheck(Map paramMap) throws Exception{
		String[] key={"seasame_score_v","tencent_credit_v","certificate_type_v","mobile_online_time_v"};
		String[] message={"芝麻信用分数","腾讯信用分数","证书类型","手机在网时长"};
		CheckParamUtil.checkParamIsNumr(paramMap, key,message);
		String id_num_v=(String) paramMap.get("id_num_v");
		if(!IDCardUtil.isIDCard(id_num_v))
			throw new Exception("身份证验证号码不合法!");
			
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


	/**
	 * 投标服务
	 */
	public void createTenderService(List<Map> updateList) throws Exception {
		if(updateList!=null && updateList.size()>0){
			for(Map map:updateList){
				CheckParamUtil.checkKey(map, Constant.LOAN_ID,Constant.APPLY_STATE,Constant.APPROVE_CONTENT);
				CheckParamUtil.initParamMap(map);
			}
			
			//写入合同表
			contractService.insert(updateList.get(0));
			
			//更新申请单状态并且写入操作日志
			updateMuiltLoanOrderByLoanId(updateList);
			approveLogService.batchInsertApproveLog(updateList); 
		}
	}
}
