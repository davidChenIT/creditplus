
$(function(){
	debugger;
	var paramsObj=$("div[name='tenderTab']").find("li[tabid='rankPoolDetail']").data();
	var loan_id=paramsObj.loan_id || "";
	//查询详细信息，并赋值
	var queryBiaoDetailParmsStr=JSON.stringify({"loan_id":loan_id,"apply_state":paramsObj.apply_state});
	publicQueryInfoAjax("loanOrderService","getBiaoDetailByLoanId",queryBiaoDetailParmsStr,"rankPoolDetail");
	//查询用户紧急联系人
	var user_id=paramsObj.user_id || "";
	var userInfoList=publicQueryInfoAjax("urgentContactorService","getListByUserId",JSON.stringify({"user_id":user_id}));
	if(userInfoList){
		$.each(userInfoList, function(i){//更新级联key
			//取模板
			var userTemplateDiv = $("#applyUserUrgentConnectionUserInfoDiv .connection-user");
			var userDom = userTemplateDiv.html();
			
			var userDivIdx = "connectionUserIdx" + i;
			var userTemplate = '<div id="'+userDivIdx+'">'+userDom+'</div>';
			setValues("applyUserUrgentConnectionUserInfoDiv", userInfoList[i], userTemplate);
			setValues(userDivIdx,userInfoList[i]);
			//移除静态html，循环输出动态列表元素
			if(i == userInfoList.length-1) 
				userTemplateDiv.remove();
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
	
	
	
	//提交初审按钮
	$("[name='reviewBtn']").click(function(){
		
		
	});
	
	$("[name='rejectBtn']").click(function(){
//		debugger;
//		var request_data={"loan_id":$("#review").find("span[name='loan_id']").text(),"user_id":user_id,"approve_content":"驳回，用户身份证不正确","apply_state":2};
//		var checkPass = true;
//		if(checkPass){
//			$("div[name='firstTrial']").find("input").each(function(i,input){
//				var inputName=$(input).attr("name");
//				var inputValue=$(input).val();
//				request_data[inputName]=inputValue;
//			});
//			debugger;
//			//提交
//			publicSaveAjax("loanOrderService","creditReviewReject",JSON.stringify(request_data),"tenderTab","rankPoolDetail","[name='reviewSearchBtn']");
//		}else{
//			messageBox.createMessageDialog("提示","对不起，您有数据录入不正确，请检查并正确录入后再次提交！","","","warning");
//			return false;
//		}
		
	});
	
});