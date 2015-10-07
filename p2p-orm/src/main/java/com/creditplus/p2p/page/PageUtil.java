package com.creditplus.p2p.page;

import com.creditplus.p2p.model.PageVO;

public class PageUtil {

	private static ThreadLocal<PageVO> localPage=new ThreadLocal<PageVO>();
	
	public static void initPageInfo(int pageNum, int pageSize){
		PageVO pageVo=new PageVO(pageNum,pageSize);
		localPage.set(pageVo);
	}
	
	public static PageVO getPageVO(){
		PageVO pageVo=localPage.get();
		localPage.remove();
		return pageVo;
	}
	
	public static PageVO getPageInfo(){
		return localPage.get();
	}
	
}
