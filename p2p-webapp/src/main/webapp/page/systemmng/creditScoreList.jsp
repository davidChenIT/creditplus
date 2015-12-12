<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<title>信用评分</title>
<link rel="Shortcut Icon" href="/p2p-webapp/images/favicon.ico">
</head>
<body>
<div id="credit_Top">
<jsp:include page="../header.jsp"></jsp:include>
 <!-- 中间区域 -->
  <div id="credit_Body" class="credit-layout layout-equalheight ">
       <div class="row">
            <!-- 引入左侧菜单区域 -->
            <jsp:include page="../leftMenu.jsp"></jsp:include>
            <script src="<%=request.getContextPath()%>/js/credit/creditScoreList.v.1.0.js" type="text/javascript"></script>
            <!--  主区域start -->
			<div id="credit_MainPanel" class="equalheight-item render content-credit-mainPanel creditRendered credit-fullscreen" widget="fullScreen">
				<!-- 面包屑区域 -->
				<div class="row" id="credit_MainTop">
					<div id="breadcrumb" class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
						<ul class="credit-breadcrumb"></ul>
					</div>
				</div>
								
				<!--credit_Main_start-->
				<div id="credit_Main" class="credit-page creditPageContext" creditpagecontextid="main">
				    <div>
						<!-- 整个tab控件区域 -->
						<div hw_id="_hw_8117" name="creditScoreTab" widget="tab" class="creditRendered credit-tabs">
							<!-- 标题区域 -->
							<div class="tabs-head">
									<div class="credit-slider slider-tabs credit-hide">
										<span class="credit-icon icon-chevron-left credit-disabled"></span>
										<span class="credit-icon icon-chevron-right"></span>
									</div>
									
									<ul>
										<li tabid="creditScoreList" class="tabs-selected"><span>信用评分列表</span></li>
									</ul>
							</div>
							<!-- 标题区域end -->
							<!-- 内容区域start -->
							<div class="tabs-body">
								<!-- 页签1 -->
								<div tabid="creditScoreList" class="tabs-body-item creditPageContext credit-validator">
									<div>
									    <!-- 条件区域开始 -->
										<div class="row">
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															模型名称
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="model_name" >
														</div>
													</div>
												</div>
											</div>
											<div class="credit-toolbar" style="display: inline-block;">
												<div >
													<button class="grid-toobar-btn search-btn guide-btn" id="searchCreditScoreListBtn" type="button">查询</button>
												</div>
											</div>
										</div>	
									
									    <!-- grid按钮区域 -->
									    <div style="display: inline-block;">
											<button class="grid-toobar-btn add-btn" name="addCreditScoreBtn" type="button">新增</button>
											<button class="grid-toobar-btn del-btn" name="delCreditScoreBtn" type="button">删除</button>
										</div>
									
										<!-- grid区域开始 -->
										
										<div class="row">
											<table id="creditScoreListGrid"></table> 

											<div id="creditScoreListPager"></div>
										</div>
										<!-- grid区域结束 -->
									</div>
								</div>
							</div>
							<!-- 内容区域end -->
						</div>					
					</div>
				</div>
				<!--credit_Main_end-->
				
			</div>
			<!--  主区域end -->
       </div>
  </div>
  
  <!-- 引入底部 -->
  <jsp:include page="../footer.jsp"></jsp:include>
  </div>
</body>
</html>