package com.creditplus.p2p.model;

import java.util.Date;
import java.util.List;

public class UserInfoVO {

	private Integer id;
	private String name;
	private String sex;
	private Integer age;
	private String ethnic;
	private String province;
	private String city;
	private String phone;
	private String phone_place;
	private String id_card;
	private String card_bank;
	private String card_no;
	private String card_tel;
	private String work_province;
	private String work_city;
	private String work_tel;
	private Integer seasame_scope;
	private String mobile_ser_code;
	private String created_by;
	private Date creted_date;
	private String last_updated_by;
	
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
	public Date getLast_created_date() {
		return last_created_date;
	}
	public void setLast_created_date(Date last_created_date) {
		this.last_created_date = last_created_date;
	}
	public List<LoanAppVO> getLoanAppList() {
		return loanAppList;
	}
	public void setLoanAppList(List<LoanAppVO> loanAppList) {
		this.loanAppList = loanAppList;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	private Date last_created_date;
	private List<LoanAppVO> loanAppList;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getEthnic() {
		return ethnic;
	}
	public void setEthnic(String ethnic) {
		this.ethnic = ethnic;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPhone_place() {
		return phone_place;
	}
	public void setPhone_place(String phone_place) {
		this.phone_place = phone_place;
	}
	public String getId_card() {
		return id_card;
	}
	public void setId_card(String id_card) {
		this.id_card = id_card;
	}
	public String getCard_bank() {
		return card_bank;
	}
	public void setCard_bank(String card_bank) {
		this.card_bank = card_bank;
	}
	public String getCard_no() {
		return card_no;
	}
	public void setCard_no(String card_no) {
		this.card_no = card_no;
	}
	public String getCard_tel() {
		return card_tel;
	}
	public void setCard_tel(String card_tel) {
		this.card_tel = card_tel;
	}
	public String getWork_province() {
		return work_province;
	}
	public void setWork_province(String work_province) {
		this.work_province = work_province;
	}
	public String getWork_city() {
		return work_city;
	}
	public void setWork_city(String work_city) {
		this.work_city = work_city;
	}
	public String getWork_tel() {
		return work_tel;
	}
	public void setWork_tel(String work_tel) {
		this.work_tel = work_tel;
	}
	public Integer getSeasame_scope() {
		return seasame_scope;
	}
	public void setSeasame_scope(Integer seasame_scope) {
		this.seasame_scope = seasame_scope;
	}
	public String getMobile_ser_code() {
		return mobile_ser_code;
	}
	public void setMobile_ser_code(String mobile_ser_code) {
		this.mobile_ser_code = mobile_ser_code;
	}
	
	
	
	
}
