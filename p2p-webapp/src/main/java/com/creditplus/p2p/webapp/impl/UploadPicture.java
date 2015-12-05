package com.creditplus.p2p.webapp.impl;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.creditplus.p2p.service.CommonInfoService;
/**
 * Servlet implementation class UploadPicture
 */
@WebServlet("/UploadPicture")
public class UploadPicture extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static final Logger logger = LogManager.getLogger(UploadPicture.class);
	// 保存文件的目录
	private static String PATH_FOLDER = "D:/data/web/pic";
	// 存放临时文件的目录
//	private static String TEMP_FOLDER = "/";
	
	private CommonInfoService commonInfoService;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadPicture() {
		super();
	}
	
	@Override
	public void init() throws ServletException {
//		ServletContext servletCtx = config.getServletContext();
		// 初始化路径
		// 保存文件的目录
//		// 存放临时文件的目录,存放xxx.tmp文件的目录
//		TEMP_FOLDER = servletCtx.getRealPath("/images/uploadTemp");
		super.init();  
        ServletContext servletContext = this.getServletContext();  
//		PATH_FOLDER = servletContext.getRealPath("/data/web/pic");
  
        WebApplicationContext ctx = WebApplicationContextUtils  
                .getWebApplicationContext(servletContext);  
  
        commonInfoService = (CommonInfoService) ctx.getBean("commonInfoService"); 
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}
	
	private FileItem getUploadFileItem(List<FileItem> list) {
		for (FileItem fileItem : list) {
			if(!fileItem.isFormField()) {
				return fileItem;
			}
		}
		return null;
	}
	
	private String getUploadFileName(FileItem item) {
		// 获取路径名
		String value = item.getName();
		// 索引到最后一个反斜杠
		int start = value.lastIndexOf("/");
		// 截取 上传文件的 字符串名字，加1是 去掉反斜杠，
		String filename = value.substring(start + 1);
		
		return filename;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8"); // 设置编码
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");
		response.setHeader("x-frame-options", "SAMEORIGIN");
        // 获得磁盘文件条目工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();
		
		// 如果没以下两行设置的话，上传大的 文件 会占用 很多内存，
		// 设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同
		/**
		 * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上， 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem
		 * 格式的 然后再将其真正写到 对应目录的硬盘上
		 */
//		factory.setRepository(new File(TEMP_FOLDER));
		// 设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
		factory.setSizeThreshold(1024 * 1024);

		// 高水平的API文件上传处理
		ServletFileUpload upload = new ServletFileUpload(factory);
		System.out.println("test str:1232321312313131313131313");
		
		try {
			// 提交上来的信息都在这个list里面
			// 这意味着可以上传多个文件
			// 请自行组织代码
			List<FileItem> list = upload.parseRequest(request);
			// 获取上传的文件
			FileItem item = getUploadFileItem(list);
			// 获取文件名
			String filename = getUploadFileName(item);
			// 保存后的文件名
//			String saveName = new Date().getTime() +"_"+ filename.substring(filename.lastIndexOf("."));
			String saveName = new Date().getTime() +"_"+ filename;
			// 保存后图片的浏览器访问路径
//			String picUrl = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/upload/"+saveName;

			System.out.println("存放目录:" + PATH_FOLDER);
			System.out.println("文件名:" + filename);
			// 真正写到磁盘上
			item.write(new File(PATH_FOLDER, saveName)); // 第三方提供的
			//调用服务，将图片路径写入图片表
			String userId = request.getParameter("userId");//用户id
			System.out.println("用户id:" +userId);
			Map paramMap=new HashMap();
			paramMap.put("user_id", userId);
			paramMap.put("type", 11);
			paramMap.put("url", saveName);
			commonInfoService.savePic(paramMap);
			
			
			PrintWriter writer = response.getWriter();
            String resultStr="{\"result\":\"true\"}";
            PrintWriter out = response.getWriter();  
            out.print("<script type='text/javascript'>window.parent.uploadDialog.uploadCallBack('"+resultStr+"');</script>"); 
			writer.close();
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
