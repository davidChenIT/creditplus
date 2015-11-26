//页面初始化加载函数
$(function(){
	debugger;
	var enableDicObj=gridSelectColRender("","",{"type":"enable"},"code","name",true);
	//构造grid
    $("#roleListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"roleService","method":"getRoleListWithPage"},
			mtype: 'POST',
			autowidth:true,
			height:285,
			colNames:["操作","角色id","角色名称","是否可用","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
						   debugger;
						   debugger;
						   var paramsStr=JSON.stringify(rowObject);
						   if(paramsStr){
							   paramsStr=escape(paramsStr);
						   }
						   return "<span name='ruleEditSpan' class='ui-icon-edit' onclick=\"addTabItem('roleTab','roleUpdate','角色修改','/p2p-webapp/page/systemmng/roleUpdate.html','true','/p2p-webapp/js/credit/roleUpdate.js','"+paramsStr+"');\"></span>";
					}
				},
				{name:'roleId', index:'roleId',align:'center',hidden:true},
				{name:'roleName', index:'roleName',align:'center',"sortable":false},
				{name:'enable', index:'enable',align:'center',"sortable":false,formatter:"select", editoptions:{value:enableDicObj.jsonStr}},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#roleListPager',
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
				 var rolename = $("div[tabid='roleList']").find("input[name='rolename']").val();
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton,grid,"roleListPager",{"roleName":rolename});
			 }	    
	});
    
    //输入用户名称，点击按钮进行过滤
    $("#searchRoleListBtn").click(function(){
        var rolename = $("input[name='rolename']").val();
        var request_data={};
        if(rolename){
        	request_data.roleName=rolename;
        }
        $("#roleListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的新增按钮
    $("[name='addRoleBtn']").click(function(){
    	addTabItem("roleTab","roleCreate","角色新增","/p2p-webapp/page/systemmng/roleCreate.html",true,"/p2p-webapp/js/credit/roleCreate.js");   	
    });
       
    //点击用户列表中的删除按钮
    $("[name='delRoleBtn']").click(function(){
    	debugger;
    	var request_data=[];
        var grid=$("#roleListGrid");
        var ids = grid.jqGrid('getGridParam','selarrrow');
        if(ids && ids.length>0){
        	for(var i=0;i<ids.length;i++){
        		var rowData =grid.jqGrid('getRowData',ids[i]);
        		request_data.push(parseInt(rowData.roleId));
        	}
        	
        }else{
        	messageBox.createMessageDialog("提示","请选择你要删除的行！","","","warning");
        	return false;
        }
		//调用服务
		publicSaveAjax("roleService","deleteRoleById",JSON.stringify(request_data),null,null,"#searchRoleListBtn");    	
    });
})