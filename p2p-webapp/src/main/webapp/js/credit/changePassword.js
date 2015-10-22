//页面初始化加载函数
$(function(){   
    //修改密码
    $("#changePasswordBtn").click(function(){
    	debugger;
    	var checkPass = true;
        var request_data={};
        var oldPassword = validateRequire("oldPassword","请输入旧密码！");
		if(oldPassword){			
        	request_data.oldPassword=oldPassword;
        }else{
        	checkPass = false;
        }
		
        var password = validateRequire("password","请输入新密码！");
		if(password){			
        	request_data.password=password;
        }else{
        	checkPass = false;
        }
		
        var checkPassword = validateRequire("checkPassword","请确认新密码！");
		if(password!=checkPassword){
	        $("input[name='checkPassword']").val("");
	        validateRequire("checkPassword","输入密码与确认密码不一致！");
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
		//调用服务
		publicSaveAjax("userService","changePassword",JSON.stringify(request_data),"","","","修改密码成功！",function(){setValues("userPassWordTab",{});});
    	
    });    
})