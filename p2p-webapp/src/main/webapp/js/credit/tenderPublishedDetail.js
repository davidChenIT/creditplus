
$(function(){
	debugger;
	var paramsObj = $("div[name='tenderTab']").find("li[tabid='tenderPublishedDetail']").data();
	var loan_id = paramsObj.loan_id || "";
	//查询详细信息，并赋值
	var queryBiaoDetailParmsStr=JSON.stringify({"loan_id":loan_id,"apply_state":paramsObj.apply_state});
	publicQueryInfoAjax("loanOrderService","getBiaoDetailByLoanId",queryBiaoDetailParmsStr,"tenderPublishedDetail");
	//查询用户紧急联系人
	var user_id = paramsObj.user_id || "";
	$(".show-img-span").attr("user-id", user_id);
	var userInfoList=publicQueryInfoAjax("urgentContactorService","getListByUserId",JSON.stringify({"user_id":user_id}));
	if(userInfoList){
		$.each(userInfoList, function(i){//更新级联key
			//取模板
			var userTemplateDiv = $("#applyUserUrgentConnectionUserInfoDiv .connection-user");
			//更新级联key
			var triggerKey = $(userTemplateDiv).find("select[name=mobile_city]").attr("id");
			var newTriggerKey = triggerKey.substring(0, triggerKey.length-1) + i;
			$(userTemplateDiv).find("select[name=mobile_province]").attr("trigger", newTriggerKey);
			$(userTemplateDiv).find("select[name=mobile_city]").attr("id", newTriggerKey);
			var userDom = userTemplateDiv.html();
			
			var userDivIdx = "connectionUserIdx" + i;
			var userTemplate = '<div id="'+userDivIdx+'">'+userDom+'</div>';
			setValues("applyUserUrgentConnectionUserInfoDiv", userInfoList[i], userTemplate);
			setValues(userDivIdx,userInfoList[i]);
			//移除静态html，循环输出动态列表元素
			if(i == userInfoList.length-1) 
				userTemplateDiv.remove();
			else{
				//triggerKey还原
				$(userTemplateDiv).find("select[name=mobile_province]").attr("trigger", triggerKey);
				$(userTemplateDiv).find("select[name=mobile_city]").attr("id", triggerKey);
			}
			//渲染下拉框
			selectRender(userDivIdx);
		});
	}
	//构造grid
	$("#approveLogGrid").jqGrid({
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
//			pager: '#reviewLogPager',
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