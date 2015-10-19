//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
    $("#roleListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"roleService","method":"getRoleListWithPage"},
			mtype: 'POST',
			autowidth:true,
			colNames:["操作","角色名称","是否可用","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   return "<span name='roleEditSpan' class='ui-icon-edit' data-val='"+rowObject.roleId+"'></span>";
					}
				},
				{name:'roleName', index:'roleName',align:'center',"sortable":false},
				{name:'enable', index:'enable',align:'center',"sortable":false,formatter:"select", editoptions:{value:"0:不可用;1:可用"}},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#roleListPager',
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
    $("div[name='roleTab']").on("click",".ui-icon-edit",function(){
    	debugger;
    	var roleId=$(this).attr("data-val");
    	var roleUpdate=$("div[name='roleTab']").find("li[tabid='roleUpdate']");
    	if(roleUpdate && roleUpdate.length>0){
    		$("div[name='roleTab']").find("li[tabid='roleUpdate']").remove();
    		$("div[name='roleTab']").find("div[tabid='roleUpdate']").remove();
    	}
    	$("div[name='roleTab']").find(".tabs-head li").attr("class","");
    	var roleUpdateLi='<li tabid="roleUpdate" class="tabs-selected"><span>修改用户</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='roleTab']").find(".tabs-head ul").append(roleUpdateLi);
    	$(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
    	
    	var jsFileUrl="/p2p-webapp/js/credit/roleUpdate.js";
    	$("script[src='"+jsFileUrl+"']").remove();
		var requestUrl="http://"+window.location.host+"/p2p-webapp/page/systemmng/roleUpdate.html";
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='roleTab']").find(".tabs-body").append(data);
					$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
				}
			},error:function(error){
				$("div[name='roleTab']").find(".tabs-body").append('<div tabid="roleUpdate" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
    });

    //输入用户名称，点击按钮进行过滤
    $("#searchRoleListBtn").click(function(){
        var rolename = $("input[name='rolename']").val();
        var request_data={};
        if(rolename){
        	request_data.rolename=rolename;
        }
        $("#roleListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的新增按钮
    $("[name='addRoleBtn']").click(function(){
    	addTabItem("roleTab","roleCreate","角色新增","/p2p-webapp/page/systemmng/roleCreate.html",true,"/p2p-webapp/js/credit/roleCreate.js");   	
    });
       
    //点击用户列表中的删除按钮
    $("[name='delRoleBtn']").click(function(){
    	
    	
    });
})