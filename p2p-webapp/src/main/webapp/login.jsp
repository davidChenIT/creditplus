<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.security.web.WebAttributes" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<link rel="Shortcut Icon" href="/p2p-webapp/images/favicon.ico">
<title>登录</title>
<link href="<%=request.getContextPath()%>/css/credit.v.1.0.css" rel="stylesheet" type="text/css">
<script src="<%=request.getContextPath()%>/js/jquery/json2.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/js/jquery/jquery-2.0.3.min.js" type="text/javascript"></script>
</head>
<script>  
$(function(){
	//清除缓存数据
	localStorage.clear();
});
  //页面初始化加载函数
  function validateForm(form){
	    var  username=$("input[name='username']").val();
		var  password=$("input[name='password']").val();
		if(!username || !$.trim(username)){
		  var usernameTipLength=$("span[name='usernameTip']").length;
		  if(usernameTipLength==0){
		  	$("input[name='username']").parent().after("<span name='usernameTip' style='color:red;'>请输入用户名！</span>");
		  }
		  return false;
		}else{
		   $("span[name='usernameTip']").remove();
		}
		
		if(!password){
		   var passwordTipLength=$("span[name='passwordTip']").length;
		   if(passwordTipLength==0){
		   	$("input[name='password']").parent().after("<span name='passwordTip' style='color:red;'>请输入密码！</span>");
		   }
		   
		   return false;
		}else{
		   $("span[name='passwordTip']").remove();		  
		}

		return true;	  
  }
</script>

<body>

<div id="credit_Top">

  <!--  头部start -->
	<header id="credit_Header" class="credit-header">
		<!-- logo区域-->
		<nav class="credit-logo pull-left">
			<li class="logo-credit"></li>
			<li class="logo-text">立信贷,好生活!</li>
		</nav>
	</header>
	<!--  头部end -->
	
   <form action="<%=request.getContextPath()%>/j_spring_security_check" method="post" onsubmit="return validateForm(this)" autocomplete="off">
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>	
    <!-- 中间区域 -->
	<section id="credit_Body" class="credit-layout layout-equalheight ">
		<section class="row">
			
			<!--  主区域start -->
			<section id="credit_MainPanel" class="equalheight-item render content-credit-mainPanel creditRendered credit-fullscreen" widget="fullScreen">
				
				<!-- 主内容区域 -->
				<div id="credit_Main" class="credit-page creditPageContext" creditpagecontextid="main">
				
				     <div>
					 
					   <div class="login-center">
   
								<div class="row">
								      
									  <div class="credit-spacecontrol col-xs-12 col-sm-12">
											<div class="row">
												<h2>登&nbsp;录</h2>
											</div>
									  </div>									   
									  <% if(null != session && null != session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION)){ %>
									  <div class="credit-spacecontrol col-xs-12 col-sm-12 login-error">
											<div class="row">
												<p class="title">登录错误提示:</p>
   												<span class="aui-icon icon-error"></span>
									    		<ul>
									                    <li>${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}</li>
									            </ul>
											</div>
									  </div>
									  <%} %>
								      <div class="credit-spacecontrol col-xs-12 col-sm-12">
											<div class="row">
												<label class="col-xs-12 col-sm-3">
													<div class="credit-label">
														用户名
													</div>
												</label>
												<div class="col-xs-12 col-sm-6">
													<div class="credit-input">
														<input type="text" name="username" >
													</div>
										
												</div>
											</div>
										</div>	
										
										
										<div class="credit-spacecontrol col-xs-12 col-sm-12">
											<div class="row">
												<label class="col-xs-12 col-sm-3">
													<div class="credit-label">
														密&nbsp;&nbsp;&nbsp;码
													</div>
												</label>
												<div class="col-xs-12 col-sm-6">
													<div class="credit-input">
														<input type="password" name="password" >
													</div>
										
												</div>
											</div>
										</div>		
															
								</div>
								
								
								<div class="creditRendered center credit-toolbar" >
									<div >
										<button name="loginBtn"  type="submit">登&nbsp;&nbsp;录</button>
									</div>
									
								</div>

						</div>
					 
				     </div>
					
				</div>
				<!-- 主内容区域end -->
				
				
			</section>
			<!--  主区域end -->
		</section>
	</section>	
	</form>	
	<!-- 引入底部 -->
  <jsp:include page="page/footer.jsp"></jsp:include>
</div>
</body>
</html>