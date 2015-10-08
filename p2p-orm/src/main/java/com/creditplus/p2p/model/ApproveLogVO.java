package com.creditplus.p2p.model;


public class ApproveLogVO  extends BaseVO{

	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer loan_id;
	private String assign_user;
	private String approve_content;
	private Integer state;
	
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
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
	public String getAssign_user() {
		return assign_user;
	}
	public void setAssign_user(String assign_user) {
		this.assign_user = assign_user;
	}
	public String getApprove_content() {
		return approve_content;
	}
	public void setApprove_content(String approve_content) {
		this.approve_content = approve_content;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	

}
