//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
    $("#userListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"userService","method":"getUserListWithPage"},
			mtype: 'POST',
			autowidth:true,
			height:290,
			colNames:["操作","用户名称","是否可用","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'userId', index:'userId',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   var paramsStr=JSON.stringify(rowObject);
					   if(paramsStr){
						   paramsStr=paramsStr.replace(/"/g,"@#_@#");
					   }
					   return "<span data-val='" + rowObject.userId + "' class='ui-icon-edit' onclick=\"addTabItem('userTab','userUpdate','用户修改','/p2p-webapp/page/systemmng/userUpdate.html','true','/p2p-webapp/js/credit/userUpdate.js','"+paramsStr+"');\"></span>";
					}
				},
				{name:'username', index:'username',align:'center',"sortable":false},
				{name:'enable', index:'enable',align:'center',"sortable":false,formatter:"select", editoptions:{value:"0:不可用;1:可用"}},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#userListPager',
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
				 var username = $("div[tabid='userList']").find("input[name='username']").val();
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton,grid,"userListPager",{"username":username});
			 }	    
	});
    
    //输入用户名称，点击按钮进行过滤
    $("#searchUserListBtn").click(function(){
        var username = $("input[name='username']").val();
        var request_data={};
        if(username){
        	request_data.username=username;
        }
        $("#userListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
       
    //点击用户列表中的新增按钮
    $("[name='addUserBtn']").click(function(){
    	addTabItem("userTab","userCreate","用户新增","/p2p-webapp/page/systemmng/userCreate.html",true,"/p2p-webapp/js/credit/userCreate.js");
    });
    
    //点击用户列表中的删除按钮
    $("[name='delUserBtn']").click(function(){
    	debugger;
        var request_data=[];
    	var rowids = $("#userListGrid").jqGrid('getDataIDs');
    	for(var i=0;i<rowids.length;i++){
    		var isChecked = $("#userListGrid").find("tr[id='"+rowids[i]+"']").find("input[type='checkbox']").is(':checked');
    		if(isChecked){
          	    var dataVal = $("#userListGrid").find("tr[id='"+rowids[i]+"']").find("span").attr("data-val");
          	    request_data.push(dataVal*1);    			
    		}
      	}
    	
    	if(request_data.length <=0){
    		return;
    	}
		//调用服务
		publicSaveAjax("userService","deleteUserById",JSON.stringify(request_data),"userTab","userCreate","#searchUserListBtn");
    });
})