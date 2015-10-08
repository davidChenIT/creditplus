/**
 * 
 */
package com.creditplus.p2p.model;

import java.util.Date;

/**
 * @author frank
 *
 */
public class BaseVO implements java.io.Serializable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	private String created_by;	
	private Date created_date;
	private String last_updated_by;
	private Date last_updated_date;
	private int startNum;
	private int pageSize;
	
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
	public int getStartNum() {
		return startNum;
	}
	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
