package com.creditplus.p2p.webapp.impl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ShowPicture
 */
@WebServlet("/ShowPicture")
public class ShowPicture extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ShowPicture() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String imgPath = request.getParameter("imgPath");//输出图片的类型的标志
		
		String imgType = imgPath.substring(imgPath.lastIndexOf(".")+1);
		if(null != imgPath && !"".equals(imgPath.trim())) {
			ImgUtil.showImage(response, imgPath,imgType,true);  
		}
	}

}
