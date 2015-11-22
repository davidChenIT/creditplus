//页面初始化加载函数
$(function(){
	
	//下拉框数据填充
	selectRender("ruleCreateForm");
	
	debugger;
	//获取业务对象、语义、且或运算符
	var tableNameDicObj=gridSelectColRender("","",{"type":"table_name"},"code","name",true);
	var semantemeDicObj=gridSelectColRender("","",{"type":"semanteme_dic"},"code","name",true);
	var arithmeticDicDicObj=gridSelectColRender("","",{"type":"arithmetic_dic"},"code","name",true);
	
	
	
	var  custom_column_name_element=function(value, options) {
		debugger;
		var rowData = $('#ruleList4CreateGrid').jqGrid('getRowData', options.rowId);
		var table_name=rowData.table_name;
		var el = document.createElement("select");
		$(el).append('<option value="">请选择</option>');
		if(table_name){
			var tableNameDicObj=gridSelectColRender("","",{"type":"column_name","parent_type":"table_name","parent_code":table_name},"code","name",true);
			if(tableNameDicObj && tableNameDicObj.jsonArray && tableNameDicObj.jsonArray.length>0){
				for(var i=0;i<tableNameDicObj.jsonArray.length;i++){
					$(el).append('<option value="'+tableNameDicObj.jsonArray[i].code+'">'+tableNameDicObj.jsonArray[i].name+'</option>');
				}
			}
			$(el).val(rowData.column_name);
		}else{
			$('#ruleList4CreateGrid').jqGrid('setRowData', options.rowId, { column_name: ""});
		}
		el.id=options.rowId+"_"+"column_name_text";
		return el;
	};
	var custom_column_name_get_value=function (elem, operation) {
		debugger;
		var rowid = $(elem).parents("tr:first").attr("id");
		$('#ruleList4CreateGrid').jqGrid('setRowData', rowid, { column_name: elem.val()});
		var optionText=elem.find('option:selected').text();
		return optionText!="请选择"?optionText:"";
	};
	
	
	//构造grid
    $("#ruleList4CreateGrid").jqGrid({
			autowidth:true,
			colNames:['<input type="checkbox" class="rule-create-selall-cbox">',"<span style='color:red;'>*</span>业务对象","column_name","<span style='color:red;'>*</span>字段","<span style='color:red;'>*</span>语义","<span style='color:red;'>*</span>值","<span style='color:red;'>*</span>与或运算"],
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
				{name:'table_name',
					index:'table_name',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					formatter:'select',
					editoptions:{value:tableNameDicObj.jsonStr}
				},
				{ name: 'column_name', hidden: true },
				{name:'column_name_text',
					index:'column_name_text',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'custom', 
					editoptions: {custom_element: custom_column_name_element, custom_value: custom_column_name_get_value} 
				},
				{name:'semanteme',
					index:'semanteme',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					formatter:'select',
					editoptions:{value:semantemeDicObj.jsonStr}
				},
				{name:'dis_value',
					index:'dis_value',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
				},
				{name:'arithmetic',
					index:'arithmetic',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					formatter:'select',
					editoptions:{value:arithmeticDicDicObj.jsonStr}
				}
				
			],
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false,
//			下面有其他代码实现了
//			afterSaveCell:function(rowid, cellname, value, iRow, iCol){
//				if(cellname=="table_name"){
//					$('#ruleList4CreateGrid').jqGrid('setRowData', rowid, { column_name_text:"",column_name:"" });
//				}
//			},
			gridComplete:function(){
		    	$("div[name='ruleTab']").find(".rule-create-selall-cbox").parent("div").attr("class","");
		    }
	});
    
    
    
    //维度新增行
    $("[name='addRule4CreateBtn']").click(function(){
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
    
    
  //grid里面的业务对象改变
    $("div[tabid='ruleCreate']").on("change","select[name='table_name']",function(){
    	var rowid=$(this).parents("tr:first").attr("id");
    	if(rowid){
    		$('#ruleList4CreateGrid').jqGrid('setRowData', rowid, { column_name_text:"",column_name:"" });
    	}
    });
    
    //grid里面的复选框
    $("div[name='ruleTab']").on("click",".rule-create-sel-cbox",function(){
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
    
    
    //维度删除行
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
    
    //新增规则
    $("[name='saveRule4CreateBtn']").click(function(){
    	debugger;
    	var request_data={};
		var checkPass = true;
		var ruleInfo={};
		//1. 获取所有的必填项
		var validDoms = $("#ruleCreateForm").find("[validation]");
		//2. 循环校验
		if(validDoms.length > 0){
			var isFocusError = false;
			$.each(validDoms,function(i){
				var validDomName = $(validDoms[i]).attr('name');
				var elementVal = validateDom(validDomName, "ruleCreateForm");
				if(elementVal){
					ruleInfo[validDomName] = elementVal;
				}else{
					if(!isFocusError){
						$(validDoms[i]).focus();
						isFocusError = true;
					}
					checkPass = false;
				}
			});	
		}
		if(!checkPass){return false;}
		ruleInfo.remark=$("#ruleCreateForm").find("[name='remark']").val();
		ruleInfo.rule_sql=$("#customSql4CreateDiv").find("[name='rule_sql']").val();
		request_data.ruleInfo=ruleInfo;
        //校验grid的数据		
    	var rowids = $("#ruleList4CreateGrid").jqGrid('getDataIDs');
    	var grid_data=[];
    	for(var i=0;i<rowids.length;i++){
      	  var rowData=$("#ruleList4CreateGrid").jqGrid("getRowData",rowids[i]);
      	  $("#ruleList4CreateGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
      	    var inputName=$(input).attr("name");
      		var inputVal=$(input).val();
      		rowData[inputName]=inputVal;
      	  });
      	  $("#ruleList4CreateGrid").find("tr[id='"+rowids[i]+"']").find("select").each(function(i,select){
      		debugger;
      	    var selectName=$(select).attr("name");
      		var selectVal=$(select).val();
      		if(selectName=="column_name_text"){
      			rowData[selectName]=$(select).find('option:selected').text();
      			rowData.column_name=selectVal;
      		}else{
      			rowData[selectName]=selectVal;
      		}
      	  });
  	
      	  grid_data.push(rowData);
      	}    
    	if(grid_data && grid_data.length>0){
    		var isTrue=true;
    		for(var i=0;i<grid_data.length;i++){
    			var rowObj=grid_data[i];
    			if(!rowObj.table_name){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“业务对象”不能为空！","","","warning");
    				isTrue=false;
    				break;    
    			}else if(!rowObj.column_name){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“字段”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.semanteme){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“语义”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.dis_value){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“值”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}
    			else if(!rowObj.arithmetic){
    				messageBox.createMessageDialog("提示","维度信息中的第"+(i+1)+"行的“与或运算”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}
    		}
    		if(!isTrue){
    			return false;
    		}
    	}
    	
    	
    	request_data.dimensionList = grid_data;
    	
		publicSaveAjax("ruleService","insertRule",JSON.stringify(request_data),"ruleTab","ruleCreate","#searchRuleListBtn");
    });    
})