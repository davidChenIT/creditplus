//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#userListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"userService","method":"getUserListWithPage"},
			mtype: 'POST',
			autowidth:true,
			colNames:["操作","用户名称","是否可用","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false},
				{name:'username', index:'username',align:'center',"sortable":false},
				{name:'enable', index:'enable',align:'center',"sortable":false,formatter:"select", editoptions:{value:"0:不可用;1:可用"}},
				{name:'createdBy', index:'createdBy',align:'center',"sortable":false},
				{name:'createdDate', index:'createdDate',align:'center',"sortable":false},
				{name:'lastUpdatedBy', index:'lastUpdatedBy',align:'center',"sortable":false},
				{name:'lastUpdatedDate', index:'lastUpdatedDate',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#userListPager',
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

    //输入用户名称，点击按钮进行过滤
    $("#serrchUserListBtn").click(function(){
        var username = $("input[name='username']").val();
        var request_data={};
        if(username){
        	request_data.username=username;
        }
        $("#userListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':request_data}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
})