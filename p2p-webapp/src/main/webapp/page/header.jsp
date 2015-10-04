<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<link href="<%=request.getContextPath()%>/css/credit.css" rel="stylesheet" type="text/css">
<!-- jquery中的ui、ztree、grid对应的css -->
<link href="<%=request.getContextPath()%>/css/jqueryui/jquery-ui.css" rel="stylesheet" type="text/css">
<link href="<%=request.getContextPath()%>/css/jqueryztree/zTreeStyle.css" rel="stylesheet" type="text/css">
<link href="<%=request.getContextPath()%>/css/jqgridui/ui.jqgrid.css" rel="stylesheet" type="text/css">
<script src="<%=request.getContextPath()%>/js/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/js/jquery/jquery.ztree.core-3.5.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/js/jqgrid/i18n/grid.locale-cn.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/js/jqgrid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/js/credit/basic.js" type="text/javascript"></script>
</head>

<body>

	<!--  头部start -->
	<header id="credit_Header" class="credit-header">
		<!-- logo区域-->
		<nav class="credit-logo pull-left">
			<li class="logo-credit"></li>
			<li class="logo-text">立信贷,好生活!</li>
		</nav>
		
		<!-- 右边登录人、角色区域 -->
		<nav class="credit-toprole pull-right">
			<ul class="credit-menu menu-hor toprloe-admin">
				<li><span>欢迎</span>&nbsp;<span class="creditRendered"><sec:authentication property="name"/></span>&nbsp;<span>登录！</span></li>
				<li><a href="/p2p-webapp/j_spring_security_logout">注销</a></li>
			</ul>
		</nav>
	</header>
	<!--  头部end -->

</body>
</html>