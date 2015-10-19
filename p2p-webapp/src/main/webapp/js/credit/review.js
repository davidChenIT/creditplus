
$(function(){
	debugger;
	var paramsObj=$("div[name='reviewTab']").find("li[tabid='review']").data();
	var loan_id=paramsObj.loan_id || "";
	//查询详细信息，并赋值
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		data:{"module":"loanOrderService",
			"method":"getCreditReviewDetailByLoanId",
			"request_data":JSON.stringify({"loan_id":loan_id,"approve_content":"开始复审","apply_state":4})
		},			
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
	
	//查询用户紧急联系人
	var user_id=paramsObj.user_id || "";
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		data:{"module":"urgentContactorService",   
			"method":"getListByUserId",
			"request_data":JSON.stringify({"user_id":user_id})
		},			
		success: function(data){
			debugger;
			
			//setValues("applyUserUrgentConnectionUserInfoDiv",data,false);
		},error:function(error){
			alert(error);
		}
	});
	
	//构造grid
	$("#reviewLogGrid").jqGrid({
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
		if(checkPass){
			$("div[name='firstTrial']").find("input").each(function(i,input){
				var inputName=$(input).attr("name");
				var inputValue=$(input).val();
				request_data[inputName]=inputValue;
			});
			debugger;
			//提交
			$.ajax({ 
				url: serviceAddress,
				datatype:'json',
				method:"post",
				data:{"module":"loanOrderService","method":"creditReview","request_data":JSON.stringify(request_data)},			
				success: function(data){
					debugger;
					removeTabItem("reviewTab","review");
					$("[name='reviewSearchBtn']").click();
				},error:function(error){
					alert(error);
				}
			});
		}else{
			alert("校验失败！");
			return false;
		}
		
	});
	
	$("[name='rejectBtn']").click(function(){
		debugger;
		var request_data={"loan_id":$("#review").find("span[name='loan_id']").text(),"user_id":user_id,"approve_content":"驳回，用户身份证不正确","apply_state":2};
		var checkPass = true;
		if(checkPass){
			$("div[name='firstTrial']").find("input").each(function(i,input){
				var inputName=$(input).attr("name");
				var inputValue=$(input).val();
				request_data[inputName]=inputValue;
			});
			debugger;
			//提交
			$.ajax({ 
				url: serviceAddress,
				datatype:'json',
				method:"post",
				data:{"module":"loanOrderService","method":"creditReviewReject","request_data":JSON.stringify(request_data)},			
				success: function(data){
					debugger;
					removeTabItem("reviewTab","review");
					$("[name='reviewSearchBtn']").click();
				},error:function(error){
					alert(error);
				}
			});
		}else{
			alert("校验失败！");
			return false;
		}
		
	});
	
});