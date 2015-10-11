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
			setValues("creditApplayInfoDiv",data,false);
		},error:function(error){
			alert(error);
		}
	});
	
	
	
});