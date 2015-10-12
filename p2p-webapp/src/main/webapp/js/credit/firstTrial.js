$(function(){
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
	$("#firstTrialLogGrid").jqGrid({
		 url:serviceAddress,
		 datatype: 'json',
		 postData:{"module":"approveLogService","method":"getAppLogByLoanId","request_data":{}},
		 mtype: 'POST',
		 autowidth:true,
		 colNames:['处理时间','处理人','备注'],
		 colModel :[
				{name:'applay_date', index:'applay_date',align:'center'},
				{name:'applay_user', index:'applay_user',align:'center'},
				{name:'remark', index:'remark',align:'center'}
			],
			pager: '#firstTrialLogPager',
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
	
	
	//获取tab页传入的参数，并调用服务
	debugger;
	var paramsObj=$("div[name='firstTrialTab']").find("li[tabid='firstTrial']").data();
	var loan_id=paramsObj.loan_id || "";
	var request_data={"loan_id":loan_id};
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";		
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		data:{"module":"loanOrderService","method":"creditFirstTrial","request_data":JSON.stringify(request_data)},			
		success: function(data){
			debugger;
			setValues("loanApplyInfoDiv",data,false);
			setValues("applyUserInfoDiv",data,false);
			setValues("applyUserAddressInfoDiv",data,false);
			setValues("applyUserWorkInfoDiv",data,false);
			setValues("applyUserIncomeInfoDiv",data,false);
			//setValues("applyUserUrgentConnectionUserInfoDiv",data,false);
			setValues("externaltCreditInfoDiv",data,false);
			setValues("vocationalCertificateInfoDiv",data,false);
			setValues("dealWithUserInfoDiv",data,false);
		},error:function(error){
			alert(error);
		}
	});
	
	
	$("[name='firstTrialBtn']").click(function(){
		debugger;
		var checkPass = true;
        var request_data={};
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
		alert("提交成功！");
		
		/**var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";		
		$.ajax({ 
			url: serviceAddress,
			datatype:'json',
			method:"post",
			data:{"module":"loanOrderService","method":"creditFirstTrial","request_data":JSON.stringify(request_data)},			
			success: function(data){
				debugger;
				removeTabItem("firstTrialTab","firstTrial");
				$("[name='firstTrialSearhBtn']").click();
			},error:function(error){
				alert(error);
			}
		});*/
		
	});
	
	
});