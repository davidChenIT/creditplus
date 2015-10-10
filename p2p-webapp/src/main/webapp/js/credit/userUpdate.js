//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
    $("#roleList4UpdateGrid").jqGrid({
    	autowidth:true,
		colNames:['<input type="checkbox" class="role-update-selall-cbox">',"角色","开始时间","结束时间"],
		colModel :[
		    {
		    	name:'role_sel_update',
				index:'role_sel_update',
				align:'center',
				width:"7%",
				sortable:false,
		    	formatter:function(cellvalue, options, rowObject){
					   debugger;
					   return '<input type="checkbox" class="role-update-sel-cbox">';
					}
		    },
			{name:'rolename',
				index:'rolename',
				align:'center',
				sortable:false,
				editable:true,
				width:"31%",
				edittype:'select',
				editrules:{required:true},
				editoptions:{value:"admin:admin;anyone:andone"}
				
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
			}
		],
		cellEdit: true,
		cellsubmit:"clientArray",
		sortable:false,
		afterEditCell:function (id,name,val,iRow,iCol){
	        if(name=='start_date' || name=='end_date') {
	          $("#"+iRow+"_"+name,"#roleList4UpdateGrid").attr("style","width:100%");
	          $("#"+iRow+"_"+name,"#roleList4UpdateGrid").datepicker({dateFormat:"yy-mm-dd"});
	        }
	    },gridComplete:function(){
	    	debugger;
	    	$("div[name='userTab']").find(".role-update-selall-cbox").parent("div").attr("class","");
	    }
	});
    
    
  //角色新增行
    $("[name='addRole4UpdateBtn']").click(function(){
    	debugger;
    	var ids = $("#roleList4UpdateGrid").jqGrid('getDataIDs');
    	
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
        $("#roleList4UpdateGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });
    
    //grid里面的复选框
    $("div[name='userTab']").on("click",".role-update-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='userTab']").find(".role-update-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='userTab']").find(".role-update-selall-cbox")[0].checked=false;
    	}
    	
    });
    
    //全选按钮
    $("div[name='userTab']").on("click",".role-update-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });
    
    
    //角色删除行
    $("[name='delRole4UpdateBtn']").click(function(){
    	debugger;
    	var selRowIds=[];
    	$("div[name='userTab']").find(".role-update-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#roleList4UpdateGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
})