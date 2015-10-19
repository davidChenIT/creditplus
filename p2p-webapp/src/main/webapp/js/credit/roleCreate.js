$(function(){    
    //新增用户
    $("[name='saveRole4CreateBtn']").click(function(){
    	debugger;
    	var checkPass = true;
        var request_data={};
        var rolename = validateRequire("rolenamecreate","请输入角色名！");
		if(rolename){			
        	request_data.roleName=rolename;
        }else{
        	checkPass = false;
        }
		
        var enable = validateRequire("enable","请选择是否可用！");
		if(enable){			
        	request_data.enable=enable;
        }else{
        	checkPass = false;
        }
			
		var remark = $("textarea[name='remark']").val();
		if(remark && $.trim(remark)){
        	request_data.remark=remark;
		}
		
		if(!checkPass){
			return;
		}

		$.ajax({ 
			url: serviceAddress,
			datatype: 'json',
			method:"post",
			data:{"module":"roleService","method":"insertRole","request_data":JSON.stringify(request_data)},			
			success: function(data){
				removeTabItem("roleTab","roleCreate");
				$("#searchRoleListBtn").click();
			},error:function(error){
				alert(error);
			}
		});
    	
    });
})   