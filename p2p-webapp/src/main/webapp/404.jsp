<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%response.setStatus(HttpServletResponse.SC_OK);%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<title>404</title>
<link href="<%=request.getContextPath()%>/css/credit1.css" rel="stylesheet" type="text/css">
<link href="<%=request.getContextPath()%>/css/credit2.css" rel="stylesheet" type="text/css">
<link href="<%=request.getContextPath()%>/css/credit3.css" rel="stylesheet" type="text/css">
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
				<li><span>欢迎 </span><span widget="LogonUser" class="haeRendered" id="LogonUser_23249138">张三</span></li>
				<li><a class="render haeRendered" widget="roles" id="Roles_54891949">Administrator<span class="hae-icon icon-triangle-down"></span></a></li>
				<li><a>中文<span class="hae-icon icon-triangle-down"></span></a></li>
				<li><a>注销</a></li>
			</ul>
		</nav>
	</header>
	<!--  头部end -->
	
	
	
	<!-- 中间区域 -->
	<section id="hae_Body" class="hae-layout layout-equalheight ">
		<section class="row">
			<!-- 菜单区域 -->
			<section id="hae_LeftPanel" class="equalheight-item content-equalheight-item">
				<div class="heightfixed-left">
					<!--展开、收缩图标区域 -->
					<div id="hae_Menu" widget="ToggleMenu" name="hae_bigIcon" class="render hae-menu menu-tree menu-togglemenu haeRendered tree-togglemenu hae-tree">
						<div class="hae-menu-toggle">
							<a class="toggle-icon hae-icon icon-chevron-left" title="点击进行菜单收起到边缘"><</a>
						</div>
					</div>
					
					<!-- 左侧栏目树区域 -->
					<div id="menu_ztree" class="ztree">
					
					</div>
				
				</div>
			</section>
			
			<!--  主区域start -->
			<section id="hae_MainPanel" class="equalheight-item render content-hae-mainPanel haeRendered hae-fullscreen" widget="fullScreen">
				<!-- 面包屑区域 -->
				<div class="row" id="hae_MainTop">
					<div id="breadcrumb" class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
						<ol class="hae-breadcrumb"></ol>
					</div>
				</div>
				
				
				<!--hae_Main_start-->
				<div id="hae_Main" class="hae-page haePageContext" haepagecontextid="main">
					<div class="hae-wrong hae-mainpage">
					    <h2>404</h2>
					    <p>Not Found</p>
					    <div></div>
					    <p></p>
						<p>城立信金融</p>
					</div>
				</div>
				<!--hae_Main_end-->
				
			</section>
			<!--  主区域end -->
		</section>
	</section>
	
	
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