//页面初始化加载函数
$(function(){
	var paramsObj=$("div[name='ruleTab']").find("li[tabid='ruleUpdate']").data();
	var ruleId=paramsObj.ruleId || "";
	var created_by = "";
	var created_date="";
	//查询详细信息，并赋值
	
	//构造grid
    $("#ruleList4UpdateGrid").jqGrid({
			autowidth:true,
			colNames:['<input type="checkbox" class="rule-update-selall-cbox">',"<span style='color:red;'>*</span>业务对象","<span style='color:red;'>*</span>字段","<span style='color:red;'>*</span>语义","<span style='color:red;'>*</span>值","<span style='color:red;'>*</span>与或运算"],
			colModel :[
			    {
			    	name:'rule_sel_update',
					index:'rule_sel_update',
					align:'center',
					width:"7%",
					sortable:false,
			    	formatter:function(cellvalue, options, rowObject){
						   debugger;
						   return '<input type="checkbox" class="rule-update-sel-cbox">';
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
		    	$("div[name='ruleTab']").find(".rule-update-selall-cbox").parent("div").attr("class","");
		    }
	});
	
    
    
    //控制sql语句展开或者收缩
    $("h3[name='customSql4UpdateH3']").click(function(){
    	debugger;
    	var customSqlDiv=$("#customSql4UpdateDiv");
    	var divStyle=customSqlDiv.attr("style");
    	if(divStyle=="display:none;"){
    		customSqlDiv.attr("style","display:block;");
    	}else{
    		customSqlDiv.attr("style","display:none;");
    	}
    });
    
    
    //维度新增行
    $("[name='addRule4UpdateBtn']").click(function(){
    	debugger;
    	var ids = $("#ruleList4UpdateGrid").jqGrid('getDataIDs');
    	
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
        $("#ruleList4UpdateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    
  //grid里面的复选框
    $("div[name='ruleTab']").on("click",".rule-update-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='ruleTab']").find(".rule-update-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='ruleTab']").find(".rule-update-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='ruleTab']").find(".rule-update-selall-cbox")[0].checked=false;
    	}
    	
    });
    
    //全选按钮
    $("div[name='ruleTab']").on("click",".rule-update-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='ruleTab']").find(".rule-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='ruleTab']").find(".rule-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });
    
    
  //维度删除行
    $("[name='delRule4UpdateBtn']").click(function(){
    	debugger;
    	var selRowIds=[];
    	$("div[name='ruleTab']").find(".rule-update-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#ruleList4UpdateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
    //新增规则
    $("[name='saveRule4UpdateBtn']").click(function(){
    	debugger;
    	var request_data={};
		var checkPass = true;
    	//1. 获取所有的必填项
		var requiredDoms = $("#ruleUpdateForm").find("[validtion*='required']");
		var ruleInfo={};
		//2. 循环校验
		if(requiredDoms.length > 0){
			var isFocusError = false;
			$.each(requiredDoms,function(i,dom){
				var validDomName = $(dom).attr('name');
				var elementVal = validateRequire(validDomName,"此项为必填！","ruleUpdateForm");
				if(elementVal){
					ruleInfo[validDomName] = elementVal;
				}else{
					if(!isFocusError){
						$(dom).focus();
						isFocusError = true;
					}
					checkPass = false;
				}
			});	
		}
		if(!checkPass){return false;}
		ruleInfo.remark=$("#ruleUpdateForm").find("[name='remark']").val();
		request_data.ruleInfo=ruleInfo;
        //校验grid的数据		
    	var rowids = $("#ruleList4UpdateGrid").jqGrid('getDataIDs');
    	var grid_data=[];
    	for(var i=0;i<rowids.length;i++){
      	  var rowData=$("#ruleList4UpdateGrid").jqGrid("getRowData",rowids[i]);
      	  $("#ruleList4UpdateGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
      	    var inputName=$(input).attr("name");
      		var inputVal=$(input).val();
      		rowData[inputName]=inputVal;
      	  });
      	  $("#ruleList4UpdateGrid").find("tr[id='"+rowids[i]+"']").find("select").each(function(i,select){
      	    var selectName=$(select).attr("name");
      		var selectVal=$(select).val();
      		rowData[selectName]=selectVal;
      	  });
      	  grid_data.push(rowData);
      	}    
    	if(grid_data && grid_data.length>0){
    		var isTrue=true;
    		for(var i=0;i<grid_data.length;i++){
    			var rowObj=grid_data[i];
    			if(!rowObj.business_name){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“业务对象”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.col_name){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“字段”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.semantics_name){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“语义”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.value){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“值”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.versus_operators){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“与或运算”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}
    		}
    		if(!isTrue){
    			return false;
    		}
    	}
    	request_data.demensionList = grid_data;
    	
		//publicSaveAjax("userService","addUser",JSON.stringify(request_data),"userTab","userCreate","#searchUserListBtn");
    });   
    
	
})