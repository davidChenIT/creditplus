//页面初始化加载函数
$(function(){
	debugger;
	
	var stateDicObj=gridSelectColRender("","",{"type":"enable"},"code","name",true);
	//构造grid
    $("#ruleListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"ruleService","method":"getRulesListWithPage"},
			mtype: 'POST',
			autowidth:true,
			height:285,
			colNames:["操作","","规则名称","是否可用","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   var paramsStr=JSON.stringify(rowObject);
					   if(paramsStr){
						   paramsStr=escape(paramsStr);
					   }
					   return "<span name='ruleEditSpan' class='ui-icon-edit' onclick=\"addTabItem('ruleTab','ruleUpdate','规则修改','/p2p-webapp/page/systemmng/ruleUpdate.html','true','/p2p-webapp/js/credit/ruleUpdate"+app_verion+".js','"+paramsStr+"');\"></span>";
					   
					}
				},
				{name:'rule_id', index:'rule_id',hidden:true,"sortable":false},
				{name:'rule_name', index:'rule_name',align:'center',"sortable":false},
				{name:'state', index:'state',align:'center',"sortable":false,formatter:"select", editoptions:{value:stateDicObj.jsonStr}},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#ruleListPager',
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
				 var rulename = $("div[tabid='ruleList']").find("input[name='rulename']").val();
				 var request_data={};
				 if(rulename){
					 request_data.rule_name=rulename;
				 }
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton,grid,"ruleListPager",request_data);
			 }	   
	});
    
    //输入用户名称，点击按钮进行过滤
    $("#searchRuleListBtn").click(function(){
        var rulename = $("input[name='rulename']").val();
        var request_data={};
        if(rulename){
        	request_data.rule_name=rulename;
        }
        $("#ruleListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的新增按钮
    $("[name='addRuleBtn']").click(function(){
    	addTabItem("ruleTab","ruleCreate","规则新增","/p2p-webapp/page/systemmng/ruleCreate.html",true,"/p2p-webapp/js/credit/ruleCreate"+app_verion+".js");   	
    });
       
    //点击用户列表中的删除按钮
    $("[name='delRuleBtn']").click(function(){
        debugger;
        var request_data=[];
        var grid=$("#ruleListGrid");
        var ids = grid.jqGrid('getGridParam','selarrrow');
        if(ids && ids.length>0){
        	for(var i=0;i<ids.length;i++){
        		var rowData =grid.jqGrid('getRowData',ids[i]);
        		request_data.push(parseInt(rowData.rule_id));
        	}
        	
        }else{
        	messageBox.createMessageDialog("提示","请选择你要删除的行！","","","warning");
        	return false;
        }
		//调用服务
		publicSaveAjax("ruleService","deleteRuleById",JSON.stringify(request_data),null,null,"#searchRuleListBtn");    	
    });
})