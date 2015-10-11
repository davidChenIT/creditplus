/**
 * 
 */
package com.creditplus.p2p.model;

/**
 * @author frank
 *
 */
public class CatalogVO extends BaseVO {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	private int catalogId;
	
	private String catalogName;
	
	private int parentId;
	
	private String parentName;
	
	private String url;
	
	private int orderNumber;
	
	private String remark;

	public int getCatalogId() {
		return catalogId;
	}

	public void setCatalogId(int catalogId) {
		this.catalogId = catalogId;
	}

	public String getCatalogName() {
		return catalogName;
	}

	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	
	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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
