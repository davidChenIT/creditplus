package com.creditplus.p2p.webapp.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

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
			throws ServletException {
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
			throws ServletException {	
		/*try {
			String contract_id = request.getParameter("contract_id");
			if(null != contract_id){
				String contractUrl = contractService.getContractUrl(contract_id);
				response.setCharacterEncoding("UTF-8");
				response.setHeader("Content-Type","text/html;charset=UTF-8");
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
		            os.close();
		        }
				
			}
		} catch (IOException e) {
			logger.error(e);
		}*/
		constractGenerate(request, response);
	}
	
	private void constractGenerate(HttpServletRequest request, HttpServletResponse response){
		try {
			String charSet=java.nio.charset.Charset.defaultCharset().name();
			request.setCharacterEncoding("UTF-8");
			String contract_id = getRequestParam(request, "contract_id");
			if(null != contract_id){
				String sign_time=getRequestParam(request, "sign_time");
				String loan_money=getRequestParam(request, "loan_money");
				String loan_name=getRequestParam(request, "loan_name");
				String investor=getRequestParam(request, "investor");
				String contractUrl = contractService.getContractUrl(contract_id);
				response.setCharacterEncoding("UTF-8");
				response.setHeader("Content-Type","text/html;charset=UTF-8");
		        OutputStream os = response.getOutputStream(); // 输出流
		        
		        File file = new File(contractUrl); //打开文件
		        BufferedReader br=new BufferedReader(new FileReader(file));
		        try {
		        	String line = null;
		        	StringBuilder sb=new StringBuilder();
		            while ((line=br.readLine())!=null) {
		            	sb.append(line);
		            }
		            if(StringUtils.isNotEmpty(sb)){
		            	logger.info("sb:"+sb.toString());
		            	String templateStr=sb.toString();
		            	templateStr=templateStr.replace("${contract_id}", contract_id).replace("${sign_time}", sign_time).replace("${loan_money}", loan_money).replace("${loan_name}", loan_name).replace("${investor}", investor);
		            	os.write(templateStr.getBytes("UTF-8"));
		            }
		        } finally {
		        	br.close();
		            os.close();
		        }
			}
		} catch (IOException e) {
			logger.error(e);
		}
	}
	
	private String getRequestParam(HttpServletRequest request,String key){
		String value="";
		String paramValue=request.getParameter(key);
		if(StringUtils.isNotBlank(paramValue)){
			try {
				value=new String(paramValue.getBytes("ISO-8859-1"),"UTF-8");
			} catch (UnsupportedEncodingException e) {
				logger.error(e);
			}
		}
		return value;
	}
	
}
