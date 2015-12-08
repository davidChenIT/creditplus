//页面初始化加载函数
$(function(){
	debugger;
	var paramsObj=$("div[name='ruleTab']").find("li[tabid='ruleUpdate']").data();
	var ruleId=paramsObj.rule_id || "";
	//查询详细信息，并赋值
	var ruleData=publicQueryInfoAjax("ruleService","getRuleDetailById",JSON.stringify({"rule_id":ruleId}),"ruleUpdateForm");
	setValues("customSql4UpdateDiv", ruleData);
	if(ruleData && ruleData.rule_sql){
		$("h3[name='customSql4UpdateH3']").find("span").click();
	}
	
	//获取业务对象、语义、且或运算符
	var tableNameDicObj=gridSelectColRender("","",{"type":"table_name"},"code","name",true);
	var semantemeDicObj=gridSelectColRender("","",{"type":"semanteme_dic"},"code","name",true);
	var arithmeticDicDicObj=gridSelectColRender("","",{"type":"arithmetic_dic"},"code","name",true);
	
	
	var  custom_column_name_element=function(value, options) {
		debugger;
		var rowData = $('#ruleList4UpdateGrid').jqGrid('getRowData', options.rowId);
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
		$('#ruleList4UpdateGrid').jqGrid('setRowData', rowid, { column_name: elem.val()});
		return elem.find('option:selected').text() || "";
	};
	
	
	//构造grid
	var isFirstLoadGrid=true;
    $("#ruleList4UpdateGrid").jqGrid({
	    	url:serviceAddress,
			datatype: 'json',
			postData:{"module":"ruleService","method":"getDimensionListByRuleId","request_data":JSON.stringify({"rule_id":ruleId})},
			mtype: 'POST',
			autowidth:true,
			colNames:['<input type="checkbox" class="rule-update-selall-cbox">',"<span style='color:red;'>*</span>业务对象","column_name","<span style='color:red;'>*</span>字段","<span style='color:red;'>*</span>语义","<span style='color:red;'>*</span>值","<span style='color:red;'>*</span>与或运算"],
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
				{ name:'column_name', hidden: true },
				{name:'column_name_text',
					index:'column_name_text',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					editrules:{required:true},
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
					editrules:{required:true},
					width:"31%",
				},
				{name:'arithmetic',
					index:'arithmetic',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
					edittype:'select',
					editrules:{required:true},
					formatter:'select',
					editoptions:{value:arithmeticDicDicObj.jsonStr}
				}
				
			],
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false,
//			下面有其他代码实现了
//			afterSaveCell:function(rowid, cellname, value, iRow, iCol){
//				debugger;
//				if(cellname=="table_name"){
//					$('#ruleList4UpdateGrid').jqGrid('setRowData', rowid, { column_name_text:"",column_name:"" });
//				}
//			},
			gridComplete:function(){
		    	debugger;
		    	$("div[name='ruleTab']").find(".rule-update-selall-cbox").parent("div").attr("class","");
		    	if(isFirstLoadGrid){
		    		var allRowDatas=$('#ruleList4UpdateGrid').jqGrid().getRowData();
			    	if(allRowDatas && allRowDatas.length>0){
			    		var columnNameDicObj=gridSelectColRender("","",{"type":"column_name"},"code","name",true);
			    		var columnNameDicItemArry=columnNameDicObj.jsonArray;
			    		for(var i=0;i<allRowDatas.length;i++){
				    		var column_name=allRowDatas[i].column_name;
				    		var column_name_text="";
				    		for(var j=0;j<columnNameDicItemArry.length;j++){
				    			if(column_name==columnNameDicItemArry[j].code){
				    				column_name_text=columnNameDicItemArry[j].name;
				    				break;
				    			}
				    		}
				    		$('#ruleList4UpdateGrid').jqGrid('setRowData', (i+1), { column_name_text: column_name_text });
				    	}
			    	}
		    	}
		    	isFirstLoadGrid=false;
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
    
    
    //grid里面的业务对象改变
    $("div[tabid='ruleUpdate']").on("change","select[name='table_name']",function(){
    	debugger;
    	var rowid=$(this).parents("tr:first").attr("id");
    	if(rowid){
    		$('#ruleList4UpdateGrid').jqGrid('setRowData', rowid, { column_name_text:"",column_name:"" });
    	}
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
		var ruleInfo={};
		//1. 获取所有的必填项
		var validDoms = $("#ruleUpdateForm").find("[validation]");
		//2. 循环校验
		if(validDoms.length > 0){
			var isFocusError = false;
			$.each(validDoms, function(i){
				var validDomName = $(validDoms[i]).attr('name');
				var domValue = $(validDoms[i]).val();
				var checkResult = validateDom(validDoms[i], "ruleUpdateForm");
				// 校验失败获得焦点
				if(!checkResult){
					if(!isFocusError){
						$(validDoms[i]).focus();
						isFocusError = true;
					}
					checkPass = false;
				}else{
					ruleInfo[validDomName] = domValue;
				}
			});
		}
		if(!checkPass){return false;}
		ruleInfo.remark=$("#ruleUpdateForm").find("[name='remark']").val();
		ruleInfo.rule_sql=$("#customSql4UpdateDiv").find("[name='rule_sql']").val();
		ruleInfo.rule_name=$("#ruleUpdateForm").find("[name='rule_name']").text();
		ruleInfo.rule_id=ruleId;
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
    			}else if(!rowObj.arithmetic){
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
    	
    	publicSaveAjax("ruleService","updateRule",JSON.stringify(request_data),"ruleTab","ruleUpdate","#searchRuleListBtn");
    });   
    
	
})