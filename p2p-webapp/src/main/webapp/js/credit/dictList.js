//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#dictListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"dictService","method":"getDictListWithPage"},
			mtype: 'POST',
			autowidth:true,
			colNames:["操作","名称","编码","类型","状态","顺序","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   return "<span name='dictEditSpan' class='ui-icon-edit' data-val='"+rowObject.dictId+"'></span>";
					}
				},
				{name:'name',  index:'name',align:'center',"sortable":false},
				{name:'code',  index:'code',align:'center',"sortable":false},
				{name:'type',  index:'type',align:'center',"sortable":false},
				{name:'state', index:'state',align:'center',"sortable":false},
				{name:'orderNumber', index:'orderNumber',align:'center',"sortable":false},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#dictListPager',
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
    $("div[name='dictTab']").on("click",".ui-icon-edit",function(){
    	debugger;
    	var dictId=$(this).attr("data-val");
    	var dictUpdate=$("div[name='dictTab']").find("li[tabid='dictUpdate']");
    	if(dictUpdate && dictUpdate.length>0){
    		$("div[name='dictTab']").find("li[tabid='dictUpdate']").remove();
    		$("div[name='dictTab']").find("div[tabid='dictUpdate']").remove();
    	}
    	$("div[name='dictTab']").find(".tabs-head li").attr("class","");
    	var dictUpdateLi='<li tabid="dictUpdate" class="tabs-selected"><span>修改用户</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='dictTab']").find(".tabs-head ul").append(dictUpdateLi);
    	$(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
    	
    	var jsFileUrl="/p2p-webapp/js/credit/dictUpdate.js";
    	$("script[src='"+jsFileUrl+"']").remove();
		var requestUrl="http://"+window.location.host+"/p2p-webapp/page/systemmng/dictUpdate.html";
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='dictTab']").find(".tabs-body").append(data);
					$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
				}
			},error:function(error){
				$("div[name='dictTab']").find(".tabs-body").append('<div tabid="dictUpdate" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
    });

    //输入用户名称，点击按钮进行过滤
    $("#searchDictListBtn").click(function(){
        var dictname = $("input[name='dictname']").val();
        var request_data={};
        if(dictname){
        	request_data.dictname=dictname;
        }
        $("#dictListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的新增按钮
    $("[name='addDictBtn']").click(function(){
    	addTabItem("dictTab","dictCreate","角色新增","/p2p-webapp/page/systemmng/dictCreate.html",true,"/p2p-webapp/js/credit/dictCreate.js");   	
    });
       
    //点击用户列表中的删除按钮
    $("[name='delDictBtn']").click(function(){
    	
    	
    });
})