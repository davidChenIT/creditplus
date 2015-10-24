$(function(){
//	 getCreditFirstTrialDetailByLoanId  初审详情
//	 getCreditReviewDetailByLoanId    复审详情
//	 creditFirstTrial   初审提交
//	 creditReview     复审提交
//
//	 urgentContactorService   getListByUserId 查询紧急连接人{user_id=“”}
	
	
	//获取tab页传入的参数，并调用服务
	debugger;
	var paramsObj=$("div[name='firstTrialTab']").find("li[tabid='firstTrial']").data();
	var loan_id=paramsObj.loan_id || "";
	//查询详细信息，并赋值
	var queryFirstTrialDetaiParmsStr=JSON.stringify({"loan_id":loan_id,"approve_content":"开始初审","apply_state":2});
	publicQueryInfoAjax("loanOrderService","getCreditFirstTrialDetailByLoanId",queryFirstTrialDetaiParmsStr,"firstTrial");
	//查询用户紧急联系人
	var user_id=paramsObj.user_id || "";
	var userInfoList=publicQueryInfoAjax("urgentContactorService","getListByUserId",JSON.stringify({"user_id":user_id}));
	if(userInfoList){
		debugger;
		var userTemplateDiv = $("#applyUserUrgentConnectionUserInfoDiv .connection-user");
		var userDom = userTemplateDiv.html();
		//移除静态html，循环输出动态列表元素
		userTemplateDiv.remove();
		$.each(userInfoList, function(i){
			var userDivIdx = "connectionUserIdx" + i;
			var userTemplate = '<div id="'+userDivIdx+'">'+userDom+'</div>';
			setValues("applyUserUrgentConnectionUserInfoDiv",userInfoList[i],userTemplate);
			setValues(userDivIdx,userInfoList[i]);
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
		var request_data={"loan_id":$("#firstTrial").find("span[name='loan_id']").text(),"user_id":user_id,"approve_content":"初审完毕","apply_state":3};
		var checkPass = true;
		//1. 获取所有的必填项
		var requiredDoms = $("#firstTrial").find("[validtion*='required']");
		//2. 循环校验\
		if(requiredDoms.length > 0){
			var isFocusError = false;
			$.each(requiredDoms,function(i){
				var validDomName = $(requiredDoms[i]).attr('name');
				var elementVal = validateRequire(validDomName,"此项为必填！","firstTrial");
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
		
		/*
        var thnic_v = validateRequire("thnic_v","请输入名族！","firstTrial");
		if(thnic_v){			
        	request_data.thnic_v=thnic_v;
        }else{
        	checkPass = false;
        }
		var registered_place_v = validateRequire("registered_place_v","请输入户口所在地！","firstTrial");
		if(registered_place_v){			
        	request_data.registered_place_v=registered_place_v;
        }else{
        	checkPass = false;
        }
		var mobile_place_v = validateRequire("mobile_place_v","请输入电话所属地！","firstTrial");
		if(mobile_place_v){			
        	request_data.mobile_place_v=mobile_place_v;
        }else{
        	checkPass = false;
        }
		var id_num_name_v = validateRequire("id_num_name_v","请输入身份证验证姓名！","firstTrial");
		if(id_num_name_v){			
			request_data.id_num_name_v=id_num_name_v;
		}else{
			checkPass = false;
		}
		var id_num_v = validateRequire("id_num_v","请输入身份证验证号码！","firstTrial");
		if(id_num_v){			
			request_data.id_num_v=id_num_v;
		}else{
			checkPass = false;
		}
		var id_num_v = validateRequire("id_num_v","请输入身份证验证号码！","firstTrial");
		if(id_num_v){			
			request_data.id_num_v=id_num_v;
		}else{
			checkPass = false;
		}
		*/
		//4. 校验通过调提交初审服务
		if(checkPass){
//			$("div[name='firstTrial']").find("input").each(function(i,input){
//				var inputName=$(input).attr("name");
//				var inputValue=$(input).val();
//				request_data[inputName]=inputValue;
//			});
			debugger;
			publicSaveAjax("loanOrderService","creditFirstTrial",JSON.stringify(request_data),"firstTrialTab","firstTrial","[name='firstTrialSearhBtn']");
		}else{
			messageBox.createMessageDialog("提示","对不起，您有数据录入不正确，请检查并正确录入后再次提交！","","","warning");
		}
		
	});
	
	
});