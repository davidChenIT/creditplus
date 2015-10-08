//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#userListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"userService","method":"getUserListWithPage"},
			mtype: 'POST',
			autowidth:true,
			colNames:["操作","用户名称","是否可用","创建人","创建时间","最后修改人","最后修改时间","备注"],
			colModel :[
				{name:'operate_col', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   return "<span name='userEditSpan' class='ui-icon-edit' data-val='"+rowObject.userId+"'></span>";
					}
				},
				{name:'username', index:'username',align:'center',"sortable":false},
				{name:'enable', index:'enable',align:'center',"sortable":false,formatter:"select", editoptions:{value:"0:不可用;1:可用"}},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false},
				{name:'remark', index:'remark',align:'center',"sortable":false}
			],
			pager: '#userListPager',
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
    $("div[name='userTab']").on("click",".ui-icon-edit",function(){
    	debugger;
    	var userId=$(this).attr("data-val");
    	var userUpdate=$("div[name='userTab']").find("li[tabid='userUpdate']");
    	if(userUpdate && userUpdate.length>0){
    		$("div[name='userTab']").find("li[tabid='userUpdate']").remove();
    		$("div[name='userTab']").find("div[tabid='userUpdate']").remove();
    	}
    	$("div[name='userTab']").find(".tabs-head li").attr("class","");
    	var userUpdateLi='<li tabid="userUpdate" class="tabs-selected"><span>修改用户</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='userTab']").find(".tabs-head ul").append(userUpdateLi);
    	$(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
    	
    	var jsFileUrl="/p2p-webapp/js/credit/userUpdate.js";
    	$("script[src='"+jsFileUrl+"']").remove();
		var requestUrl="http://"+window.location.host+"/p2p-webapp/page/systemmng/userUpdate.html";
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='userTab']").find(".tabs-body").append(data);
					$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
				}
			},error:function(error){
				$("div[name='userTab']").find(".tabs-body").append('<div tabid="userUpdate" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
    });

    //输入用户名称，点击按钮进行过滤
    $("#serrchUserListBtn").click(function(){
        var username = $("input[name='username']").val();
        var request_data={};
        if(username){
        	request_data.username=username;
        }
        $("#userListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    
    //点击用户列表中的新增按钮
    $("[name='addUserBtn']").click(function(){
    	var userCreate=$("div[name='userTab']").find("li[tabid='userCreate']");
    	if(userCreate && userCreate.length>0){
    		$("div[name='userTab']").find("li[tabid='userCreate']").remove();
    		$("div[name='userTab']").find("div[tabid='userCreate']").remove();
    	}
    	$("div[name='userTab']").find(".tabs-head li").attr("class","");
    	var userCreateLi='<li tabid="userCreate" class="tabs-selected"><span>新增用户</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='userTab']").find(".tabs-head ul").append(userCreateLi);
    	$(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
    	
    	var jsFileUrl="/p2p-webapp/js/credit/userCreate.js";
    	$("script[src='"+jsFileUrl+"']").remove();
		var requestUrl="http://"+window.location.host+"/p2p-webapp/page/systemmng/userCreate.html";
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='userTab']").find(".tabs-body").append(data);
					$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
				}
			},error:function(error){
				$("div[name='userTab']").find(".tabs-body").append('<div tabid="userCreate" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
    	
    });
    
    //点击用户列表中的删除按钮
    $("[name='delUserBtn']").click(function(){
    	
    	
    });
})