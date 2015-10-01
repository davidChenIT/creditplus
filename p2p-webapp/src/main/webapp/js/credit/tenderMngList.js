//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
 $("#rankPoolGrid").jqGrid({
	/**url:'example.php',
	datatype: 'xml',
	mtype: 'GET',*/
	autowidth:true,
	colNames:['申请单编号','申请人姓名','申请人身份证号','金额','期次','时长','申请时间','申请单状态','初审人','复审人'],
	colModel :[
		{name:'applay_code', index:'applay_code',align:'center'},
		{name:'applay_user', index:'applay_user',align:'center'},
		{name:'applay_user_card', index:'applay_user_card',align:'center'},
		{name:'money', index:'money',align:'center'},
		{name:'qici', index:'qici',align:'center'},
		{name:'time', index:'time',align:'center'},
		{name:'applay_date', index:'applay_date',align:'center'},
		{name:'applay_status', index:'applay_status',align:'center'},
		{name:'approve_first_user', index:'approve_first_user',align:'center'},
		{name:'approve_last_user', index:'approve_last_user',align:'center'}
	],
	pager: '#rankPoolPager',
	rowNum:10,
	rowList:[10,20,30],
	viewrecords: true
	//caption: 'My first grid'
	});
})