//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#catalogListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"catalogService","method":"getCatalogListWithPage"},
			mtype: 'POST',
			autowidth:true,
			colNames:["操作","栏目名称","父栏目名称","URL","顺序","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   return "<span name='catalogEditSpan' class='ui-icon-edit' data-val='"+rowObject.catalogId+"'></span>";
					}
				},
				{name:'catalogName', index:'catalogName',align:'center',"sortable":false},
				{name:'parentName', index:'parentName',align:'center',"sortable":false},
				{name:'url', index:'url',align:'center',"sortable":false},
				{name:'orderNumber', index:'orderNumber',align:'center',"sortable":false},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#catalogListPager',
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
    $("div[name='catalogTab']").on("click",".ui-icon-edit",function(){
    	debugger;
    	var catalogId=$(this).attr("data-val");
    	var catalogUpdate=$("div[name='catalogTab']").find("li[tabid='catalogUpdate']");
    	if(catalogUpdate && catalogUpdate.length>0){
    		$("div[name='catalogTab']").find("li[tabid='catalogUpdate']").remove();
    		$("div[name='catalogTab']").find("div[tabid='catalogUpdate']").remove();
    	}
    	$("div[name='catalogTab']").find(".tabs-head li").attr("class","");
    	var catalogUpdateLi='<li tabid="catalogUpdate" class="tabs-selected"><span>修改用户</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='catalogTab']").find(".tabs-head ul").append(catalogUpdateLi);
    	$(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
    	
    	var jsFileUrl="/p2p-webapp/js/credit/catalogUpdate.js";
    	$("script[src='"+jsFileUrl+"']").remove();
		var requestUrl="http://"+window.location.host+"/p2p-webapp/page/systemmng/catalogUpdate.html";
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='catalogTab']").find(".tabs-body").append(data);
					$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
				}
			},error:function(error){
				$("div[name='catalogTab']").find(".tabs-body").append('<div tabid="catalogUpdate" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
    });

    //输入用户名称，点击按钮进行过滤
    $("#searchCatalogListBtn").click(function(){
        var catalogname = $("input[name='catalogname']").val();
        var request_data={};
        if(catalogname){
        	request_data.catalogname=catalogname;
        }
        $("#catalogListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的新增按钮
    $("[name='addCatalogBtn']").click(function(){
    	addTabItem("catalogTab","catalogCreate","角色新增","/p2p-webapp/page/systemmng/catalogCreate.html",true,"/p2p-webapp/js/credit/catalogCreate.js");   	
    });
       
    //点击用户列表中的删除按钮
    $("[name='delCatalogBtn']").click(function(){
    	
    	
    });
})