//页面初始化加载函数
$(function(){
	debugger;
	var paramsObj=$("div[name='creditScoreTab']").find("li[tabid='creditScoreUpdate']").data();
	var score_id=paramsObj.score_id || "";
	//查询详细信息，并赋值
	publicQueryInfoAjax("creditScoreService","getCreditScoreById",JSON.stringify({"score_id":score_id}),"creditScoreUpdateForm");
	//grid中的数据字典
	var semantemeDicObj=gridSelectColRender("","",{"type":"semanteme_dic"},"code","name",true);
	var incomeIntervalDicObj={"jsonArray":[],"jsonStr":""};
	var  custom_dimension_value_element=function(value, options) {
		debugger;
		var rowData = $('#creditScoreItemList4UpdateGrid').jqGrid('getRowData', options.rowId);
		var dimension_column=$("#dimension_column_4update_cascade").find("option:selected").val();
		var el = document.createElement("select");
		$(el).append('<option value="">请选择</option>');
		if(dimension_column){
			var parent_code=$("#dimension_column_4update_cascade").val();
    		var parent_id=$("#dimension_column_4update_cascade").find("option:selected").attr("item-val");
    		if(parent_id && parent_code){
    			incomeIntervalDicObj=gridSelectColRender("","",{"type":"dimension_value","parent_type":"dimension_column","parent_code":parent_code,"parent_id":parent_id},"code","name",true);
    		}else{
    			incomeIntervalDicObj={"jsonArray":[],"jsonStr":""};
    		}
			if(incomeIntervalDicObj && incomeIntervalDicObj.jsonArray && incomeIntervalDicObj.jsonArray.length>0){
				for(var i=0;i<incomeIntervalDicObj.jsonArray.length;i++){
					$(el).append('<option value="'+incomeIntervalDicObj.jsonArray[i].code+'">'+incomeIntervalDicObj.jsonArray[i].name+'</option>');
				}
			}
			$(el).val(rowData.dimension_value);
		}else{
			$('#creditScoreItemList4UpdateGrid').jqGrid('setRowData', options.rowId, { dimension_value: ""});
		}
		el.id=options.rowId+"_"+"dimension_value_text";
		return el;
	};
	var custom_dimension_value_get_value=function (elem, operation) {
		debugger;
		var rowid = $(elem).parents("tr:first").attr("id");
		$('#creditScoreItemList4UpdateGrid').jqGrid('setRowData', rowid, { dimension_value: elem.val()});
		var optionText=elem.find('option:selected').text();
		return optionText!="请选择"?optionText:"";
	};
	//构造grid
	var isFirstLoadGrid=true;
    $("#creditScoreItemList4UpdateGrid").jqGrid({
	    	url:serviceAddress,
			datatype: 'json',
			postData:{"module":"creditScoreService","method":"getCreditItemById","request_data":JSON.stringify({"score_id":score_id})},
			mtype: 'POST',
			autowidth:true,
			colNames:['<input type="checkbox" class="credit-score-update-selall-cbox">',"<span style='color:red;'>*</span>序号","<span style='color:red;'>*</span>运算符","","<span style='color:red;'>*</span>刻度描述","<span style='color:red;'>*</span>分数"],
			colModel :[
			    {
			    	name:'rule_sel_create',
					index:'rule_sel_create',
					align:'center',
					width:"5%",
					sortable:false,
			    	formatter:function(cellvalue, options, rowObject){
						   debugger;
						   return '<input type="checkbox" class="credit-score-update-sel-cbox">';
						}
			    },
				{name:'sequence_num',
					index:'sequence_num',
					align:'center',
					sortable:false,
					editable:true,
					width:"15%"
				},
				{name:'arithmetic',
					index:'arithmetic',
					align:'center',
					sortable:false,
					editable:true,
					width:"25%",
					edittype:'select',
					formatter:'select',
					editoptions:{value:semantemeDicObj.jsonStr}
				},
				{name:'dimension_value',
					index:'dimension_value',
					align:'center',
					sortable:false,
					hidden:true
				},
				{name:'dimension_value_text',
					index:'dimension_value_text',
					align:'center',
					sortable:false,
					editable:true,
					width:"30%",
					edittype:'custom', 
					editoptions: {custom_element: custom_dimension_value_element, custom_value: custom_dimension_value_get_value}
				},
				{name:'score',
					index:'score',
					align:'center',
					sortable:false,
					editable:true,
					width:"25%"
				}
				
			],
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false,
			gridComplete:function(){
		    	debugger;
		    	$("div[name='creditScoreTab']").find(".credit-score-update-selall-cbox").parent("div").attr("class","");
		    	if(isFirstLoadGrid){
		    		var parent_code=$("#dimension_column_4update_cascade").val();
		    		var parent_id=$("#dimension_column_4update_cascade").find("option:selected").attr("item-val");
		    		var allRowDatas=$('#creditScoreItemList4UpdateGrid').jqGrid().getRowData();
			    	if(allRowDatas && allRowDatas.length>0){
			    		var dimensionValueDicObj=gridSelectColRender("","",{"type":"dimension_value","parent_type":"dimension_column","parent_code":parent_code,"parent_id":parent_id},"code","name",true);
			    		var dimensionValueDicArray=dimensionValueDicObj.jsonArray;
			    		for(var i=0;i<allRowDatas.length;i++){
				    		var dimension_value=allRowDatas[i].dimension_value;
				    		var dimension_value_text="";
				    		for(var j=0;j<dimensionValueDicArray.length;j++){
				    			if(dimension_value==dimensionValueDicArray[j].code){
				    				dimension_value_text=dimensionValueDicArray[j].name;
				    				break;
				    			}
				    		}
				    		$('#creditScoreItemList4UpdateGrid').jqGrid('setRowData', (i+1), { dimension_value_text: dimension_value_text });
				    	}
			    	}
		    	}
		    	isFirstLoadGrid=false;
		    }
	});
	
    
    
    
    //维度新增行
    $("[name='addCreditScoreItem4UpdateBtn']").click(function(){
    	debugger;
    	var ids = $("#creditScoreItemList4UpdateGrid").jqGrid('getDataIDs');
    	
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
        $("#creditScoreItemList4UpdateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    
  //grid里面的复选框
    $("div[name='creditScoreTab']").on("click",".credit-score-update-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='creditScoreTab']").find(".credit-score-update-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='creditScoreTab']").find(".credit-score-update-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='creditScoreTab']").find(".credit-score-update-selall-cbox")[0].checked=false;
    	}
    	
    });
    
    //全选按钮
    $("div[name='creditScoreTab']").on("click",".credit-score-update-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='creditScoreTab']").find(".credit-score-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='creditScoreTab']").find(".credit-score-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });
    
    
  //维度删除行
    $("[name='delCreditScoreItem4UpdateBtn']").click(function(){
    	debugger;
    	var selRowIds=[];
    	$("div[name='creditScoreTab']").find(".credit-score-update-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#creditScoreItemList4UpdateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
    //新增规则
    $("[name='saveCreditScore4UpdateBtn']").click(function(){
    	debugger;
    	var request_data={};
		var checkPass = true;
		//1. 获取所有的必填项
		var creditInfo={};
		//1. 获取所有的必填项
		var validDoms = $("#creditScoreUpdateForm").find("[validation]");
		//2. 循环校验
		if(validDoms.length > 0){
			var isFocusError = false;
			$.each(validDoms,function(i){
				var validDomName = $(validDoms[i]).attr('name');
				var elementVal = validateDom(validDomName, "creditScoreUpdateForm");
				if(elementVal){
					creditInfo[validDomName] = elementVal;
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
		creditInfo.remark=$("#creditScoreUpdateForm").find("[name='remark']").val();
		creditInfo.score_id=score_id;
		request_data.creditInfo=creditInfo;
        //校验grid的数据		
    	var rowids = $("#creditScoreItemList4UpdateGrid").jqGrid('getDataIDs');
    	var grid_data=[];
    	for(var i=0;i<rowids.length;i++){
      	  var rowData=$("#creditScoreItemList4UpdateGrid").jqGrid("getRowData",rowids[i]);
      	  $("#creditScoreItemList4UpdateGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
      	    var inputName=$(input).attr("name");
      		var inputVal=$(input).val();
      		rowData[inputName]=inputVal;
      	  });
      	  $("#creditScoreItemList4UpdateGrid").find("tr[id='"+rowids[i]+"']").find("select").each(function(i,select){
      		debugger;
      	    var selectName=$(select).attr("name");
      		var selectVal=$(select).val();
      		if(selectName=="dimension_value_text"){
      			rowData[selectName]=$(select).find('option:selected').text();
      			rowData.dimension_value=selectVal;
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
    			if(!rowObj.sequence_num){
    				messageBox.createMessageDialog("提示","刻度配置信息中的第"+(i+1)+"行的“序号”不能为空！","","","warning");
    				isTrue=false;
    				break;    
    			}else if(!domValid.number(rowObj.sequence_num)){
    				messageBox.createMessageDialog("提示","刻度配置信息中的第"+(i+1)+"行的“序号”必须是整数！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.arithmetic){      
    				messageBox.createMessageDialog("提示","刻度配置信息中的第"+(i+1)+"行的“运算符”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.dimension_value){
    				messageBox.createMessageDialog("提示","刻度配置信息中的第"+(i+1)+"行的“刻度描述”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.score){
    				messageBox.createMessageDialog("提示","刻度配置信息中的第"+(i+1)+"行的“分数”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!domValid.number(rowObj.score)){
    				messageBox.createMessageDialog("提示","刻度配置信息中的第"+(i+1)+"行的“分数”必须是整数！","","","warning");
    				isTrue=false;
    				break;
    			}
    		}
    		if(!isTrue){
    			return false;
    		}
    	}
    	request_data.creditItemsList = grid_data;
    	
    	publicSaveAjax("creditScoreService","updateCreditScore",JSON.stringify(request_data),"creditScoreTab","creditScoreUpdate","#searchCreditScoreListBtn");
    });   
    
    
    /**
	 * 清空省份下拉框onChange事件
	 */
	$("#creditScoreUpdateForm").find("[trigger*=_cascade]").unbind('change');
	/**
	 * 省份下拉框onChange事件，级联城市数据
	 */
	$("#creditScoreUpdateForm").find("[trigger*=_cascade]").change(function(e){
		elementCascade(e.target, $(e.target).val());
	});
	
	//切换选择维度列值，对应将grid中选择过的刻度描述值清空
	$("#dimension_column_4update_cascade").change(function(){
		debugger;
//		var parent_code=$(this).val();
//		var parent_id=$(this).find("option:selected").attr("item-val");
		var grid=$("#creditScoreItemList4UpdateGrid");
		//获取grid的所有行的id
		var ids =  grid.jqGrid('getDataIDs');
		if(ids && ids.length>0){
			for(var i=0;i<ids.length;i++){
				grid.jqGrid('setRowData', ids[i], { dimension_value:"",dimension_value_text:""});
			}
		}
//		if(parent_id && parent_code){
//			incomeIntervalDicObj=gridSelectColRender("","",{"type":"dimension_value","parent_type":"dimension_column","parent_code":parent_code,"parent_id":parent_id},"code","name",true);
//		}else{
//			incomeIntervalDicObj={"jsonArray":[],"jsonStr":""};
//		}
	});
	
})