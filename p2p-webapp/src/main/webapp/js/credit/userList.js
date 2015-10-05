//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#userListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"userService","method":"getUserListWithPage","request_data":{}},
			mtype: 'psot',
			autowidth:true,
			colNames:['操作','用户名称'],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',width:"10%","sortable":false},
				{name:'username', index:'username',align:'center',width:"90%","sortable":false}
			],
			pager: '#userListPager',
			rowNum:10,
			rowList:[10,20,30],
			viewrecords: true
	});
})