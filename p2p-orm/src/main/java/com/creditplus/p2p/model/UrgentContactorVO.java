package com.creditplus.p2p.model;

/**
 * 紧急联系人
 * @author Administrator
 *
 */
public class UrgentContactorVO extends BaseVO {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer user_id;
	private String name;
	private String relation;
	private String mobile;
	private String mobile_address;
	
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRelation() {
		return relation;
	}
	public void setRelation(String relation) {
		this.relation = relation;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getMobile_address() {
		return mobile_address;
	}
	public void setMobile_address(String mobile_address) {
		this.mobile_address = mobile_address;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	
}
