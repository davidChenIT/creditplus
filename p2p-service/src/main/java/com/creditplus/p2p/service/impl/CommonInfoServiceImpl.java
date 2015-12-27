package com.creditplus.p2p.service.impl;

import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import com.creditplus.p2p.common.util.IDCardUtil;
import com.creditplus.p2p.dao.CommonInfoDao;
import com.creditplus.p2p.service.CommonInfoService;

public class CommonInfoServiceImpl implements CommonInfoService{

	@Autowired
	CommonInfoDao commonInfoDao;

	public final Logger logger = LogManager.getLogger(CommonInfoServiceImpl.class);
	
	public Map getCardInfoById(String cardNo) {
		Map cardMap=IDCardUtil.getCardInfo(cardNo);
		logger.info("cardMap:"+cardMap);
		if("1".equals(cardMap.get("id_state")+"")){
			String id_first_6num=(String) cardMap.get("id_6");
			Map dbCardInfo=commonInfoDao.getCardInfoById(id_first_6num);
			logger.info("dbCardInfo:"+dbCardInfo);
			if(dbCardInfo!=null && dbCardInfo.size()>0)
				cardMap.putAll(dbCardInfo);
		}
		logger.info("cardMap:"+cardMap);
		return cardMap;
	}

	
	/**
	 * 电话号码格式为0738-6671678
	 */
	public Map getPhoneInfoById(String phoneNum) {
		Map phoneMap=null;
		if(StringUtils.isNotEmpty(phoneNum)){
			phoneNum=phoneNum.trim();
			/*if(phoneNum.length()==11){
				area=phoneNum.substring(3, 7);
			}else if(phoneNum.substring(0, 1).equals(0)){
				area=phoneNum.substring(0,4);
			}*/
			String[] area=phoneNum.split("-");
			phoneMap=commonInfoDao.getPhoneInfoById(area[0]);
			logger.info("phoneMap:"+phoneMap);
		}
		return phoneMap;
	}
	
	public String getPictureSrcByUserIdAndType(Map paramsMap){
		Map resultMap=commonInfoDao.getPictureSrcByUserIdAndType(paramsMap);
		logger.info("resultMap:"+resultMap);
		if(resultMap!=null){
			return (String)resultMap.get("imgPath");
		}else{
			return "";
		}
	}


	public void savePic(Map paramMap) {
		//CheckParamUtil.checkKey(paramMap, "user_id","type","url");
		commonInfoDao.deletePic(paramMap);
		commonInfoDao.savePic(paramMap);
	}


	/* 
	 * @param loan_id
	 * @return
	 */
	public Map getAntiRistByLoanId(Integer loan_id) {
		return commonInfoDao.getAntiRistByLoanId(loan_id);
	}
	

}
