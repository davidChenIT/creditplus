//页面初始化加载函数
$(function(){
	debugger;
	//日期空间format
	datepickerRender("conditionDiv");
	//下拉框数据填充
	selectRender("conditionDiv");
	//构造grid下拉框需要的数据
	var applyStateSelectObj=gridSelectColRender("","",{},"code","name");
	//构造grid
	$("#firstTrialListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"loanOrderService","method":"getCreditFirstTrialListWithPage","request_data":{}},
			mtype: 'POST',
			height:220,
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
						   return "<a style='color:blue;' onclick=\"addTabItem('firstTrialTab','firstTrial','初审','/p2p-webapp/page/firstTrial.html','true','/p2p-webapp/js/credit/firstTrial.js','"+paramsStr+"');\">"+cellvalue+"</a>";
					}
				},
				{name:'name', index:'name',align:'center',"sortable":false},
				{name:'id_num', index:'id_num',align:'center',"sortable":false},
				{name:'loan_money', index:'loan_money',align:'center',"sortable":false},
				{name:'dateCount', index:'dateCount',align:'center',"sortable":false},
				{name:'loan_day', index:'loan_day',align:'center',"sortable":false},
				{name:'modifytime', index:'modifytime',align:'center',"sortable":false},
				{name:'apply_state', index:'apply_state',align:'center',
					"sortable":false,
					edittype:'select',
					editoptions:{value:applyStateSelectObj.jsonStr}
				},
				{name:'first_assign_user', index:'first_assign_user',align:'center',"sortable":false},
				{name:'review_assign_user', index:'review_assign_user',align:'center',"sortable":false}
			],
			pager: '#firstTrialListPager',
			rowNum:1,
			rowList:[10,20,30],
			viewrecords: true,
			sortable:false,
			emptyrecords:"没有数据！",
			jsonReader : {  
		        root:"griddata", 
		        page: "currpage", 
		        total: "totalpages",
		        records: "totalrecords"
		    },
		    onPaging:function(pgButton){
				 debugger;
				 var request_data = getValue("conditionDiv");
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton,grid,"firstTrialListPager",request_data);
			}	   
	});
	
	//查询按钮
    $("[name='firstTrialSearhBtn']").click(function(){
    	debugger;
        var request_data= getValue("conditionDiv");
        $("#firstTrialListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
	//重置按钮
    $("[name='firstTrialClearBtn']").click(function(){
        //调用重置函数
    	clearDomVal("conditionDiv");
    });
    
})