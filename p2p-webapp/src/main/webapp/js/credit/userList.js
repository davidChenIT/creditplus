//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#userListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"userService","method":"getUserListWithPage","request_data":{}},
			mtype: 'POST',
			autowidth:true,
			colNames:["操作","用户名称","是否可用","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false},
				{name:'username', index:'username',align:'center',"sortable":false},
				{name:'enable', index:'enable',align:'center',"sortable":false},
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
})