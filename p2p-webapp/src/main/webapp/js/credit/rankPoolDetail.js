
$(function(){
	debugger;
	var paramsObj = $("div[name='tenderTab']").find("li[tabid='rankPoolDetail']").data();
	var loan_id = paramsObj.loan_id || "";
	//查询详细信息，并赋值
	var queryBiaoDetailParmsStr=JSON.stringify({"loan_id":loan_id,"apply_state":paramsObj.apply_state});
	publicQueryInfoAjax("loanOrderService","getBiaoDetailByLoanId",queryBiaoDetailParmsStr,"rankPoolDetail");
	//查询用户紧急联系人
	var user_id = paramsObj.user_id || "";
	$(".show-img-span").attr("user-id", user_id);
	var userInfoList=publicQueryInfoAjax("urgentContactorService","getListByUserId",JSON.stringify({"user_id":user_id}));
	if(userInfoList){
		$.each(userInfoList, function(i){//更新级联key
			//取模板
			var userTemplateDiv = $("#applyUserUrgentConnectionUserInfoDiv .connection-user");
//			//更新级联key
//			var triggerKey = $(userTemplateDiv).find("select[name=mobile_city]").attr("id");
//			var newTriggerKey = triggerKey.substring(0, triggerKey.length-1) + i;
//			$(userTemplateDiv).find("select[name=mobile_province]").attr("trigger", newTriggerKey);
//			$(userTemplateDiv).find("select[name=mobile_city]").attr("id", newTriggerKey);
			var userDom = userTemplateDiv.html();
			var userDivIdx = "connectionUserIdx" + i;
			var userTemplate = '<div id="'+userDivIdx+'">'+userDom+'</div>';
			setValues("applyUserUrgentConnectionUserInfoDiv", userInfoList[i], userTemplate);
			setValues(userDivIdx,userInfoList[i]);
			//移除静态html，循环输出动态列表元素
			if(i == userInfoList.length-1) 
				userTemplateDiv.remove();
//			else{
//				//triggerKey还原
//				$(userTemplateDiv).find("select[name=mobile_province]").attr("trigger", triggerKey);
//				$(userTemplateDiv).find("select[name=mobile_city]").attr("id", triggerKey);
//			}
//			//渲染下拉框
//			selectRender(userDivIdx);
		});
	}
	
	//查询信用积分列表
	var creditScoreObj = publicQueryInfoAjax("creditScoreService","getCreditScore",JSON.stringify({"loan_id":loan_id,"user_id":user_id}));
	if(creditScoreObj){
		//1. 获取信用评分key，并排序
		var keySortArr = [];
		for(var key in creditScoreObj){
			var val = creditScoreObj[key];
			//信用评分对象
			if(!(typeof val == "number")) keySortArr.push(key);
		}
		//排序
		keySortArr.sort();
		//循环输出
		for(var i = 0; i < keySortArr.length; i++){
			//信用评分对象
			var creditObj = creditScoreObj[keySortArr[i]];
			var templateDiv = $("#creditScoreDiv .credit_temp");
			$(templateDiv).find(".credit-score-title").html(("信用评分"+(i+1)));
			var tempDom = templateDiv.html();
			var divIdx = "creditScoreIdx" + i;
			var creditTemplate = '<div id="' + divIdx + '">' + tempDom + '</div>';
			//输出Dom
			setValues("creditScoreDiv", creditObj, creditTemplate);
			setValues(divIdx, creditObj);
			//移除静态html，循环输出动态列表元素
			if(i == userInfoList.length-1)  templateDiv.remove();
		}
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
	
	/**
	 * 立即发标
	 */
	$("[name='tenderNowBtn']").click(function(){
		updApplyState('7');
	});
	
	/**
	 * 婉拒
	 */
	$("[name='stopBtn']").click(function(){
		updApplyState('10');
	});
	
	/**
	 * 修改状态
	 */
	function updApplyState(apply_state){
		//校验必填
		var approve_content = $("#rankPoolDetail [name=approve_content]").val();
		if(isEmptyString(approve_content))
			messageBox.createMessageDialog("提示","处理意见不能为空！","","","warning");
		else{
			//参数
			var datas = [];
			var request_data = {};
			request_data.loan_id = loan_id;
			request_data.apply_state = apply_state;
			request_data.approve_content = approve_content;
			datas.push(request_data);
			//调用发标服务
		    $.ajax({
				url: serviceAddress,
				datatype: 'json',
				method:"post",
				data:{"module":"loanOrderService","method":"updateLoanOrderState","request_data":JSON.stringify(datas)},			
				success: function(data){
					removeTabItem("tenderTab","rankPoolDetail");
					messageBox.createMessageDialog("提示", "操作成功！", "", "","warning");
					$("[name=rankPollSeachBtn]").click();
				},error:function(error){
					messageBox.createMessageDialog("提示", error, "", "", "error");
				}
		    });
		}
	}
	
});