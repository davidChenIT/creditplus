package com.creditplus.p2p.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import com.creditplus.p2p.common.constant.PageConstant;
import com.creditplus.p2p.dao.LoanOrderDao;
import com.creditplus.p2p.model.LoanOrderVO;
import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;
import com.creditplus.p2p.service.LoanOrderService;

public class LoanOrderServiceImpl implements LoanOrderService{

	@Autowired 
	private LoanOrderDao loanAppDao;

	/**
	 * 信用初审
	 * @param paramMa
	 * @return
	 */
	public LoanOrderVO creditFirstTrial(Integer loan_id){
		return loanAppDao.getLoanOrderByLoanId(loan_id);
	}
	
	/**
	 * 信用复审
	 * @param paramMap
	 * @return
	 */
	public LoanOrderVO CreditReview(Integer loan_id){
		return loanAppDao.getLoanOrderByLoanId(loan_id);
	}
	
	public PageVO getLoanOrderListWithPage(Map<?, ?> paramMap) {
		int currentPage=1,pageSize=20;
		if(paramMap!=null && (paramMap.get(PageConstant.CURRPAGE)!=null || paramMap.get(PageConstant.ROWNUM)!=null)){
			currentPage=Integer.valueOf(paramMap.get(PageConstant.CURRPAGE)+"");
			pageSize=Integer.valueOf(paramMap.get(PageConstant.ROWNUM)+"");
		}
		//初始化分页信息
		PageUtil.initPageInfo(currentPage, pageSize);
		List list= loanAppDao.getLoanOrderListWithPage(paramMap);
		//得到分页VO
		PageVO pageVo=PageUtil.getPageVO();
		System.out.println("=====>"+pageVo);
		System.out.println("=====>"+pageVo.getGriddata());
		return pageVo;
	}


}
