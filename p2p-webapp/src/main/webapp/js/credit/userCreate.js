//页面初始化加载函数
$(function(){
	debugger;
	var  myelem=function(value, options) {
		debugger;
		var el = document.createElement("input");
		el.type="text";
		el.value = value;
		$(el).datepicker({
			inline: true,
			dateFormat:'yy-mm-dd'
		});
		return el;
	};
	var myvalue=function (elem) {
		debugger;
		return $(elem).val();
	};
	//构造grid
    $("#roleList4CreateGrid").jqGrid({
			autowidth:true,
			colNames:["角色","开始时间","结束时间"],
			colModel :[
				{name:'rolename',
					index:'rolename',
					align:'center',
					sortable:false,
					editable:true,
					edittype:'select',
					editrules:{required:true},
					editoptions:{value:"admin:admin;anyone:andone"}
					
				},
				{name:'start_date', 
					index:'start_date',
					align:'center',
					"sortable":false,
					editable:true,
					edittype:'custom',
					editoptions:{custom_element:myelem, custom_value:myvalue} 
				},
				{name:'end_date', index:'end_date',
					align:'center',"sortable":false,
					editable:true,edittype:'custom',
					editoptions:{custom_element:myelem, custom_value:myvalue}
				}
			],
			multiselect: true,
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false
	});
    
    //角色新增行
    $("[name='addRole4CreateBtn']").click(function(){
    	debugger;
    	var ids = $("#roleList4CreateGrid").jqGrid('getDataIDs');
    	
    	//获得当前最大行号（数据编号）  
        var rowid =0;
        if(ids && ids.length>0){
        	rowid=Math.max.apply(Math,ids);
        }
        //获得新添加行的行号（数据编号）  
        var newrowid = rowid+1;  
        var dataRow = {    
        	rolename: "",  
        	start_date:"",  
        	end_date:''
        };      
          
        //将新添加的行插入到第一列  
        $("#roleList4CreateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    //角色删除行
    $("[name='delRole4CreateBtn']").click(function(){
    	debugger;
    	//获得选中行的ID数组
    	var ids = $("#roleList4CreateGrid").jqGrid('getGridParam','selarrrow');
    	var selRowIds =[]; 
    	if(ids && ids.length>0){
    		for(var i=0;i<ids.length;i++){
    			selRowIds.push(ids[i]);
    		}
    	}
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#roleList4CreateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
    var validateRequire = function(elemName,tip){
        var elemVal = $("input[name='"+ elemName +"']").val();
        if(!elemVal || !$.trim(elemVal)){
			  var elemNameTipLength=$("span[name='" + elemName + "Tip']").length;
			  if(elemNameTipLength==0){
			  	$("input[name='"+ elemName +"']").parent().after("<span name='" + elemName + "Tip' style='color:red;'>" + tip + "</span>");
			  }
			  
			  $("input[name='"+ elemName +"']").focus(function(e){
				  $("span[name='" + elemName + "Tip']").remove();
				  $(this).unbind(e);
			  });
			  return;
		}
        
        return elemVal;
    }
    
    //新增用户
    $("[name='saveUser4CreateBtn']").click(function(){
    	debugger;
    	var checkPass = true;
        var request_data={};
        var username = validateRequire("usernamecreate","请输入用户名！");
		if(username){			
        	request_data.username=username;
        }else{
        	checkPass = false;
        }
		
        var enable = validateRequire("enable","请选择是否可用！");
		if(enable){			
        	request_data.enable=enable;
        }else{
        	checkPass = false;
        }
		
        var password = validateRequire("password","请输入密码！");
		if(password){			
        	request_data.password=password;
        }else{
        	checkPass = false;
        }
		
        var checkPassword = validateRequire("checkPassword","请确认密码！");
		if(password!=checkPassword){
	        $("input[name='checkPassword']").val("");
	        validateRequire("checkPassword","请密码与确认密码不一致！");
	        $("input[name='checkPassword']").val(checkPassword);
	        checkPass = false;
        }
		
		var remark = $("textarea[name='remark']").val();
		if(remark && $.trim(remark)){
        	request_data.remark=remark;
		}
		
		if(!checkPass){
			return;
		}

		var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";		
		$.ajax({ 
			url: serviceAddress,
			datatype: 'json',
			method:"post",
			data:{"module":"userService","method":"addUser","request_data":JSON.stringify(request_data)},			
			success: function(data){
	    		$("div[name='userTab']").find("li[tabid='userCreate']").remove();
	    		$("div[name='userTab']").find("div[tabid='userCreate']").remove();
	    		$("div[name='userTab']").find("li[tabid='userList']").attr("class","tabs-selected");
	    		$("div[name='userTab']").find("div[tabid='userList']").attr("class","tabs-body-item creditPageContext credit-validator");
	    		$("#serrchUserListBtn").click();
			},error:function(error){
				alert(error);
			}
		});
    	
    });    
})