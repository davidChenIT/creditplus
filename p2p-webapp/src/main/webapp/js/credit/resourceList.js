//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#resourceListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"resourceService","method":"getResourceListWithPage"},
			mtype: 'POST',
			autowidth:true,
			colNames:["操作","资源名称","优先级","URL","资源类型","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   return "<span name='resourceEditSpan' class='ui-icon-edit' data-val='"+rowObject.resourceId+"'></span>";
					}
				},
				{name:'resourceName', index:'resourceName',align:'center',"sortable":false},
				{name:'priority', index:'priority',align:'center',"sortable":false,formatter:"select", editoptions:{value:"0:不可用;1:可用"}},
				{name:'url', index:'url',align:'center',"sortable":false},
				{name:'resourceType', index:'resourceType',align:'center',"sortable":false},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#resourceListPager',
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

		     }
	});
    
    
    //给grid列中的修改图标添加点击事件
    $("div[name='resourceTab']").on("click",".ui-icon-edit",function(){
    	debugger;
    	var resourceId=$(this).attr("data-val");
    	var resourceUpdate=$("div[name='resourceTab']").find("li[tabid='resourceUpdate']");
    	if(resourceUpdate && resourceUpdate.length>0){
    		$("div[name='resourceTab']").find("li[tabid='resourceUpdate']").remove();
    		$("div[name='resourceTab']").find("div[tabid='resourceUpdate']").remove();
    	}
    	$("div[name='resourceTab']").find(".tabs-head li").attr("class","");
    	var resourceUpdateLi='<li tabid="resourceUpdate" class="tabs-selected"><span>修改用户</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='resourceTab']").find(".tabs-head ul").append(resourceUpdateLi);
    	$(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
    	
    	var jsFileUrl="/p2p-webapp/js/credit/resourceUpdate.js";
    	$("script[src='"+jsFileUrl+"']").remove();
		var requestUrl="http://"+window.location.host+"/p2p-webapp/page/systemmng/resourceUpdate.html";
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='resourceTab']").find(".tabs-body").append(data);
					$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
				}
			},error:function(error){
				$("div[name='resourceTab']").find(".tabs-body").append('<div tabid="resourceUpdate" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
    });

    //输入用户名称，点击按钮进行过滤
    $("#searchResourceListBtn").click(function(){
        var resourcename = $("input[name='resourcename']").val();
        var request_data={};
        if(resourcename){
        	request_data.resourcename=resourcename;
        }
        $("#resourceListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的新增按钮
    $("[name='addResourceBtn']").click(function(){
    	addTabItem("resourceTab","resourceCreate","角色新增","/p2p-webapp/page/systemmng/resourceCreate.html",true,"/p2p-webapp/js/credit/resourceCreate.js");   	
    });
       
    //点击用户列表中的删除按钮
    $("[name='delResourceBtn']").click(function(){
    	
    	
    });
})