//页面初始化加载函数
$(function(){
	var paramsObj=$("div[name='roleTab']").find("li[tabid='roleUpdate']").data();
	var roleId=paramsObj.roleId || "";
	var created_by = "";
	var created_date="";
	//查询详细信息，并赋值
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		data:{"module":"roleService",
			  "method":"getRoleDetail",
			  "request_data":JSON.stringify({"roleId":roleId})
		},			
		success: function(data){
			data.rolenameupdate = data.roleName;
			setValues("roleUpdateForm",data,false);
			$("select[name='enable']").val(data.enable);
			created_by = data.created_by;
			created_date = data.created_date;
		},error:function(error){
			alert(jQuery.parseJSON(error.responseText).cause.message);
		}
	});
	
	$("[name='saveRole4UpdateBtn']").click(function(){
     	var checkPass = true;
        var request_data={};
            request_data.roleId=roleId;
        	request_data.enable=$("select[name='enable']").val();
        	request_data.created_by = created_by;
        	request_data.created_date = created_date;

        var roleName = validateRequire("rolenameupdate","请输入密码！");
		if(roleName){			
        	request_data.roleName=roleName;	
        }else{
        	checkPass = false;
        }

		if(!checkPass){
			return;
		}
		
		var remark = $("textarea[name='remark']").val();
		if(remark && $.trim(remark)){
        	request_data.remark=remark;
		}
				
		publicSaveAjax("roleService","updateRole",JSON.stringify(request_data),"roleTab","roleUpdate","#searchRoleListBtn");
	});	
})