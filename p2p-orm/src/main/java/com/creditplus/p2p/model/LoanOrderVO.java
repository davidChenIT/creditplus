package com.creditplus.p2p.model;

import java.util.Date;
import java.util.List;

public class LoanOrderVO {
	private Integer loan_id;
	private Integer user_id;
	private String loan_full_id;
	private  Double loan_money;
	private String start_day;
	private Integer loan_day;
	private String expire_day;
	private Double pay_fee;
	private Double interest;
	private Double act_money;
	private Double overdue_fee;
	private String bank_type;
	private String bank_card;
	private Integer state;
	private Date modifytime;
	
	private CustomerVO customerInfo;
	private List<ApproveLogVO> appLogList;
	
	public Integer getLoan_id() {
		return loan_id;
	}
	public void setLoan_id(Integer loan_id) {
		this.loan_id = loan_id;
	}
	public Integer getUser_id() {
		return user_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public String getLoan_full_id() {
		return loan_full_id;
	}
	public void setLoan_full_id(String loan_full_id) {
		this.loan_full_id = loan_full_id;
	}
	public Double getLoan_money() {
		return loan_money;
	}
	public void setLoan_money(Double loan_money) {
		this.loan_money = loan_money;
	}
	public String getStart_day() {
		return start_day;
	}
	public void setStart_day(String start_day) {
		this.start_day = start_day;
	}
	public Integer getLoan_day() {
		return loan_day;
	}
	public void setLoan_day(Integer loan_day) {
		this.loan_day = loan_day;
	}
	public String getExpire_day() {
		return expire_day;
	}
	public void setExpire_day(String expire_day) {
		this.expire_day = expire_day;
	}
	public Double getPay_fee() {
		return pay_fee;
	}
	public void setPay_fee(Double pay_fee) {
		this.pay_fee = pay_fee;
	}
	public Double getInterest() {
		return interest;
	}
	public void setInterest(Double interest) {
		this.interest = interest;
	}
	public Double getAct_money() {
		return act_money;
	}
	public void setAct_money(Double act_money) {
		this.act_money = act_money;
	}
	public Double getOverdue_fee() {
		return overdue_fee;
	}
	public void setOverdue_fee(Double overdue_fee) {
		this.overdue_fee = overdue_fee;
	}
	public String getBank_type() {
		return bank_type;
	}
	public void setBank_type(String bank_type) {
		this.bank_type = bank_type;
	}
	public String getBank_card() {
		return bank_card;
	}
	public void setBank_card(String bank_card) {
		this.bank_card = bank_card;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public Date getModifytime() {
		return modifytime;
	}
	public void setModifytime(Date modifytime) {
		this.modifytime = modifytime;
	}
	public List<ApproveLogVO> getAppLogList() {
		return appLogList;
	}
	public void setAppLogList(List<ApproveLogVO> appLogList) {
		this.appLogList = appLogList;
	}
	public CustomerVO getCustomerInfo() {
		return customerInfo;
	}
	public void setCustomerInfo(CustomerVO customerInfo) {
		this.customerInfo = customerInfo;
	}
	
	
	
}
