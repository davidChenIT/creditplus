//页面初始化加载函数
$(function(){
	debugger;
	var  myelem=function(value, options) {
		debugger;
		var el = document.createElement("input");
		el.type="text";
		el.value = value;
		$(el).datepicker({
			inline: true,
			dateFormat:'yy-mm-dd'
		});
		return el;
	};
	var myvalue=function (elem) {
		debugger;
		return $(elem).val();
	};
	//构造grid
    $("#roleList4CreateGrid").jqGrid({
			autowidth:true,
			colNames:["角色","开始时间","结束时间"],
			colModel :[
				{name:'rolename',
					index:'rolename',
					align:'center',
					sortable:false,
					editable:true,
					edittype:'select',
					editrules:{required:true},
					editoptions:{value:"admin:admin;anyone:andone"}
					
				},
				{name:'start_date', 
					index:'start_date',
					align:'center',
					"sortable":false,
					editable:true,
					edittype:'custom',
					editoptions:{custom_element:myelem, custom_value:myvalue} 
				},
				{name:'end_date', index:'end_date',
					align:'center',"sortable":false,
					editable:true,edittype:'custom',
					editoptions:{custom_element:myelem, custom_value:myvalue}
				}
			],
			multiselect: true,
			cellEdit: true,
			cellsubmit:"clientArray",
			sortable:false
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
    
    //角色删除行
    $("[name='delRole4CreateBtn']").click(function(){
    	debugger;
    	//获得选中行的ID数组
    	var ids = $("#roleList4CreateGrid").jqGrid('getGridParam','selarrrow');
    	var selRowIds =[]; 
    	if(ids && ids.length>0){
    		for(var i=0;i<ids.length;i++){
    			selRowIds.push(ids[i]);
    		}
    	}
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#roleList4CreateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
})