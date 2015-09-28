<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.security.web.WebAttributes" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<title>登录</title>
<link href="css/credit1.css" rel="stylesheet" type="text/css">
<link href="css/credit2.css" rel="stylesheet" type="text/css">
<link href="css/credit3.css" rel="stylesheet" type="text/css">
<link href="css/jqueryztree/zTreeStyle.css" rel="stylesheet" type="text/css">
<script src="js/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
<script src="js/jquery/jquery.ztree.core-3.5.min.js" type="text/javascript"></script>
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

<body>

<div id="hae_Top">

	<!--  头部start -->
	<header id="hae_Header" class="hae-header">
		<!-- logo区域-->
		<nav class="hae-logo pull-left">
			<li class="logo-credit"></li>
			<li class="logo-text">立信贷,好生活!</li>
		</nav>
		
		<!-- 右边登录人、角色区域 -->
		<nav class="hae-toprole pull-right">
			<ul class="hae-menu menu-hor toprloe-admin">
				<li><span>您尚未登录！</span></li>
				<li><a class="render haeRendered" widget="roles" id="Roles_54891949">Administrator<span class="hae-icon icon-triangle-down"></span></a></li>
				<li><a>中文<span class="hae-icon icon-triangle-down"></span></a></li>
				<li><a>注销</a></li>
			</ul>
		</nav>
	</header>
	<!--  头部end -->
	
   <form action="j_spring_security_check" method="post" onsubmit="return validateForm(this)" autocomplete="off">
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
									  <% if(null != session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION)){ %>
									  <div class="hae-spacecontrol col-xs-12 col-sm-12 login-error">
											<div class="row">
												<p class="title">登录错误提示:</p>
   												<span class="aui-icon icon-error"></span>
									    		<ul>
									                    <li><%=session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION) %></li>
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
	<!-- 底部区域 -->
	<footer id="hae_Footer" class="hae-footer">
		<div class="hae-fullwidth clearfix">
			<p class="pull-left">版权所有©诚立信互联网金融服务有限公司2015保留一切权利</p>
			<ul class="pull-right">
				<li><a href="#" target="_self">借款</a></li>
				<li><a href="#" target="_self">投资</a></li>
				<li><a target="_self" href="#">联系我</a></li>
			</ul>
		</div>
	</footer>
</div>
</body>
</html>