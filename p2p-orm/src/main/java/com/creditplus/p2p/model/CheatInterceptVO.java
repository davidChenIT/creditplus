package com.creditplus.p2p.model;

import java.util.Date;

public class CheatInterceptVO {

//	id,loan_id,state,intercept_source,check_item,intercept_cause,created_by,created_date,last_updated_by,last_updated_date
	private Integer id;
	private Integer loan_id;
	private Integer state;
	private String intercept_source;
	private String check_item;
	private String intercept_cause;
	private String created_by;
	private Date created_date;
	private String last_updated_by;
	private Date last_updated_date;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getLoan_id() {
		return loan_id;
	}
	public void setLoan_id(Integer loan_id) {
		this.loan_id = loan_id;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getIntercept_source() {
		return intercept_source;
	}
	public void setIntercept_source(String intercept_source) {
		this.intercept_source = intercept_source;
	}
	public String getCheck_item() {
		return check_item;
	}
	public void setCheck_item(String check_item) {
		this.check_item = check_item;
	}
	public String getIntercept_cause() {
		return intercept_cause;
	}
	public void setIntercept_cause(String intercept_cause) {
		this.intercept_cause = intercept_cause;
	}
	public String getCreated_by() {
		return created_by;
	}
	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}
	public Date getCreated_date() {
		return created_date;
	}
	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}
	public String getLast_updated_by() {
		return last_updated_by;
	}
	public void setLast_updated_by(String last_updated_by) {
		this.last_updated_by = last_updated_by;
	}
	public Date getLast_updated_date() {
		return last_updated_date;
	}
	public void setLast_updated_date(Date last_updated_date) {
		this.last_updated_date = last_updated_date;
	}
	
	
	
}
