$(function(){
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

		var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";		
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