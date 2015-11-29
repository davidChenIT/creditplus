//页面初始化加载函数
$(function(){
	debugger;
	//日期空间format
	datepickerRender("contractConditionDiv");
	//下拉框数据填充
	selectRender("contractConditionDiv");
	//构造grid
    $("#contractGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"contractService","method":"getContractListWithPage","request_data":{}},
			mtype: 'POST',
			height:205,
			autowidth:true,
			colNames:['合同编号','借款金额','借款人姓名','投资人姓名','合同生产时间'],
			colModel :[
				{	name:'contract_id', index:'contract_id', align:'center', "sortable":false,
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   var paramsStr=JSON.stringify(rowObject);
					   if(paramsStr){
						   paramsStr=escape(paramsStr);
					   }
					   return "<a style='color:blue;' onclick=\"\">"+rowObject.contract_id+"</a>";
					}
				},
				{name:'loan_money', index:'loan_money', align:'center',"sortable":false},
				{name:'loan_name', index:'loan_name',align:'center',"sortable":false},,
				{name:'investor', index:'investor',align:'center',"sortable":false},
				{name:'sign_time', index:'sign_time',align:'center',"sortable":false}
			],
			pager: '#contractPager',
			multiselect: true,
			rowNum:10,
			rowList:[10,20,30],
			sortable:true,
			viewrecords: true,
			emptyrecords:"没有数据！",
			jsonReader : {  
		
		         root:"griddata",  
		
		         page: "currpage",  
		
		         total: "totalpages",  
		
		         records: "totalrecords"
		
		    },
			onPaging:function(pgButton){
				 debugger;
				 var request_data = getValue("contractConditionDiv");
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton, grid, "contractPager", request_data);
			}	 
	});
    
//查询按钮
  $("[name='contractSeachBtn']").click(function(){
      var request_data = getValue("contractConditionDiv");
      $("#contractGrid").jqGrid('setGridParam',{  
          datatype:'json',  
          postData:{'request_data':JSON.stringify(request_data)}, //发送数据
          page:1,
          rowNum:10
      }).trigger("contractGrid"); //重新载入
  	
  });
	
	//重置按钮
  $("[name='clearContractConditionBtn']").click(function(){
      //调用重置函数
  	clearDomVal("contractConditionDiv");
  });
})