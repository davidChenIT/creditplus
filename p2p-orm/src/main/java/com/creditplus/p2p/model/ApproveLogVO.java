package com.creditplus.p2p.model;


public class ApproveLogVO  extends BaseVO{

	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer loan_id;
	private String first_approve;
	private String two_approve;
	private String three_approve;
	private String approve_content;
	
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
	
	

}
