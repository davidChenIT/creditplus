$(function(){
	//获取tab页传入的参数，并调用服务
	debugger;
	var paramsObj = $("div[name='firstTrialTab']").find("li[tabid='firstTrial']").data();
	var loan_id = paramsObj.loan_id || "";
	//查询详细信息，并赋值
	var queryFirstTrialDetaiParmsStr=JSON.stringify({"loan_id":loan_id,"approve_content":"开始初审","apply_state":2});
	var resultData = publicQueryInfoAjax("loanOrderService","getCreditFirstTrialDetailByLoanId",queryFirstTrialDetaiParmsStr,"firstTrial");
	if(resultData.apply_state == 2){
		$("[name='firstTrialBtn']").show();
	}
	//查询用户紧急联系人
	var user_id = paramsObj.user_id || "";
	$(".show-img-span").attr("user-id",user_id);
	var userInfoList=publicQueryInfoAjax("urgentContactorService","getListByUserId",JSON.stringify({"user_id":user_id}));
	if(userInfoList){
		debugger;
		$.each(userInfoList, function(i){
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
			setValues("applyUserUrgentConnectionUserInfoDiv",userInfoList[i],userTemplate);
			setValues(userDivIdx, userInfoList[i]);
			//移除静态html，循环输出动态列表元素
			if(i == userInfoList.length-1) 
				userTemplateDiv.remove();
			//渲染下拉框
			selectRender(userDivIdx);
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
	
	
	
	//提交初审按钮
	$("[name='firstTrialBtn']").click(function(){
		debugger;
		var request_data = {
				"loan_id" : $("#firstTrial").find("span[name='loan_id']").text(),
				"user_id" : user_id,
				"approve_content" : "初审完毕",
				"apply_state" : 3
		};
		var checkPass = true;
		//1. 获取所有的必填项
		var validDoms = $("#firstTrial").find("[validation]");
		//2. 循环校验
		if(validDoms.length > 0){
			var isFocusError = false;
			$.each(validDoms, function(i){
				var validDomName = $(validDoms[i]).attr('name');
				var resultObj = validateDom(validDoms[i], "firstTrial");
				if(resultObj && resultObj.is_pass){
					if(resultObj.value){
						request_data[validDomName] = resultObj.value;
					}
				}else{
					if(!isFocusError){
						$(validDoms[i]).focus();
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
			$("#firstTrial").find("input,select,textarea").each(function(i,input){
				var inputName=$(input).attr("name");
				var inputValue=$(input).val();
				//过滤空值
				if(!isEmptyString(inputValue))
					request_data[inputName]=inputValue;
			});
			debugger;
			publicSaveAjax("loanOrderService","creditFirstTrial",JSON.stringify(request_data),"firstTrialTab","firstTrial","[name='firstTrialSearhBtn']");
		}
		
	});

	/**
	 * 省份下拉框onChange事件，级联城市数据
	 */
	$("[trigger*=city_cascade_]").change(function(e){
		elementCascade(e.target, $(e.target).val());
	});
});