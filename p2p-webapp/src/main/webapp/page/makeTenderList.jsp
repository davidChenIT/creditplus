<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<title>投标列表</title>
<script src="<%=request.getContextPath()%>/js/credit/makeTenderList.js" type="text/javascript"></script>
</head>


<body>

<div id="credit_Top">
  <!-- 引入头部 -->
  <jsp:include page="header.jsp"></jsp:include>
  
  <!-- 中间区域 -->
  <section id="credit_Body" class="credit-layout layout-equalheight ">
       <section class="row">
            <!-- 引入左侧菜单区域 -->
            <jsp:include page="leftMenu.jsp"></jsp:include>
            
            <!--  主区域start -->
			<div id="hae_MainPanel" class="equalheight-item render content-hae-mainPanel haeRendered hae-fullscreen" widget="fullScreen">
				<!-- 面包屑区域 -->
				<div class="row" id="hae_MainTop">
					<div id="breadcrumb" class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
						<ul class="hae-breadcrumb"></ul>
					</div>
				</div>
				
				
				<!--hae_Main_start-->
				<div id="hae_Main" class="hae-page haePageContext" haepagecontextid="main">
				    <div>
						<!-- 整个tab控件区域 -->
						<div hw_id="_hw_8117" name="makeTenderTab" widget="tab" class="haeRendered hae-tabs" id="Tab_47892031">
							<!-- 标题区域 -->
							<div class="tabs-head">
									<div class="hae-slider slider-tabs hae-hide">
										<span class="hae-icon icon-chevron-left hae-disabled"></span>
										<span class="hae-icon icon-chevron-right"></span>
									</div>
									
									<ul>
										<li tabid="makeTenderList" class="tabs-selected"><span>投标列表</span></li>
									</ul>
							</div>
							<!-- 标题区域end -->
							<!-- 内容区域start -->
							<div class="tabs-body">
								<!-- 页签1 -->
								<div tabid="makeTenderList" class="tabs-body-item haePageContext hae-validator" haepagecontextid="page_85823101">
									<div>
										<!-- grid区域开始 -->
										<div class="row">
											<table id="tenderMngListGrid"></table> 

											<div id="tenderMngListPager"></div>
										</div>
										<!-- grid区域结束 -->
									</div>
								</div>
							</div>
							<!-- 内容区域end -->
						</div>					
					</div>
				</div>
				<!--hae_Main_end-->
				
			</div>
			<!--  主区域end -->
       </section>
  </section>
  
  <!-- 引入底部 -->
  <jsp:include page="footer.jsp"></jsp:include>
</div>
</body>
</html>