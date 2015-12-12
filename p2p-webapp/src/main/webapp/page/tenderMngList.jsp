<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<title>标的管理</title>
<link rel="Shortcut Icon" href="/p2p-webapp/images/favicon.ico">
</head>
<body>

<div id="credit_Top">
  <!-- 引入头部 -->
  <jsp:include page="header.jsp"></jsp:include>
  <script src="<%=request.getContextPath()%>/js/credit/tenderMngList.v.1.0.js" type="text/javascript"></script>
  
  <!-- 中间区域 -->
  <div id="credit_Body" class="credit-layout layout-equalheight ">
       <div class="row">
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
															<input type="text" name="loan_money" >
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
															<input type="text" name="modifytime" widget="datepicker">
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
															<select name="apply_state" widget="dropdown" dictionary_type="apply_state">
																<option value="">请选择</option>
															</select>
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
															<input type="text" name="loan_id" >
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
															<input type="text" name="name" >
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
															<input type="text" name="id_num" >
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
															<input type="text" name="first_assign_user" >
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
															<input type="text" name="review_assign_user" >
														</div>
													</div>
												</div>
											</div>										
										</div>
										<!--排名池查询条件结束-->
										
										<!--按钮区域开始-->
										<div class="credit-toolbar">
											<div style="display: inline-block;">
												<button class="grid-toobar-btn search-btn guide-btn" name="rankPollSeachBtn" type="button">查询</button>
												<button class="grid-toobar-btn clear-btn" name="clearRankPollConditionBtn" type="button">重置</button>
											</div>
										</div>
										<!--按钮区域结束-->
								
										<!-- 排名池grid区域开始 -->
										<div style="display: inline-block;margin-top: -40px;">
											<button class="grid-toobar-btn guide-btn" name="publishTenderBtn" type="button" style="margin-left: -5px;">发 标</button>
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
       </div>
  </div>
  
  <!-- 引入底部 -->
  <jsp:include page="footer.jsp"></jsp:include>
</div>
</body>
</html>