//页面初始化加载函数
$(function(){
	debugger;
//	var  myelem=function(value, options) {
//		debugger;
//		var colId=options
//		var el = document.createElement("input");
//		el.type="text";
//		el.value = value;
//		el.id=options.id;
//		$("#"+options.id).datepicker({
//			inline: true,
//			dateFormat:'yy-mm-dd'
//		});
//		return el;
//	};
//	var myvalue=function (elem) {
//		debugger;
//		return $(elem).val();
//	};
//	var pickdates=function (id) {
//		debugger;
//	    $("#" + id + "_start_date", "#roleList4CreateGrid").datepicker({
//	      dateFormat : "yy-mm-dd"
//	    });
//	    $("#" + id + "_end_date", "#roleList4CreateGrid").datepicker({
//		      dateFormat : "yy-mm-dd"
//		    });
//	  }
//	var lastsel3;
	
	//下拉框数据填充
	selectRender("userCreateForm");
	debugger;
	var roleData = "";
	var roleJson = {};
	var roleSelectObj=gridSelectColRender("roleService","getRoleList",{},"roleId","roleName");
	roleData=roleSelectObj.jsonStr;
	roleJson=roleSelectObj.jsonArray;
	//构造grid
    $("#roleList4CreateGrid").jqGrid({
			autowidth:true,
			colNames:['<input type="checkbox" class="role-create-selall-cbox">',"角色","开始时间","结束时间"],
			colModel :[
			    {
			    	name:'role_sel_create',
					index:'role_sel_create',
					align:'center',
					width:"7%",
					sortable:false,
			    	formatter:function(cellvalue, options, rowObject){
						   debugger;
						   return '<input type="checkbox" class="role-create-sel-cbox">';
						}
			    },
				{name:'roleName',
					index:'roleName',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					editrules:{required:true},
					editoptions:{value:roleData}
					
				},
				{name:'start_date', 
					index:'start_date',
					align:'center',
					"sortable":false,
					width:"31%",
					editable:true
				},
				{name:'end_date', index:'end_date',
					align:'center',
					"sortable":false,
					width:"31%",
					editable:true
					/**,edittype:'custom',
					editoptions:{custom_element:myelem, custom_value:myvalue}*/
				}
			],
//			multiselect: true,
//			multiboxonly: true,
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false,
			afterEditCell:function (id,name,val,iRow,iCol){
				debugger;
		        if(name=='start_date' || name=='end_date') {
		          $("#"+iRow+"_"+name,"#roleList4CreateGrid").attr("style","width:100%");
		          $("#"+iRow+"_"+name,"#roleList4CreateGrid").datepicker({dateFormat:"yy-mm-dd"});
		        }
		    },gridComplete:function(){
		    	debugger;
		    	$("div[name='userTab']").find(".role-create-selall-cbox").parent("div").attr("class","");
		    }
    		/**,
		    beforeSelectRow: function (rowid, e) { 
		    	debugger;
		        var $myGrid = $(this),  
		            i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),  
		            cm = $myGrid.jqGrid('getGridParam', 'colModel');  
		        return (cm[i].name === 'cb');  
		    } 
			,
			onSelectRow:function(id){
				if (id && id !== lastsel3) {
		            $('#roleList4CreateGrid').jqGrid('restoreRow', lastsel3);
		            $('#roleList4CreateGrid').jqGrid('editRow', id, true, pickdates);
		            lastsel3 = id;
		        }
			}*/
	});
    
    //角色新增行
    $("[name='addRole4CreateBtn']").click(function(){
    	debugger;
    	var ids = $("#roleList4CreateGrid").jqGrid('getDataIDs');
    	
    	//获得当前最大行号（数据编号）  
        var rowid =0;
        if(ids && ids.length>0){
        	rowid=Math.max.apply(Math,ids);
        }
        //获得新添加行的行号（数据编号）  
        var newrowid = rowid+1;  
        var dataRow = {    
        	rolename: "",  
        	start_date:"",  
        	end_date:''
        };      
          
        //将新添加的行插入到第一列  
        $("#roleList4CreateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    //grid里面的复选框
    $("div[name='userTab']").on("click",".role-create-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='userTab']").find(".role-create-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='userTab']").find(".role-create-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='userTab']").find(".role-create-selall-cbox")[0].checked=false;
    	}
    	
    });
    
    //全选按钮
    $("div[name='userTab']").on("click",".role-create-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='userTab']").find(".role-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='userTab']").find(".role-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });
    
    
    //角色删除行
    $("[name='delRole4CreateBtn']").click(function(){
    	debugger;
    	var selRowIds=[];
    	$("div[name='userTab']").find(".role-create-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#roleList4CreateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
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