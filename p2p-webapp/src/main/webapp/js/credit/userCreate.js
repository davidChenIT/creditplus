//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
    $("#roleList4CreateGrid").jqGrid({
			autowidth:true,
			colNames:["角色","开始时间","结束时间"],
			colModel :[
				{name:'rolename', index:'rolename',align:'center',"sortable":false},
				{name:'start_date', index:'start_date',align:'center',"sortable":false},
				{name:'end_date', index:'end_date',align:'center',"sortable":false}
			],
			multiselect: true,
			sortable:false
	});
})