//页面初始化加载函数
$(function(){
	debugger;
	//日期空间format
	datepickerRender("tenderPublishedConditionDiv");
	//下拉框数据填充
	selectRender("tenderPublishedConditionDiv");
	//构造grid下拉框需要的数据
	var applyStateSelectObj=gridSelectColRender("","",{"type":"apply_state"},"code","name",true);
	//构造grid
 $("#tenderPublishedGrid").jqGrid({
	 url:serviceAddress,
		datatype: 'json',
		postData:{"module":"loanOrderService","method":"faBiaoListWithPage","request_data":{}},
		mtype: 'POST',
		height:205,
	autowidth:true,
	colNames:['操作','申请单编号','申请单编号','申请人姓名','申请人身份证号','金额','期次','时长','申请时间','信用分1','信用分2','状态'],
	colModel :[
		{name:'operate', index:'operate',align:'center',"sortable":false,
			formatter:function(cellvalue, options, rowObject){
				   debugger;
				   var loan_id=rowObject.loan_id;
				   return "<a class='a_ofWithdrawal' style='color:blue;' data-val='"+loan_id+"'>撤标</a>";
			}
			
		}, 
		{
			name:'loan_id', index:'loan_id',align:'center',"sortable":false, hidden:true
		},
		{	name:'loan_id_render', index:'loan_id_render', align:'center', "sortable":false,
			formatter:function(cellvalue, options, rowObject){
			   debugger;
			   var paramsStr=JSON.stringify(rowObject);
			   if(paramsStr){
				   paramsStr=escape(paramsStr);
			   }
			   return "<a style='color:blue;' onclick=\"addTabItem('tenderTab','tenderPublishedDetail','已发标信息','/p2p-webapp/page/tenderPublishedDetail.html','true','/p2p-webapp/js/credit/tenderPublishedDetail"+app_verion+".js','"+paramsStr+"');\">"+rowObject.loan_id+"</a>";
			}
		},
		{name:'name', index:'name',align:'center',"sortable":false},
		{name:'id_num', index:'id_num',align:'center',"sortable":false},
		{name:'loan_money', index:'loan_money',align:'center',"sortable":false},
		{name:'dateCount', index:'dateCount',align:'center',"sortable":false},
		{name:'loan_day', index:'loan_day',align:'center',"sortable":false},
		{name:'modifytime', index:'modifytime',align:'center',"sortable":false},
		{name:'credit_score1', index:'credit_score1',align:'center',"sortable":false},
		{name:'credit_score2', index:'credit_score2',align:'center',"sortable":false},
		{name:'apply_state', index:'apply_state',align:'center',
			"sortable":false,
			formatter:'select',
			editoptions:{value:applyStateSelectObj.jsonStr}
		}
	],
	pager: '#tenderPublishedPager',
	multiselect: true,
	rowNum:10,
	rowList:[10,20,30],
	viewrecords: true,
	emptyrecords:"没有数据！",
	jsonReader : {  

         root:"griddata",  

         page: "currpage",  

         total: "totalpages",  

         records: "totalrecords"

    },
    onSelectRow:function(rowId,isSelected){
		debugger;
		var grid=$("#tenderPublishedGrid");
		var loan_money=grid.jqGrid('getRowData',rowId).loan_money;
		var ofWithdrawalMoneySpan=$("div[tabid='tenderPublished']").find("span[name='ofWithdrawalMoney']");
		var totalMoney=parseInt((ofWithdrawalMoneySpan.text() || 0));
		if(isSelected){
			totalMoney+=parseInt(loan_money);
		}else{
			totalMoney-=parseInt(loan_money);
		}
		ofWithdrawalMoneySpan.text(totalMoney);
	},
	onPaging:function(pgButton){
		 debugger;
		 var request_data = getValue("tenderPublishedConditionDiv");
		 var  grid=$(this).jqGrid();
		 gridOnPaging(pgButton,grid,"tenderPublishedPager",request_data);
	}	 
  });
    
//点击grid的全选按钮
 $("div[tabid='tenderPublished']").find("#cb_tenderPublishedGrid").click(function(){
 	debugger;
 	var isChecked=$(this)[0].checked;
 	var ofWithdrawalMoneySpan=$("div[tabid='tenderPublished']").find("span[name='ofWithdrawalMoney']");
 	if(isChecked){
 		var grid=$("#tenderPublishedGrid");
 		var totalMoney=0;
 		var selectedIds = grid.jqGrid('getGridParam','selarrrow');
 		if(selectedIds && selectedIds.length>0){
 			for(var i=0;i<selectedIds.length;i++){
 				var loan_money=grid.jqGrid('getRowData',selectedIds[i]).loan_money;
 				totalMoney+=parseInt(loan_money);
 			}
 		}
 		ofWithdrawalMoneySpan.text(totalMoney);
 	}else{
 		ofWithdrawalMoneySpan.text(0);
 	}
 });
 

//撤标按钮
$("[name='ofWithdrawalBtn']").click(function(){
	debugger;
	  var grid=$("#tenderPublishedGrid");
	  var selectedIds = grid.jqGrid('getGridParam','selarrrow');
	  if(selectedIds && selectedIds.length>0){
		  var selectRowDataArray=[];
		  for(var i=0;i<selectedIds.length;i++){
			  var rowData = grid.jqGrid('getRowData',selectedIds[i]);
			  delete rowData['loan_id_render'];
			  rowData.apply_state = 8;//撤标状态
			  rowData.approve_content = "撤标!";
			  selectRowDataArray.push(rowData);
		  }
		  //调用撤标服务
		  $.ajax({ 
				url: serviceAddress,
				datatype: 'json',
				method:"post",
				data:{"module":"loanOrderService","method":"updateLoanOrderState","request_data":JSON.stringify(selectRowDataArray)},			
				success: function(data){
					//removeTabItem("userTab","userCreate");
					$("[name=tenderPublishedSearchBtn]").click();
					var ofWithdrawalMoneySpan=$("div[tabid='tenderPublished']").find("span[name='ofWithdrawalMoney']");
					$(ofWithdrawalMoneySpan).text('0');
					messageBox.createMessageDialog("提示","撤标成功！","","","true");
				},error:function(error){
					messageBox.createMessageDialog("提示","撤标失败！","","","error");
				}
		  });
		  
		  
	  }else{
		  messageBox.createMessageDialog("提示","请至少选择一条数据进行撤标！","","","warning");
	  }
	  
});

//grid里面的撤标动作
$("div[tabid='tenderPublished']").on("click",".a_ofWithdrawal",function(){
	debugger;
	var ofWithdrawalData=[];
	var rowData={};
	rowData.loan_id=$(this).attr("data-val");
	rowData.apply_state=8;
	rowData.approve_content = "撤标!";
	ofWithdrawalData.push(rowData);
	//调用撤标服务
	  $.ajax({ 
			url: serviceAddress,
			datatype: 'json',
			method:"post",
			data:{"module":"loanOrderService","method":"updateLoanOrderState","request_data":JSON.stringify(ofWithdrawalData)},			
			success: function(data){
				$("[name=tenderPublishedSearchBtn]").click();
				var ofWithdrawalMoneySpan=$("div[tabid='tenderPublished']").find("span[name='ofWithdrawalMoney']");
				$(ofWithdrawalMoneySpan).text('0');
				messageBox.createMessageDialog("提示","撤标成功！","","","true");
			},error:function(error){
				messageBox.createMessageDialog("提示","撤标失败！","","","error");
			}
	  });
});

//查询按钮
$("[name='tenderPublishedSearchBtn']").click(function(){
    var request_data = getValue("tenderPublishedConditionDiv");
    $("#tenderPublishedGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:{'request_data':JSON.stringify(request_data)}, //发送数据
        page:1,
        rowNum:10
    }).trigger("reloadGrid"); //重新载入
    var ofWithdrawalMoneySpan=$("div[tabid='tenderPublished']").find("span[name='ofWithdrawalMoney']");
	$(ofWithdrawalMoneySpan).text('0');
});
	
	//重置按钮
$("[name='clearTenderPublishedConditionBtn']").click(function(){
    //调用重置函数
	clearDomVal("tenderPublishedConditionDiv");
});
    
})