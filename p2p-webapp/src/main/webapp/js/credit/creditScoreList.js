//页面初始化加载函数
$(function(){
	debugger;
	
	//构造grid
	var modelNameDicObj=gridSelectColRender("","",{"type":"model_name"},"code","name",true);
	var dimensionNameDicObj=gridSelectColRender("","",{"type":"dimension_name"},"code","name",true);
	
    $("#creditScoreListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"creditScoreService","method":"getCreditScoreListWithPage"},
			mtype: 'POST',
			autowidth:true,
			height:285,
			colNames:["操作","","模型名称","维度","权重","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   var paramsStr=JSON.stringify(rowObject);
					   if(paramsStr){
						   paramsStr=escape(paramsStr);
					   }
					   return "<span name='creditScoreEditSpan' class='ui-icon-edit' onclick=\"addTabItem('creditScoreTab','creditScoreUpdate','信用评分修改','/p2p-webapp/page/systemmng/creditScoreUpdate.html','true','/p2p-webapp/js/credit/creditScoreUpdate.js','"+paramsStr+"');\"></span>";
					}
				},
				{name:'score_id', index:'score_id',hidden:true,"sortable":false},
				{name:'model_name', index:'model_name',align:'center',"sortable":false,formatter:"select", editoptions:{value:modelNameDicObj.jsonStr}},
				{name:'dimension_name', index:'dimension_name',align:'center',"sortable":false,formatter:"select", editoptions:{value:dimensionNameDicObj.jsonStr}},
				{name:'proportion', index:'proportion',align:'center',"sortable":false},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#creditScoreListPager',
			multiselect: true,
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

		     },
		     onPaging:function(pgButton){
				 debugger;
				 var rulename = $("div[tabid='creditScoreList']").find("input[name='rulename']").val();
				 var request_data={};
				 if(rulename){
					 request_data.rule_name=rulename;
				 }
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton,grid,"creditScoreListPager",request_data);
			 }	   
	});
    
    //输入用户名称，点击按钮进行过滤
    $("#searchCreditScoreListBtn").click(function(){
        var model_name = $("input[name='model_name']").val();
        var request_data={};
        if(model_name){
        	request_data.model_name=model_name;
        }
        $("#creditScoreListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的新增按钮
    $("[name='addCreditScoreBtn']").click(function(){
    	addTabItem("creditScoreTab","creditScoreCreate","信用评分新增","/p2p-webapp/page/systemmng/creditScoreCreate.html",true,"/p2p-webapp/js/credit/creditScoreCreate.js");   	
    });
       
    //点击用户列表中的删除按钮
    $("[name='delCreditScoreBtn']").click(function(){
        debugger;
        var request_data=[];
        var grid=$("#creditScoreListGrid");
        var ids = grid.jqGrid('getGridParam','selarrrow');
        if(ids && ids.length>0){
        	for(var i=0;i<ids.length;i++){
        		var rowData =grid.jqGrid('getRowData',ids[i]);
        		request_data.push(parseInt(rowData.score_id));
        	}
        	
        }else{
        	messageBox.createMessageDialog("提示","请选择你要删除的行！","","","warning");
        	return false;
        }
		//调用服务
		publicSaveAjax("creditScoreService","deleteCreditScore",JSON.stringify(request_data),null,null,"#searchCreditScoreListBtn");    	
    });
})