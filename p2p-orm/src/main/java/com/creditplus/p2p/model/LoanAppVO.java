package com.creditplus.p2p.model;

import java.util.Date;

/**
 * 借款申请VO
 * @author Administrator
 *
 */
public class LoanAppVO {
	private Integer id;
	private Integer user_id;
	private  Double loan_money;
	private Integer loan_day;
	private String expire_date;
	private Integer count;
	private Double pay_fee;
	private Double act_money;
	private Double overdue_fee;
	private Integer state;
	private String first_trial_user;
	private String review_user;
	private String created_by;
	private Date creted_date;
	private String last_updated_by;
	private Date last_created_date;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUser_id() {
		return user_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public Double getLoan_money() {
		return loan_money;
	}
	public void setLoan_money(Double loan_money) {
		this.loan_money = loan_money;
	}
	public Integer getLoan_day() {
		return loan_day;
	}
	public void setLoan_day(Integer loan_day) {
		this.loan_day = loan_day;
	}
	public String getExpire_date() {
		return expire_date;
	}
	public void setExpire_date(String expire_date) {
		this.expire_date = expire_date;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public Double getPay_fee() {
		return pay_fee;
	}
	public void setPay_fee(Double pay_fee) {
		this.pay_fee = pay_fee;
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
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getFirst_trial_user() {
		return first_trial_user;
	}
	public void setFirst_trial_user(String first_trial_user) {
		this.first_trial_user = first_trial_user;
	}
	public String getReview_user() {
		return review_user;
	}
	public void setReview_user(String review_user) {
		this.review_user = review_user;
	}
	public String getCreated_by() {
		return created_by;
	}
	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}
	public Date getCreted_date() {
		return creted_date;
	}
	public void setCreted_date(Date creted_date) {
		this.creted_date = creted_date;
	}
	public String getLast_updated_by() {
		return last_updated_by;
	}
	public void setLast_updated_by(String last_updated_by) {
		this.last_updated_by = last_updated_by;
	}
	public String getLast_created_date() {
		return last_created_date;
	}
	public void setLast_created_date(String last_created_date) {
		this.last_created_date = last_created_date;
	}
}
