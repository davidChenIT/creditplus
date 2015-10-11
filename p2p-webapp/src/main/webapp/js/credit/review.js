$(function(){
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
	$("#reviewLogGrid").jqGrid({
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