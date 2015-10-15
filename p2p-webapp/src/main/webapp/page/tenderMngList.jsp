<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<title>标的管理</title>
</head>
<body>

<div id="credit_Top">
  <!-- 引入头部 -->
  <jsp:include page="header.jsp"></jsp:include>
  <script src="<%=request.getContextPath()%>/js/credit/tenderMngList.js" type="text/javascript"></script>
  
  <!-- 中间区域 -->
  <section id="credit_Body" class="credit-layout layout-equalheight ">
       <section class="row">
            <!-- 引入左侧菜单区域 -->
            <jsp:include page="leftMenu.jsp"></jsp:include>
            
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
						<!-- 整个tab控件区域开始-->
						<div name="tenderTab" widget="tab" class="creditRendered credit-tabs">
							<!-- 标题区域 -->
							<div class="tabs-head">
									<div class="credit-slider slider-tabs credit-hide">
										<span class="credit-icon icon-chevron-left credit-disabled"></span>
										<span class="credit-icon icon-chevron-right"></span>
									</div>
									
									<ul>
										<li tabid="rankPool" class="tabs-selected"><span>排名池</span></li>
										<li tabid="cheatInterceptor" page="page/cheatInterceptorList.html" class=""><span>欺诈拦截</span></li>
										<li tabid="tenderPublished" page="page/tenderPublishedList.html" class=""><span>已发标</span></li>
									</ul>
							</div>
							<!-- 标题区域end -->
							<!-- 内容区域start -->
							<div class="tabs-body">
								<!-- 排名池页签开始 -->
								<div tabid="rankPool" class="tabs-body-item creditPageContext credit-validator">
									<div>
										<!--排名池查询条件开始-->
										<div class="row" id="rankPollConditionDiv">
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															申请金额
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="apply_monney" >
														</div>
											
													</div>
												</div>
											</div>				
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															申请时间
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="apply_date" >
														</div>
													</div>
												</div>
											</div>								
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															审批单状态
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="apply_status" >
														</div>
													</div>
												</div>
											</div>								
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															申请单编号
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="apply_code" >
														</div>
													</div>
												</div>
											</div>								
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															申请人姓名
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="apply_username" >
														</div>
													</div>
												</div>
											</div>		
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															申请人身份证号
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="apply_user_card" >
														</div>
													</div>
												</div>
											</div>
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															初审人
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="approve_first_user" >
														</div>
													</div>
												</div>
											</div>		
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															复审人
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="approve_last_user" >
														</div>
													</div>
												</div>
											</div>										
										</div>
										<!--排名池查询条件结束-->
										
										<!--排名池按钮区域开始-->
										<div hw_id="_hw_8138" widget="toolbar" class="creditRendered center credit-toolbar" id="Toolbar_65545051">
											<div hw_id="_hw_8139" widget="button" class="search-y-btn creditRendered" id="Button_84127684" style="display: inline-block;">
												<button class=" credit-btn " name="rankPollSeachBtn" type="button">查询</button>
											</div>
											<div id="restBtn" hw_id="_hw_8140" widget="button" class="clear-y-btn creditRendered" style="display: inline-block;">
												<button class=" credit-btn " name="clearRankPollConditionBtn" type="button">清除</button>
											</div>
										</div>
										<!--排名池按钮区域开始-->
								
										<!-- 排名池grid区域开始 -->
										<div style="display: inline-block;">
											<button class="grid-toobar-btn" name="publishTenderBtn" type="button" style="margin-left: -5px;">发 标</button>
											<span style="margin-left: 20px;">标的金额：</span><span name="publishTenderMoney">0</span>
										</div>
										<div class="row">
											 <table id="rankPoolGrid"></table> 
											 <div id="rankPoolPager"></div>
										</div>
										<!-- 排名池grid区域结束 -->	
									</div>
								</div>
								<!-- 排名池页签结束 -->
							</div>	
							<!-- 内容区域end -->
						</div>
						<!-- 整个tab控件区域结束-->
					</div>
				</div>
				<!--credit_Main_end-->
				
			</div>
			<!--  主区域end -->
       </section>
  </section>
  
  <!-- 引入底部 -->
  <jsp:include page="footer.jsp"></jsp:include>
</div>
</body>
</html>