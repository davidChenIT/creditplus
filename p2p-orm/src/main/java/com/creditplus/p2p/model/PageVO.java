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
	
	private int rowNum = 10;
	
	private int startRow;
	
	private int endRow;

	private List griddata;

	
	public PageVO(int currpage, int rowNum) {
		super();
		this.currpage = currpage;
		this.rowNum = rowNum;
	    this.startRow = currpage > 0 ? (currpage - 1) * rowNum : 0;
        this.endRow = currpage * rowNum;
	}
	
	public PageVO() {
		super();
	}

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

	public int getStartRow() {
		return startRow;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}

	public int getEndRow() {
		return endRow;
	}

	public void setEndRow(int endRow) {
		this.endRow = endRow;
	}

	
}
