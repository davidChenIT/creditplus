<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.security.web.WebAttributes" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<title>登录</title>
<link href="<%=request.getContextPath()%>/css/credit.css" rel="stylesheet" type="text/css">
<script src="<%=request.getContextPath()%>/js/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
</head>
<script>
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

<div id="hae_Top">

  <!--  头部start -->
	<header id="hae_Header" class="hae-header">
		<!-- logo区域-->
		<nav class="hae-logo pull-left">
			<li class="logo-credit"></li>
			<li class="logo-text">立信贷,好生活!</li>
		</nav>
	</header>
	<!--  头部end -->
	
   <form action="<%=request.getContextPath()%>/j_spring_security_check" method="post" onsubmit="return validateForm(this)" autocomplete="off">
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>	
    <!-- 中间区域 -->
	<section id="hae_Body" class="hae-layout layout-equalheight ">
		<section class="row">
			
			<!--  主区域start -->
			<section id="hae_MainPanel" class="equalheight-item render content-hae-mainPanel haeRendered hae-fullscreen" widget="fullScreen">
				
				<!-- 主内容区域 -->
				<div id="hae_Main" class="hae-page haePageContext" haepagecontextid="main">
				
				     <div>
					 
					   <div class="login-center">
   
								<div class="row">
								      
									  <div class="hae-spacecontrol col-xs-12 col-sm-12">
											<div class="row">
												<h2>登&nbsp;录</h2>
											</div>
									  </div>									   
									  <% if(null != session && null != session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION)){ %>
									  <div class="hae-spacecontrol col-xs-12 col-sm-12 login-error">
											<div class="row">
												<p class="title">登录错误提示:</p>
   												<span class="aui-icon icon-error"></span>
									    		<ul>
									                    <li>${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}</li>
									            </ul>
											</div>
									  </div>
									  <%} %>
								      <div class="hae-spacecontrol col-xs-12 col-sm-12">
											<div class="row">
												<label class="col-xs-12 col-sm-3">
													<div class="hae-label">
														用户名
													</div>
												</label>
												<div class="col-xs-12 col-sm-6">
													<div class="hae-input">
														<input type="text" name="username" >
													</div>
										
												</div>
											</div>
										</div>	
										
										
										<div class="hae-spacecontrol col-xs-12 col-sm-12">
											<div class="row">
												<label class="col-xs-12 col-sm-3">
													<div class="hae-label">
														密&nbsp;&nbsp;&nbsp;码
													</div>
												</label>
												<div class="col-xs-12 col-sm-6">
													<div class="hae-input">
														<input type="password" name="password" >
													</div>
										
												</div>
											</div>
										</div>		
															
								</div>
								
								
								<div class="haeRendered center hae-toolbar" >
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