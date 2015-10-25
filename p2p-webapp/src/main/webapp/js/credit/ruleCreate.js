//页面初始化加载函数
$(function(){
	debugger;
	var roleData = "";
	var roleJson = {};
	var roleSelectObj=gridSelectColRender("roleService","getRoleList",{},"roleId","roleName");
	roleData=roleSelectObj.jsonStr;
	roleJson=roleSelectObj.jsonArray;
	//构造grid
    $("#ruleList4CreateGrid").jqGrid({
			autowidth:true,
			colNames:['<input type="checkbox" class="rule-create-selall-cbox">',"业务对象","字段","语义","值","与或运算"],
			colModel :[
			    {
			    	name:'rule_sel_create',
					index:'rule_sel_create',
					align:'center',
					width:"7%",
					sortable:false,
			    	formatter:function(cellvalue, options, rowObject){
						   debugger;
						   return '<input type="checkbox" class="rule-create-sel-cbox">';
						}
			    },
				{name:'business_name',
					index:'business_name',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					editrules:{required:true},
					editoptions:{value:"1:xx;2:aa"}
				},
				{name:'col_name',
					index:'col_name',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					editrules:{required:true},
					editoptions:{value:"id:ID;name:name"}
				},
				{name:'semantics_name',
					index:'semantics_name',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					editrules:{required:true},
					editoptions:{value:"=:=;like:like"}
				},
				{name:'value',
					index:'value',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%"
				},
				{name:'versus_operators',
					index:'versus_operators',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%"
				}
				
			],
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false,
			gridComplete:function(){
		    	debugger;
		    	$("div[name='ruleTab']").find(".rule-create-selall-cbox").parent("div").attr("class","");
		    }
	});
    
    //角色新增行
    $("[name='addRule4CreateBtn']").click(function(){
    	debugger;
    	var ids = $("#ruleList4CreateGrid").jqGrid('getDataIDs');
    	
    	//获得当前最大行号（数据编号）  
        var rowid =0;
        if(ids && ids.length>0){
        	rowid=Math.max.apply(Math,ids);
        }
        //获得新添加行的行号（数据编号）  
        var newrowid = rowid+1;  
        var dataRow = {    
        };      
          
        //将新添加的行插入到第一列  
        $("#ruleList4CreateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    //grid里面的复选框
    $("div[name='ruleTab']").on("click",".rule-create-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='ruleTab']").find(".rule-create-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='ruleTab']").find(".rule-create-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='ruleTab']").find(".rule-create-selall-cbox")[0].checked=false;
    	}
    	
    });
    
    //全选按钮
    $("div[name='ruleTab']").on("click",".rule-create-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='ruleTab']").find(".rule-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='ruleTab']").find(".rule-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });
    
    
    //角色删除行
    $("[name='delRule4CreateBtn']").click(function(){
    	debugger;
    	var selRowIds=[];
    	$("div[name='ruleTab']").find(".rule-create-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#ruleList4CreateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
    //新增用户
    $("[name='saveRule4CreateBtn']").click(function(){
    	debugger;
    	var checkPass = true;
        var request_data={};
        var username = validateRequire("usernamecreate","请输入用户名！");
		if(username){			
        	request_data.username=username;
        }else{
        	checkPass = false;
        }
		
    	request_data.enable=$("select[name='enable']").val();
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
		
    	var rowids = $("#roleList4CreateGrid").jqGrid('getDataIDs');
    	var grid_data=[];
    	for(var i=0;i<rowids.length;i++){
      	  var rowData=$("#roleList4CreateGrid").jqGrid("getRowData",rowids[i]);
      	  $("#roleList4CreateGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
      	    var inputName=$(input).attr("name");
      		var inputVal=$(input).val();
      		rowData[inputName]=inputVal;
      	  });
      	  $("#roleList4CreateGrid").find("tr[id='"+rowids[i]+"']").find("textarea").each(function(i,textarea){
      	    var textareaName=$(textarea).attr("name");
      		var textareaVal=$(textarea).val();
      		rowData[textareaName]=textareaVal;
      	  });
      	  
		  $.each(roleJson,function(i,item){
			  if(item.roleName == rowData.roleName){
				  rowData.roleId = item.roleId;
				  return true;
			  }
		  });
      	  rowData.ur_id = null;
      	  grid_data.push(rowData);
      	}    	
    	request_data.griddata = grid_data;
		publicSaveAjax("userService","addUser",JSON.stringify(request_data),"userTab","userCreate","#searchUserListBtn");
    });    
})