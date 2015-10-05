package com.creditplus.p2p.model;

import java.util.Date;

public class ApproveLogVO {
//	id,loan_id,first_approve,two_approve,three_approve,approve_content,state,created_by,created_date,last_updated_by,last_updated_date
	private Integer id;
	private Integer loan_id;
	private String first_approve;
	private String two_approve;
	private String three_approve;
	private String approve_content;
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
	public String getFirst_approve() {
		return first_approve;
	}
	public void setFirst_approve(String first_approve) {
		this.first_approve = first_approve;
	}
	public String getTwo_approve() {
		return two_approve;
	}
	public void setTwo_approve(String two_approve) {
		this.two_approve = two_approve;
	}
	public String getThree_approve() {
		return three_approve;
	}
	public void setThree_approve(String three_approve) {
		this.three_approve = three_approve;
	}
	public String getApprove_content() {
		return approve_content;
	}
	public void setApprove_content(String approve_content) {
		this.approve_content = approve_content;
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
