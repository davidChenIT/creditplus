//页面初始化加载函数
$(function(){
	var paramsObj=$("div[name='userTab']").find("li[tabid='userUpdate']").data();
	var userId=paramsObj.userId || "";
	var created_by = "";
	var created_date="";
	//查询详细信息，并赋值
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		data:{"module":"userService",
			  "method":"getUserById",
			  "request_data":JSON.stringify({"userId":userId})
		},			
		success: function(data){
			data.checkPassword = data.password;
			setValues("userUpdateForm",data,false);
//			$("select[name='enable']").val(data.enable);
			//下拉框数据填充
			selectRender("userUpdateForm");
			created_by = data.created_by;
			created_date = data.created_date;
		},error:function(error){
			messageBox.createMessageDialog("提示",jQuery.parseJSON(error.responseText).cause.message,"","","error");
		}
	});
	debugger;
	
	var roleData = "";
	var roleJson = {};
	var roleSelectObj=gridSelectColRender("roleService","getRoleList",{},"roleId","roleName");
	roleData=roleSelectObj.jsonStr;
	roleJson=roleSelectObj.jsonArray;
//	$.ajax({ 
//		url: serviceAddress,
//		datatype:'json',
//		method:"post",
//	    async:false,
//		data:{"module":"roleService",
//			  "method":"getRoleList",
//			  "request_data":JSON.stringify({"userId":userId})
//		},			
//		success: function(data){
//			roleJson = data;
//			$.each(data,function(i,item){
//				roleData += item.roleId + ":" + item.roleName + ";";
//			});
//			roleData = roleData.substring(0,roleData.length -1);
//		},error:function(error){
//			messageBox.createMessageDialog("提示",jQuery.parseJSON(error.responseText).cause.message,"","","error");
//		}
//	});

	//构造grid
    $("#roleList4UpdateGrid").jqGrid({
		url:serviceAddress,
		datatype: 'json',
		postData:{"module":"userService","method":"getUserRoleListByUserID", "request_data":JSON.stringify({"userId":userId})},
		mtype: 'POST',    	
    	autowidth:true,
		colNames:['<input type="checkbox" class="role-update-selall-cbox">',
		          "<span style='color:red;'>*</span>角色",
		          "<span style='color:red;'>*</span>开始时间",
		          "<span style='color:red;'>*</span>结束时间"],
		colModel :[
		    {
		    	name:'role_sel_update',
				index:'role_sel_update',
				align:'center',
				width:"7%",
				sortable:false,
		    	formatter:function(cellvalue, options, rowObject){
					   debugger;
					   return '<input type="checkbox" class="role-update-sel-cbox">';
					}
		    },
			{name:'role_name',
			 index:'role_name',
			 align:'center',
			 sortable:false,
			 editable:true,
			 width:"31%",
			 edittype:'select',
			 editrules:{required:true},
			 editoptions:{value:roleData}
			},
			{name:'start_date', 
			 index:'start_date',
			 align:'center',
			 "sortable":false,
			 width:"31%",
			 editable:true
			},
			{name:'end_date', 
			 index:'end_date',
			 align:'center',
			 "sortable":false,
			 width:"31%",
			 editable:true
			}
		],
		cellEdit: true,
		cellsubmit:"clientArray",
		sortable:false,
		afterEditCell:function (id,name,val,iRow,iCol){
	        if(name=='start_date' || name=='end_date') {
	          $("#"+iRow+"_"+name,"#roleList4UpdateGrid").attr("style","width:100%");
	          $("#"+iRow+"_"+name,"#roleList4UpdateGrid").datepicker({dateFormat:"yy-mm-dd"});
	        }
	    },gridComplete:function(){
	    	debugger;
	    	$("div[name='userTab']").find(".role-update-selall-cbox").parent("div").attr("class","");
	    }
	});
    
    
  //角色新增行
    $("[name='addRole4UpdateBtn']").click(function(){
    	debugger;
    	var ids = $("#roleList4UpdateGrid").jqGrid('getDataIDs');
    	
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
        $("#roleList4UpdateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    //grid里面的复选框
    $("div[name='userTab']").on("click",".role-update-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='userTab']").find(".role-update-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='userTab']").find(".role-update-selall-cbox")[0].checked=false;
    	}
    	
    });
    
    //全选按钮
    $("div[name='userTab']").on("click",".role-update-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });
    
    
    //角色删除行
    $("[name='delRole4UpdateBtn']").click(function(){
    	debugger;
    	var selRowIds=[];
    	$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#roleList4UpdateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
    $("[name='saveUser4UpdateBtn']").click(function(){
     	var checkPass = true;
        var request_data={};
        var username = $("span[name='username']").text();
            request_data.userId=userId;
        	request_data.username=username;	
        	request_data.enable=$("select[name='enable']").val();
        	request_data.created_by = created_by;
        	request_data.created_date = created_date;

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
		
    	var rowids = $("#roleList4UpdateGrid").jqGrid('getDataIDs');
    	var grid_data=[];
    	for(var i=0;i<rowids.length;i++){
      	  var rowData=$("#roleList4UpdateGrid").jqGrid("getRowData",rowids[i]);
      	  $("#roleList4UpdateGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
      	    var inputName=$(input).attr("name");
      		var inputVal=$(input).val();
      		rowData[inputName]=inputVal;
      	  });
      	  $("#roleList4UpdateGrid").find("tr[id='"+rowids[i]+"']").find("textarea").each(function(i,textarea){
      	    var textareaName=$(textarea).attr("name");
      		var textareaVal=$(textarea).val();
      		rowData[textareaName]=textareaVal;
      	  });
		  $.each(roleJson,function(i,item){
			  if(item.roleName == rowData.role_name){
				  rowData.roleId = item.roleId;
				  return true;
			  }
		  });
      	  rowData.ur_id = null;
      	  grid_data.push(rowData);
      	}    	
		
    	request_data.griddata = grid_data;
		publicSaveAjax("userService","updateUser",JSON.stringify(request_data),"userTab","userUpdate","#searchUserListBtn");
    });
    
})