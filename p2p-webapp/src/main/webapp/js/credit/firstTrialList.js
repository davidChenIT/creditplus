//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
	$("#firstTrialListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"loanOrderService","method":"getLoanOrderListWithPage","request_data":{}},
			mtype: 'POST',
			autowidth:true,
			colNames:["申请编号","申请人姓名","申请人身份证号","金额","期次","时长","申请时间","申请单状态","初审人","复审人"],
			colModel :[
				{
					name:'loan_id', index:'loan_id',align:'center',"sortable":false,
					formatter:function(cellvalue, options, rowObject){
						   debugger;
						   var paramsStr=JSON.stringify(rowObject);
						   if(paramsStr){
							   paramsStr=paramsStr.replace(/"/g,"@#_@#");
						   }
						   return "<a onclick=\"addTabItem('firstTrialTab','firstTrial','初审','/p2p-webapp/page/firstTrial.html','false','/p2p-webapp/js/credit/firstTrial.js','"+paramsStr+"');\">"+cellvalue+"</a>";
					}
				},
				{name:'name', index:'name',align:'center',"sortable":false},
				{name:'id_num', index:'id_num',align:'center',"sortable":false},
				{name:'loan_money', index:'loan_money',align:'center',"sortable":false},
				{name:'dateCount', index:'dateCount',align:'center',"sortable":false},
				{name:'loan_day', index:'loan_day',align:'center',"sortable":false},
				{name:'start_day', index:'start_day',align:'center',"sortable":false},
				{name:'state', index:'state',align:'center',"sortable":false},
				{name:'first_approver', index:'first_approver',align:'center',"sortable":false},
				{name:'review_approver', index:'review_approver',align:'center',"sortable":false}
			],
			pager: '#firstTrialListPager',
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
})