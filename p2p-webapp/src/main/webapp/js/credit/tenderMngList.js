//页面初始化加载函数
$(function(){
	debugger;
	//日期空间format
	datepickerRender("rankPollConditionDiv");
	//下拉框数据填充
	selectRender("rankPollConditionDiv");
	//构造grid
    $("#rankPoolGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"loanOrderService","method":"rankingPoolListWithPage","request_data":{}},
			mtype: 'POST',
			height:220,
			autowidth:true,
			colNames:['申请单编号','申请单编号','申请人姓名','申请人身份证号','金额','期次','时长','申请时间','信用分1','信用分2','排名'],
			colModel :[
				{
					name:'loan_id', index:'loan_id',align:'center',"sortable":false, hidden:true
				},
				{	name:'loan_id_render', index:'loan_id', align:'center', "sortable":false,
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   var paramsStr=JSON.stringify(rowObject);
					   if(paramsStr){
						   paramsStr=paramsStr.replace(/"/g,"@#_@#");
					   }
					   return "<a style='color:blue;' onclick=\"addTabItem('tenderTab','rankPoolDetail','排名池详细信息','/p2p-webapp/page/rankPoolDetail.html','false','/p2p-webapp/js/credit/rankPoolDetail.js','"+paramsStr+"');\">"+rowObject.loan_id+"</a>";
					}
				},
				{name:'name', index:'name',align:'center',"sortable":false},
				{name:'id_num', index:'id_num',align:'center',"sortable":false},
				{name:'loan_money', index:'loan_money',align:'center',"sortable":false},
				{name:'dateCount', index:'dateCount',align:'center',"sortable":false},
				{name:'loan_day', index:'loan_day',align:'center',"sortable":false},
				{name:'modifytime', index:'modifytime',align:'center',"sortable":false},
				{name:'creditFraction1', index:'creditFraction1',align:'center',"sortable":false},
				{name:'creditFraction2', index:'creditFraction2',align:'center',"sortable":false},
				{name:'rank', index:'rank',align:'center',"sortable":false}
			],
			pager: '#rankPoolPager',
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
		    onSelectRow:function(rowId,isSelected){
				debugger;
				var grid=$("#rankPoolGrid");
				var loan_money=grid.jqGrid('getRowData',rowId).loan_money;
				var publishTenderMoneySpan=$("div[tabid='rankPool']").find("span[name='publishTenderMoney']");
				var totalMoney=parseInt((publishTenderMoneySpan.text() || 0));
				if(isSelected){
					totalMoney+=parseInt(loan_money);
				}else{
					totalMoney-=parseInt(loan_money);
				}
				publishTenderMoneySpan.text(totalMoney);
			},
			onPaging:function(pgButton){
				 debugger;
				 var request_data = getValue("rankPollConditionDiv");
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton,grid,"rankPoolPager",request_data);
			}	 
	});
    
    //点击grid的全选按钮
    $("div[tabid='rankPool']").find("#cb_rankPoolGrid").click(function(){
    	debugger;
    	var isChecked=$(this)[0].checked;
    	var publishTenderMoneySpan=$("div[tabid='rankPool']").find("span[name='publishTenderMoney']");
    	if(isChecked){
    		var grid=$("#rankPoolGrid");
    		var totalMoney=0;
    		var selectedIds = grid.jqGrid('getGridParam','selarrrow');
    		if(selectedIds && selectedIds.length>0){
    			for(var i=0;i<selectedIds.length;i++){
    				var loan_money=grid.jqGrid('getRowData',selectedIds[i]).loan_money;
    				totalMoney+=parseInt(loan_money);
    			}
    		}
    		publishTenderMoneySpan.text(totalMoney);
    	}else{
    		publishTenderMoneySpan.text(0);
    	}
    });
    
 
   //发标按钮
  $("[name='publishTenderBtn']").click(function(){
	  var grid=$("#rankPoolGrid");
	  var selectedIds = grid.jqGrid('getGridParam','selarrrow');
	  if(selectedIds && selectedIds.length>0){
		  var selectRowDataArray=[];
		  for(var i=0;i<selectedIds.length;i++){
			  var rowData = grid.jqGrid('getRowData',selectedIds[i]);
			  delete rowData['loan_id_render'];
			  rowData.apply_state = 7;//发标状态
			  rowData.approve_content = "发标";
			  selectRowDataArray.push(rowData);
		  }
		  //调用发标服务
		  $.ajax({ 
				url: serviceAddress,
				datatype: 'json',
				method:"post",
				data:{"module":"loanOrderService","method":"updateLoanOrderState","request_data":JSON.stringify(selectRowDataArray)},			
				success: function(data){
					removeTabItem("userTab","userCreate");
					$("[name=rankPollSeachBtn]").click();
				},error:function(error){
				}
		  });
		  messageBox.createMessageDialog("提示","发标！","","","warning");
		  
	  }else{
		  messageBox.createMessageDialog("提示","请至少选择一条申请单进行发标！","","","warning");
	  }
	  
  });
  
  
//查询按钮
  $("[name='rankPollSeachBtn']").click(function(){
      var request_data = getValue("conditionDiv");
      $("#rankPoolGrid").jqGrid('setGridParam',{  
          datatype:'json',  
          postData:{'request_data':JSON.stringify(request_data)}, //发送数据
          page:1,
          rowNum:10
      }).trigger("reloadGrid"); //重新载入
  	
  });
	
	//重置按钮
  $("[name='clearRankPollConditionBtn']").click(function(){
      //调用重置函数
  	clearDomVal("rankPollConditionDiv");
  });
})