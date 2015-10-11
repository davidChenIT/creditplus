//页面初始化加载函数
$(function(){   
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
				removeTabItem("userTab","userCreate");
				$("#searchUserListBtn").click();
			},error:function(error){
				alert(error);
			}
		});
    	
    });    
})