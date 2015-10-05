//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
    $("#userListGrid").jqGrid({
			/**url:'example.php',
			datatype: 'xml',
			mtype: 'GET',*/
			autowidth:true,
			colNames:['操作','用户名称'],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center'},
				{name:'username', index:'username',align:'center'}
			],
			pager: '#userListPager',
			rowNum:10,
			rowList:[10,20,30],
			viewrecords: true
			//caption: 'My first grid'
	});
})