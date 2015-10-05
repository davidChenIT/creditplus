//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
    $("#userListGrid").jqGrid({
			url:'services/process',
			datatype: 'json',
			data:{"module":"userService","method":"getUserListWithPage","request_data":{}},
			mtype: 'psot',
			autowidth:true,
			colNames:['操作','用户名称'],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',width:"20%"},
				{name:'username', index:'username',align:'center',width:"80%"}
			],
			pager: '#userListPager',
			rowNum:10,
			rowList:[10,20,30],
			viewrecords: true
			//caption: 'My first grid'
	});
})