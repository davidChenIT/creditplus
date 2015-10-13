//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
 $("#tenderMngListGrid").jqGrid({
	 url:serviceAddress,
		datatype: 'json',
		postData:{"module":"loanOrderService","method":"getCreditReviewListWithPage","request_data":{}},
		mtype: 'POST',
	autowidth:true,
	colNames:['申请单编号','申请人姓名','申请人身份证号','金额','期次','时长','申请时间','申请单状态','初审人','复审人'],
	colModel :[
		{
			name:'loan_id', index:'loan_id',align:'center',"sortable":false,
			formatter:function(cellvalue, options, rowObject){
				   debugger;
				   var paramsStr=JSON.stringify(rowObject);
				   if(paramsStr){
					   paramsStr=paramsStr.replace(/"/g,"@#_@#");
				   }
				   return "<a style='color:blue;' onclick=\"addTabItem('tenderTab','rankPoolDetail','防欺诈详细','/p2p-webapp/page/rankPoolDetail.html','false','/p2p-webapp/js/credit/review.js','"+paramsStr+"');\">"+cellvalue+"</a>";
			}
		},
		{name:'name', index:'name',align:'center',"sortable":false},
		{name:'id_num', index:'id_num',align:'center',"sortable":false},
		{name:'loan_money', index:'loan_money',align:'center',"sortable":false},
		{name:'dateCount', index:'dateCount',align:'center',"sortable":false},
		{name:'loan_day', index:'loan_day',align:'center',"sortable":false},
		{name:'modifytime', index:'modifytime',align:'center',"sortable":false},
		{name:'apply_state', index:'apply_state',align:'center',"sortable":false},
		{name:'first_assign_user', index:'first_assign_user',align:'center',"sortable":false},
		{name:'review_assign_user', index:'review_assign_user',align:'center',"sortable":false}
	],
	pager: '#tenderMngListPager',
	multiselect: true,
	rowNum:10,
	rowList:[10,20,30],
	sortname: 'invid',
	sortorder: 'desc',
	viewrecords: true,
	emptyrecords:"没有数据！",
	jsonReader : {  

         root:"griddata",  

         page: "currpage",  

         total: "totalpages",  

         records: "totalrecords"

    }
	//caption: 'My first grid'
	});
})