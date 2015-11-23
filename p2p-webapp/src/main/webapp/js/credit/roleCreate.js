$(function(){
	
	//下拉框数据填充
	selectRender("roleCreateForm");
    //新增用户
    $("[name='saveRole4CreateBtn']").click(function(){
    	debugger;
    	var checkPass = true;
        var request_data={};
        //1. 获取所有的必填项
		var validDoms = $("#roleCreateForm").find("[validation]");
		//2. 循环校验
		if(validDoms.length > 0){
			var isFocusError = false;
			$.each(validDoms,function(i){
				var validDomName = $(validDoms[i]).attr('name');
				var resultObj = validateDom(validDoms[i], "roleCreateForm");
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
		var remark = $("#roleCreateForm").find("textarea[name='remark']").val();
		if(remark && $.trim(remark)){
        	request_data.remark=remark;
		}
		
		//获取权限树勾选行的数据
		var treeObj = $.fn.zTree.getZTreeObj("catalog_ztree_role_create");
		var selNodeDataArray=treeObj.getCheckedNodes();
		var resList=[];
		if(selNodeDataArray && selNodeDataArray.length>0){
			for(var i=0;i<selNodeDataArray.length;i++){
				var nodeObj=selNodeDataArray[i];
				resList[i] = nodeObj;
			}
			
			request_data.resList = resList;
		}

		//调用服务
		publicSaveAjax("roleService","insertRole",JSON.stringify(request_data),"roleTab","roleCreate","#searchRoleListBtn");
    });
    
	var resList = {};
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
	    async:false,
		data:{"module":"catalogService",
			  "method":"getCatalogTree",
			  "request_data":""
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
	
	zTreeObj = $.fn.zTree.init($("#catalog_ztree_role_create"), setting, zTreeNodes);
})   