package com.creditplus.p2p.webapp.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

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
import com.creditplus.p2p.service.ContractService;

@WebServlet("/ShowContract")
public class ShowContract  extends HttpServlet{
	
	public static final Logger logger = LogManager.getLogger(ShowContract.class);
//	@Autowired
	private ContractService contractService;
	
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ShowContract() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		logger.info("ContractService:"+contractService);
		doPost(request, response);
	}
	
	@Override  
    public void init() throws ServletException {
        super.init();  
        ServletContext servletContext = this.getServletContext(); 
        WebApplicationContext ctx = WebApplicationContextUtils  
                .getWebApplicationContext(servletContext);
        contractService = (ContractService) ctx.getBean("contractService");  
    }  

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {		
		String contract_id = request.getParameter("contract_id");
		if(null != contract_id){
			String contractUrl = contractService.getContractUrl(contract_id);
	        response.setContentType("text/html; charset=UTF-8");
	        OutputStream os = response.getOutputStream(); // 输出流
	        File file = new File(contractUrl); //打开文件
	        
	        int len = 0;
	        byte[] buffer = new byte[4096];
	        FileInputStream fis = new FileInputStream(file);
	        try {
	            while ((len = fis.read(buffer)) > 0) {
	                os.write(buffer,0,len);
	            }
	        } finally {
	            fis.close();
	        }
			
			return;
		}
	}
}
