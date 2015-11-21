//页面初始化加载函数
$(function(){   
    //修改密码
    $("#changePasswordBtn").click(function(){
    	debugger;
    	var checkPass = true;
        var request_data={};
		//1. 获取所有的必填项
		var validDoms = $("#changeUserPassWordDiv").find("[validation]");
		//2. 循环校验
		if(validDoms.length > 0){
			var isFocusError = false;
			$.each(validDoms,function(i){
				var validDomName = $(validDoms[i]).attr('name');
				var elementVal = validateDom(validDomName, "changeUserPassWordDiv");
				if(elementVal){
					request_data[validDomName] = elementVal;
				}else{
					if(!isFocusError){
						$(validDoms[i]).focus();
						isFocusError = true;
					}
					checkPass = false;
				}
			});	
		}
		if(!checkPass){
			return false;
		}else{
			if(request_data.password!=request_data.checkPassword){
				validErrorTip("checkPassword", $("#changeUserPassWordDiv").find("[name='checkPassword']"),"新密码与确认密码不一致！","changeUserPassWordDiv")
		        return false;
	        }
		}
		//调用服务
		publicSaveAjax("userService","changePassword",JSON.stringify(request_data),"","","","修改密码成功！",function(){setValues("userPassWordTab",{});});
    	
    });    
})