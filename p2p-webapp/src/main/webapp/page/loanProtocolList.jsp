<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<title>风控管理</title>
<link rel="Shortcut Icon" href="/p2p-webapp/images/favicon.ico">
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
						<div name="riskControlTab" widget="tab" class="creditRendered credit-tabs">
							<!-- 标题区域 -->
							<div class="tabs-head">
									<div class="credit-slider slider-tabs credit-hide">
										<span class="credit-icon icon-chevron-left credit-disabled"></span>
										<span class="credit-icon icon-chevron-right"></span>
									</div>
									
									<ul>
										<li tabid="contract" class="tabs-selected"><span>合同</span></li>
									</ul>
							</div>
							<!-- 标题区域end -->
							<!-- 内容区域start -->
							<div class="tabs-body">
								<!-- 排名池页签开始 -->
								<div tabid="contract" class="tabs-body-item creditPageContext credit-validator">
									<div>
										<!--排名池查询条件开始-->
										<div class="row" id="contractConditionDiv">
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															借款金额
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
															合同生成时间
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="sign_time" widget="datepicker">
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
															合同编号
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="contract_id" >
														</div>
													</div>
												</div>
											</div>											
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															借款人姓名
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="loan_name" >
														</div>
													</div>
												</div>
											</div>												
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															借款人身份证
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="loan_id_num" >
														</div>
													</div>
												</div>
											</div>											
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															投资人姓名
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="investor" >
														</div>
													</div>
												</div>
											</div>												
											<div class="credit-spacecontrol col-xs-12 col-sm-4">
												<div class="row">
													<label class="col-xs-12 col-sm-3">
														<div class="credit-label">
															投资人身份证
														</div>
													</label>
													<div class="col-xs-12 col-sm-9">
														<div class="credit-input">
															<input type="text" name="name" >
														</div>
													</div>
												</div>
											</div>												
										</div>
										<!--排名池查询条件结束-->
										
										<!--按钮区域开始-->
										<div class="credit-toolbar">
											<div style="display: inline-block;">
												<button class="grid-toobar-btn search-btn guide-btn" name="contractSeachBtn" type="button">查询</button>
												<button class="grid-toobar-btn clear-btn" name="clearContractConditionBtn" type="button">重置</button>
											</div>
										</div>
										<!--按钮区域结束-->
								
										<!-- 排名池grid区域开始 
										<div style="display: inline-block;margin-top: -40px;">
											<button class="grid-toobar-btn guide-btn" name="publishTenderBtn" type="button" style="margin-left: -5px;">发 标</button>
											<span style="margin-left: 20px;">标的金额：</span><span name="publishTenderMoney">0</span>
										</div>
										-->
										<div class="row">
											 <table id="contractGrid"></table> 
											 <div id="contractPager"></div>
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