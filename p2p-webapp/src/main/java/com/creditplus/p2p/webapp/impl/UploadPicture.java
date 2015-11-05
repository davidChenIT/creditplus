package com.creditplus.p2p.webapp.impl;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase.FileUploadIOException;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class UploadPicture extends HttpServlet {
	public static final Logger logger = LogManager.getLogger(UploadPicture.class);
	private static final long serialVersionUID = 1L;
	
	List piclist = new ArrayList();  //放上传的图片名
	
	// 保存文件的目录
	private static String PATH_FOLDER = "";
	// 保存文件的临时目录
	private static String TEMP_FOLDER = "";
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		ServletContext servletCtx = config.getServletContext();
		// 初始化路径
		// 保存文件的目录
		PATH_FOLDER = servletCtx.getRealPath("/webapp/images/upload");
		// 存放临时文件的目录,存放xxx.tmp文件的目录
		TEMP_FOLDER = servletCtx.getRealPath("/webapp/images/uploadTemp");
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException {
		//设置编码
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");
		
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setRepository(new File(TEMP_FOLDER));
		factory.setSizeThreshold(1024 * 1024);
		
		ServletFileUpload upload = new ServletFileUpload(factory);

		try {
			// 提交上来的信息都在这个list里面
			piclist = upload.parseRequest(request);
			// 获取上传的文件
			FileItem item = getUploadFileItem(piclist);
			// 获取文件名
			String fileName = item.getFieldName();
			// 设置修改后的文件名
			String saveName = new Date().getTime() + fileName.substring(fileName.lastIndexOf("."));
			// 打印信息
			logger.info("*******UploadPicture*******doGet*******fileName：" + fileName);
			logger.info("*******UploadPicture*******doGet*******saveName：" + saveName);
			// 写入文件
			item.write(new File(PATH_FOLDER, saveName));
			// 文件信息
			PrintWriter writer = response.getWriter();
			writer.print("{");
			writer.print("msg:\"文件大小：" + item.getSize() + ", 文件名：" + item.getFieldName());
			writer.print("}");
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private FileItem getUploadFileItem(List<FileItem> items){
		for(FileItem item : items){
			if(!item.isFormField())
				return item;
		}
		return null;
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doPost(request, response);
	}

}
