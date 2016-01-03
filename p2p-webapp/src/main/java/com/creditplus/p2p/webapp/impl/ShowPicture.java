package com.creditplus.p2p.webapp.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.creditplus.p2p.service.CommonInfoService;

/**
 * Servlet implementation class ShowPicture
 */
@WebServlet("/ShowPicture")
public class ShowPicture extends HttpServlet {
	public static final Logger logger = LogManager.getLogger(ShowPicture.class);
//	@Autowired
	private CommonInfoService commonInfoService;
	
	//手机端上传图片存入的路径
	private final String PATH_FOLDER_PHONE="/data/web/clx";
	
	//web端上传图片存入的路径(网上抓图)
	private final String PATH_FOLDER_WEB="/data/web/pic/";
	
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
		logger.info("commonInfoService1:"+commonInfoService);
		doPost(request, response);
	}
	
	@Override  
    public void init() throws ServletException {  
  
        super.init();  
        ServletContext servletContext = this.getServletContext();  
  
        WebApplicationContext ctx = WebApplicationContextUtils  
                .getWebApplicationContext(servletContext);  
  
        commonInfoService = (CommonInfoService) ctx.getBean("commonInfoService");  
    }  

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {		
		String imgType = request.getParameter("imgType");//图片类型
		logger.info("imgType:"+imgType);
		String userId = request.getParameter("userId");//用户id
		String imgPath = "";//图片地址
		logger.info("userId:"+userId);
		Map paramsMap=new HashMap();
		paramsMap.put("imgType", imgType);
		paramsMap.put("userId", userId);
		if(imgPath==null || "".equals(imgPath)){
			String imgSrc=commonInfoService.getPictureSrcByUserIdAndType(paramsMap);
			if("11".equals(imgType)){
				imgPath=PATH_FOLDER_WEB+imgSrc;
			}else{
				imgPath=PATH_FOLDER_PHONE+imgSrc;
			}
		}
		logger.info("imgPath1:"+imgPath);
		String imgSuffix = imgPath.substring(imgPath.lastIndexOf(".")+1);
		if(null != imgPath && !"".equals(imgPath.trim())) {
			ImgUtil.showImage(response, imgPath,imgSuffix,true);  
		}
	}

}
