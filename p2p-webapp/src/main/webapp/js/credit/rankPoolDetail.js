
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
	
	
	
	//提交初审按钮
	$("[name='reviewBtn']").click(function(){
		debugger;
		var request_data={"loan_id":$("#review").find("span[name='loan_id']").text(),"user_id":user_id,"approve_content":"复审完毕","apply_state":5};
		var checkPass = true;
		//1. 获取所有的必填项
		var requiredDoms = $("#review").find("[validtion*='required']");
		//2. 循环校验
		if(requiredDoms.length > 0){
			var isFocusError = false;
			$.each(requiredDoms,function(i){
				var validDomName = $(requiredDoms[i]).attr('name');
				var elementVal = validateRequire(validDomName,"此项为必填！","rankPoolDetail");
				if(elementVal){
					request_data[validDomName] = elementVal;
				}else{
					if(!isFocusError){
						$(requiredDoms[i]).focus();
						isFocusError = true;
					}
					checkPass = false;
				}
			});	
		}
		//3. 获取紧急联系人数据
		var connectionUserDoms = $("div[id*=connectionUserIdx]");
		var urgentList = [];
		$.each(connectionUserDoms, function(i){
			var userObj = {};
			var valDomTypes = ["input","span","select"];
			$.each(valDomTypes, function(y){
				var valDoms = $($(connectionUserDoms)[i]).find(valDomTypes[y]);
				if(valDoms.length > 0){
					$.each(valDoms, function(k){
						var key = $(valDoms[k]).attr('name');
						switch(valDomTypes[y]){
						case "span" :
							userObj[key] = $(valDoms[k]).text();
							break;
						default:
							userObj[key] = $(valDoms[k]).val();
						}
					});
				}
			});
			urgentList.push(userObj);
		});
		request_data['urgentList'] = urgentList;
		
		//4. 校验通过调提交初审服务
		if(checkPass){
			$("div[name='firstTrial']").find("input").each(function(i,input){
				var inputName=$(input).attr("name");
				var inputValue=$(input).val();
				//过滤空值
				if(!isEmptyString(inputValue))
					request_data[inputName]=inputValue;
			});
			debugger;
			//提交
			publicSaveAjax("loanOrderService","creditReview",JSON.stringify(request_data),"tenderTab","rankPoolDetail","[name='reviewSearchBtn']");
			
		}else{
			messageBox.createMessageDialog("提示","对不起，您有数据录入不正确，请检查并正确录入后再次提交！","","","warning");
			return false;
		}
		
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