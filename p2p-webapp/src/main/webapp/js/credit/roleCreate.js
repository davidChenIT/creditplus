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
		
		//获取权限树勾选行的数据
		var treeObj = $.fn.zTree.getZTreeObj("catalog_ztree_role_create");
		var selNodeDataArray=treeObj.getCheckedNodes();
		var nodeIds="";
		if(selNodeDataArray && selNodeDataArray.length>0){
			for(var i=0;i<selNodeDataArray.length;i++){
				var nodeObj=selNodeDataArray[i];
				if(!nodeIds){
					nodeIds=nodeObj.id;
				}else{
					nodeIds+=","+nodeObj.id;
				}
			}
		}

		//调用服务
		publicSaveAjax("roleService","insertRole",JSON.stringify(request_data),"roleTab","roleCreate","#searchRoleListBtn");
    });
    
    //构造栏目树
  //设置栏目菜单
    var selNodeId="";
	var zTreeObj,
	setting = {
	    treeId:"catalog_ztree_role_create",
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
		   simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pId",
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
				   treeObj.expandNode(treeNode, false, false, true,false);
				}else{
				   treeObj.expandNode(treeNode, true, false, true,false);
				}
			},
			//勾选节点事件
			onCheck:function(event, treeId, treeNode){
				debugger;
			}
			
			
		}

	},zTreeNodes = [
		{"id":1,"pId":0,"name":"首页","urlstr":"page/index.jsp"},
		{"id":2,"pId":0,"name":"风控管理"},
		{"id":3,"pId":0,"name":"系统管理"},
		{"id":4,"pId":2,"name":"信用初审","urlstr":"page/firstTrialList.jsp"},
		{"id":5,"pId":2,"name":"信用复审","urlstr":"page/reviewList.jsp"},
		{"id":6,"pId":2,"name":"标的管理","urlstr":"page/tenderMngList.jsp"},
		{"id":7,"pId":2,"name":"投标","urlstr":"page/makeTenderList.jsp"},
		{"id":8,"pId":3,"name":"字典管理","urlstr":"page/systemmng/dictList.jsp"},
		{"id":9,"pId":3,"name":"栏目管理","urlstr":"page/systemmng/catalogList.jsp"},
		{"id":10,"pId":3,"name":"用户管理","urlstr":"page/systemmng/userList.jsp"},
		{"id":11,"pId":3,"name":"角色管理","urlstr":"page/systemmng/roleList.jsp"},
		{"id":12,"pId":3,"name":"资源管理","urlstr":"page/systemmng/resourceList.jsp"},
		{"id":13,"pId":3,"name":"修改密码","urlstr":"page/systemmng/changePassword.jsp"}		
	];
	
	zTreeObj = $.fn.zTree.init($("#catalog_ztree_role_create"), setting, zTreeNodes);
})   