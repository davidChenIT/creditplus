package com.creditplus.p2p.model;

public class DictVO  extends BaseVO {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	private int dictId;
	
	private String code;
	
	private String name;
	
	private String type;
	
	private int state;
	
	private int parentId;
	
	private String parent_type;
	
	private String parent_code;
	
	public String getParent_type() {
		return parent_type;
	}

	public void setParent_type(String parent_type) {
		this.parent_type = parent_type;
	}

	public String getParent_code() {
		return parent_code;
	}

	public void setParent_code(String parent_code) {
		this.parent_code = parent_code;
	}

	private int orderNumber;
	
	private String remark;

	public int getDictId() {
		return dictId;
	}

	public void setDictId(int dictId) {
		this.dictId = dictId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
