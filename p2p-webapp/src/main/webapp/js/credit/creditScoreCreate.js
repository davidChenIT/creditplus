//页面初始化加载函数
$(function(){
	
	debugger;
	
	//构造grid
    $("#creditScoreItemList4CreateGrid").jqGrid({
			autowidth:true,
			colNames:['<input type="checkbox" class="credit-score-create-selall-cbox">',"<span style='color:red;'>*</span>主表","<span style='color:red;'>*</span>子表","<span style='color:red;'>*</span>关联字段","<span style='color:red;'>*</span>分数计算表达式","<span style='color:red;'>*</span>分数"],
			colModel :[
			    {
			    	name:'rule_sel_create',
					index:'rule_sel_create',
					align:'center',
					width:"7%",
					sortable:false,
			    	formatter:function(cellvalue, options, rowObject){
						   debugger;
						   return '<input type="checkbox" class="credit-score-create-sel-cbox">';
						}
			    },
				{name:'main_table',
					index:'main_table',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%"
				},
				{name:'child_table',
					index:'child_table',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%"
				},
				{name:'relevance_colum',
					index:'relevance_colum',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%"
				},
				{name:'expression',
					index:'expression',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%"
				},
				{name:'score',
					index:'score',
					align:'center',
					sortable:false,
					editable:true,
					width:"31%",
				}
			],
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false,
			gridComplete:function(){
		    	debugger;
		    	$("div[name='creditScoreTab']").find(".credit-score-create-selall-cbox").parent("div").attr("class","");
		    }
	});
    
    
    
    //维度新增行
    $("[name='addCreditScoreItem4CreateBtn']").click(function(){
    	debugger;
    	var ids = $("#creditScoreItemList4CreateGrid").jqGrid('getDataIDs');
    	
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
        $("#creditScoreItemList4CreateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    //grid里面的复选框
    $("div[name='creditScoreTab']").on("click",".credit-score-create-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='creditScoreTab']").find(".credit-score-create-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='creditScoreTab']").find(".credit-score-create-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='creditScoreTab']").find(".credit-score-create-selall-cbox")[0].checked=false;
    	}
    	
    });
    
    //全选按钮
    $("div[name='creditScoreTab']").on("click",".credit-score-create-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='creditScoreTab']").find(".credit-score-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='creditScoreTab']").find(".credit-score-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });
    
    
    //维度删除行
    $("[name='delCreditScoreItem4CreateBtn']").click(function(){
    	debugger;
    	var selRowIds=[];
    	$("div[name='creditScoreTab']").find(".credit-score-create-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#creditScoreItemList4CreateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
    //新增规则
    $("[name='saveCreditScore4CreateBtn']").click(function(){
    	debugger;
    	var request_data={};
		var checkPass = true;
    	//1. 获取所有的必填项
		var requiredDoms = $("#creditScoreCreateForm").find("[validtion*='required']");
		var creditInfo={};
		//2. 循环校验
		if(requiredDoms.length > 0){
			var isFocusError = false;
			$.each(requiredDoms,function(i,dom){
				var validDomName = $(dom).attr('name');
				var elementVal = validateRequire(validDomName,"此项为必填！","creditScoreCreateForm");
				if(elementVal){
					creditInfo[validDomName] = elementVal;
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
		creditInfo.remark=$("#creditScoreCreateForm").find("[name='remark']").val();
		request_data.creditInfo=creditInfo;
        //校验grid的数据		
    	var rowids = $("#creditScoreItemList4CreateGrid").jqGrid('getDataIDs');
    	var grid_data=[];
    	for(var i=0;i<rowids.length;i++){
      	  var rowData=$("#creditScoreItemList4CreateGrid").jqGrid("getRowData",rowids[i]);
      	  $("#creditScoreItemList4CreateGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
      	    var inputName=$(input).attr("name");
      		var inputVal=$(input).val();
      		rowData[inputName]=inputVal;
      	  });
      	  grid_data.push(rowData);
      	}    
    	if(grid_data && grid_data.length>0){
    		var isTrue=true;
    		for(var i=0;i<grid_data.length;i++){
    			var rowObj=grid_data[i];
    			if(!rowObj.main_table){
    				messageBox.createMessageDialog("提示","信用评分项中的第"+(i+1)+"行的“主表”不能为空！","","","warning");
    				isTrue=false;
    				break;    
    			}else if(!rowObj.relevance_colum){
    				messageBox.createMessageDialog("提示","信用评分项中的第"+(i+1)+"行的“关联字段”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.expression){
    				messageBox.createMessageDialog("提示","信用评分项中的第"+(i+1)+"行的“分数计算表达式”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}else if(!rowObj.score){
    				messageBox.createMessageDialog("提示","信用评分项中的第"+(i+1)+"行的“分数”不能为空！","","","warning");
    				isTrue=false;
    				break;
    			}
    		}
    		if(!isTrue){
    			return false;
    		}
    	}
    	
    	
    	request_data.creditItemsList = grid_data;
    	
		publicSaveAjax("creditScoreService","insertCreditScore",JSON.stringify(request_data),"creditScoreTab","creditScoreCreate","#searchCreditScoreListBtn");
    });    
})