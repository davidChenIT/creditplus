/**
 * 
 */
package com.creditplus.p2p.model;

import java.util.List;

/**
 * @author frank
 *
 */
public class PageVO {
	
	private int totalpages;
	
	private int currpage = 1;

	private int totalrecords;
	
	private int rowNum = 20;

	private List griddata;

	public int getTotalpages() {
		totalpages = totalrecords/rowNum;
		if(totalpages * rowNum < totalrecords){
			totalpages = totalpages + 1;
		}		
		return totalpages;
	}

	public void setTotalpages(int totalpages) {
		this.totalpages = totalpages;
	}

	public int getCurrpage() {
		return currpage;
	}

	public void setCurrpage(int currpage) {
		this.currpage = currpage;
	}

	public int getTotalrecords() {
		return totalrecords;
	}

	public void setTotalrecords(int totalrecords) {
		this.totalrecords = totalrecords;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

	public List getGriddata() {
		return griddata;
	}

	public void setGriddata(List griddata) {
		this.griddata = griddata;
	}

}
