//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
 $("#tenderMngListGrid").jqGrid({
	 url:serviceAddress,
		datatype: 'json',
		postData:{"module":"loanOrderService","method":"getCreditFirstTrialListWithPage","request_data":{}},
		mtype: 'POST',
	autowidth:true,
	colNames:['操作','申请单编号','申请人姓名','申请人身份证号','信用等级','金额','期次','时长','银行卡开户行','卡号'],
	colModel :[
		{name:'operate', index:'operate',align:'center',"sortable":false,
			formatter:function(cellvalue, options, rowObject){
				   debugger;
				   var loan_id=rowObject.loan_id;
				   return "<a name='a_makeTender' style='color:blue;' data-val='"+loan_id+"'>投标</a>";
			}
			
		},   
		{
			name:'loan_id', index:'loan_id',align:'center',"sortable":false,
		},
		{name:'name', index:'name',align:'center',"sortable":false},
		{name:'id_num', index:'id_num',align:'center',"sortable":false},
		{name:'creditGrade', index:'creditGrade',align:'center',"sortable":false},
		{name:'loan_money', index:'loan_money',align:'center',"sortable":false},
		{name:'dateCount', index:'dateCount',align:'center',"sortable":false},
		{name:'loan_day', index:'loan_day',align:'center',"sortable":false},
		{name:'cardAccountBank', index:'cardAccountBank',align:'center',"sortable":false},
		{name:'bankCardNum', index:'bankCardNum',align:'center',"sortable":false}
	],
	pager: '#tenderMngListPager',
//	multiselect: true,
	rowNum:10,
	rowList:[10,20,30],
	sortname: 'invid',
	sortorder: 'desc',
	viewrecords: true,
	emptyrecords:"没有数据！",
	jsonReader : {  

         root:"griddata",  

         page: "currpage",  

         total: "totalpages",  

         records: "totalrecords"

    }
	//caption: 'My first grid'
	});
 
//查询按钮
 $("[name='makeTenderSearchBtn']").click(function(){
     var request_data={};
     $("#tenderMngListGrid").jqGrid('setGridParam',{  
         datatype:'json',  
         postData:{'request_data':JSON.stringify(request_data)}, //发送数据
         page:1,
         rowNum:10
     }).trigger("reloadGrid"); //重新载入
 	
 });
	
	//重置按钮
 $("[name='clearMakeTenderConditionBtn']").click(function(){
     //调用重置函数
 	clearDomVal("makeTenderConditionDiv");
 });
})