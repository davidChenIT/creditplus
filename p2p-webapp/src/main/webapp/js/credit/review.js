$(function(){
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	
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
			"request_data":JSON.stringify({"loan_id":loan_id,"approve_content":"开始复审","apply_state":3})
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
		 colNames:['处理时间','处理人','备注'],
		 colModel :[
				{name:'applay_date', index:'applay_date',align:'center'},
				{name:'applay_user', index:'applay_user',align:'center'},
				{name:'remark', index:'remark',align:'center'}
			],
			pager: '#reviewLogPager',
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