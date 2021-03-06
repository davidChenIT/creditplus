$(function(){
	//获取tab页传入的参数，并调用服务
	debugger;
	var paramsObj = $("div[name='firstTrialTab']").find("li[tabid='firstTrial']").data();
	var loan_id = paramsObj.loan_id || "";
	//查询详细信息，并赋值
	var queryFirstTrialDetaiParmsStr=JSON.stringify({"loan_id":loan_id,"approve_content":"开始初审","apply_state":2});
	var resultData = publicQueryInfoAjax("loanOrderService","getCreditFirstTrialDetailByLoanId",queryFirstTrialDetaiParmsStr,"firstTrial");
	//查询用户紧急联系人
	var user_id = paramsObj.user_id || "";
	$(".show-img-span").attr("user-id",user_id);
	var userInfoList=publicQueryInfoAjax("urgentContactorService","getListByUserId",JSON.stringify({"user_id":user_id}));
	if(userInfoList){
		debugger;
		$.each(userInfoList, function(i){
			//取模板
			var userTemplateDiv = $("#applyUserUrgentConnectionUserInfoDiv .connection-user");
			var userDivIdx = "connectionUserIdx" + i;
			var userDom = userTemplateDiv.html();
			var userTemplate = '<div id="'+userDivIdx+'">'+userDom+'</div>';
			setValues("applyUserUrgentConnectionUserInfoDiv",userInfoList[i],userTemplate);
			setValues(userDivIdx, userInfoList[i]);
			//移除静态html，循环输出动态列表元素
			if(i == userInfoList.length-1){
				userTemplateDiv.remove();
			}
		});
	}
	//加载审批日志grid
	$("#firstTrialLogGrid").jqGrid({
		 url:serviceAddress,
		 datatype: 'json',
		 postData:{"module":"approveLogService","method":"getAppLogByLoanId","request_data":JSON.stringify({"loan_id":loan_id})},
		 mtype: 'POST',
		 autowidth:true,
		 colNames:['处理时间','处理人','处理描述'],
		 colModel :[
				{name:'created_date', index:'created_date',align:'center'},
				{name:'assign_user', index:'assign_user',align:'center'},
				{name:'approve_content', index:'approve_content',align:'center'}
			],
			//pager: '#firstTrialLogPager',
			rowNum:10,
			rowList:[10,20,30],
			viewrecords: true,
			sortable:false,
			emptyrecords:"没有数据！",
			jsonReader : {  
		
		         root:"griddata",  
		
		         page: "currpage",  
		
		         total: "totalpages",  
		
		         records: "totalrecords"
		
		    }
	});

});