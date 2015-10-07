<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true"%>
<%response.setStatus(HttpServletResponse.SC_OK);%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<title>500</title>
</head>

<body>
<div id="credit_Top">
  <!-- 引入底部 -->
  <jsp:include page="page/header.jsp"></jsp:include>
	
	
	
	<!-- 中间区域 -->
	<section id="credit_Body" class="credit-layout layout-equalheight ">
		<section class="row">
			<!-- 引入左侧菜单区域 -->
            <jsp:include page="page/leftMenu.jsp"></jsp:include>
			
			<!--  主区域start -->
			<section id="credit_MainPanel" class="equalheight-item render content-credit-mainPanel creditRendered credit-fullscreen" widget="fullScreen">
				<!-- 面包屑区域 -->
				<div class="row" id="credit_MainTop">
					<div id="breadcrumb" class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
						<ol class="credit-breadcrumb"></ol>
					</div>
				</div>
				
				
				<!--credit_Main_start-->
				<div id="credit_Main" class="credit-page creditPageContext" creditpagecontextid="main">
					<div class="credit-wrong credit-mainpage">
					    <h2>500</h2>
					    <p>Error</p>
					    <div></div>	
					    <p></p>
						<p>诚立信金融</p>
					</div>
				</div>
				<!--credit_Main_end-->
				
			</section>
			<!--  主区域end -->
		</section>
	</section>
	
	
	<!-- 引入底部 -->
   <jsp:include page="page/footer.jsp"></jsp:include>

</div>
</body>
</html>