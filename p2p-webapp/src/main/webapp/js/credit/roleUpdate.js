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
//			$("select[name='enable']").val(data.enable);
			//下拉框数据填充
			selectRender("roleUpdateForm");
			created_by = data.created_by;
			created_date = data.created_date;
		},error:function(error){
			messageBox.createMessageDialog("提示",jQuery.parseJSON(error.responseText).cause.message,"","","error");
		}
	});
	
	var resList = {};
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
	    async:false,
		data:{"module":"roleService",
			  "method":"getRoleResourceByRoleId",
			  "request_data":JSON.stringify({"roleId":roleId})
		},			
		success: function(data){
			resList = data;
		},error:function(error){
			messageBox.createMessageDialog("提示",jQuery.parseJSON(error.responseText).cause.message,"","","warning");
		}
	});    
    
    //构造栏目树
  //设置栏目菜单
    var selNodeId="";
	var zTreeObj,
	setting = {
	    treeId:"catalog_ztree_role_update",
		view: {
//			selectedMulti: false,
//			showIcon: false,
//			showLine: false,
			dblClickExpand:false
		},
		check: {
			enable: true,
			chkStyle:"checkbox",
			chkboxType: { "Y": "ps", "N": "ps"}
		},
		data:{
			key:{
				name: "catalog_name",
				url:""
			},
		   simpleData: {
			enable: true,
			idKey: "catalog_id",
			pIdKey: "parent_id",
			rootPId: 0
		  }
		},
		callback: {
			//禁用ztree自带的双击展开子节点的方法
			
			beforeExpand:function(){
			   return false;
			},
			//节点点击事件
			onClick:function(event, treeId, treeNode){
				debugger;
				var treeObj = $.fn.zTree.getZTreeObj(treeId); 
				//展开或收缩子节点
				if(treeNode.open){
				   treeObj.expandNode(treeNode, false, false, false,false);
				}else{
				   treeObj.expandNode(treeNode, true, false, false,false);
				}
			}
		}

	},zTreeNodes = resList;
	
	zTreeObj = $.fn.zTree.init($("#catalog_ztree_role_update"), setting, zTreeNodes);	
	
	$("[name='saveRole4UpdateBtn']").click(function(){
     	var checkPass = true;
        var request_data={};
            request_data.roleId=roleId;
        	request_data.created_by = created_by;
        	request_data.created_date = created_date;

    	//1. 获取所有的必填项
		var validDoms = $("#roleUpdateForm").find("[validation]");
		//2. 循环校验
		if(validDoms.length > 0){
			var isFocusError = false;
			$.each(validDoms,function(i){
				var validDomName = $(validDoms[i]).attr('name');
				var resultObj = validateDom(validDomName, "roleUpdateForm");
				if(resultObj && resultObj.is_pass){
					if(resultObj.value){
						request_data[validDomName] = resultObj.value;
					}
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
		}
		var remark = $("#roleUpdateForm").find("textarea[name='remark']").val();
		if(remark && $.trim(remark)){
        	request_data.remark=remark;
		}
		
		//获取权限树勾选行的数据
		var treeObj = $.fn.zTree.getZTreeObj("catalog_ztree_role_update");
		var selNodeDataArray=treeObj.getCheckedNodes();
		var resList=[];
		if(selNodeDataArray && selNodeDataArray.length>0){
			for(var i=0;i<selNodeDataArray.length;i++){
				var nodeObj=selNodeDataArray[i];
				resList[i] = nodeObj;
			}
			
			request_data.resList = resList;
		}
				
		publicSaveAjax("roleService","updateRole",JSON.stringify(request_data),"roleTab","roleUpdate","#searchRoleListBtn");
	});	
})