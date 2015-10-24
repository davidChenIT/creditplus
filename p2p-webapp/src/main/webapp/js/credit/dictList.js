//页面初始化加载函数
$(function(){
	debugger;
	var parentId = $("#parentArea").find("a:last").attr("href").replace("#","");
	parentId = parentId==""?0:parentId;
    var request_data={};
    request_data.parentId = parentId;
    
	//构造grid
    $("#dictListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"dictService","method":"getDictListWithPage","request_data":JSON.stringify(request_data)},
			mtype: 'POST',
			autowidth:true,
			height:350,
			colNames:['<input type="checkbox" class="dict-create-selall-cbox">',
			          "操作",
			          "<span style='color:red;'>*</span>名称",
			          "<span style='color:red;'>*</span>编码",
			          "<span style='color:red;'>*</span>类型",
			          "<span style='color:red;'>*</span>状态",
			          "<span style='color:red;'>*</span>顺序",
			          "备注","创建人","创建时间","最后修改人","最后修改时间"],
			colModel :[
			    {
			    	name:'dict_sel_create',
					index:'dict_sel_create',
					align:'center',
					sortable:false,
			    	formatter:function(cellvalue, options, rowObject){
						   debugger;
						   return '<input type="checkbox" class="dict-create-sel-cbox">';
						}
			    },			           
				{name:'dictId', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   if(!rowObject.dictId){
						   return "<span name='dictEditSpan' class='ui-icon-edit' data-val='' data-name=''></span>";
					   }else{
						   return "<span name='dictEditSpan' class='ui-icon-edit' data-val='"+rowObject.dictId+ "' data-name='" + rowObject.name +"'></span>";
					   }
					}
				},
				{name:'name',  index:'name',align:'center',"sortable":false,editable:true},
				{name:'code',  index:'code',align:'center',"sortable":false,editable:true},
				{name:'type',  index:'type',align:'center',"sortable":false,editable:true},
				{name:'state', index:'state',align:'center',"sortable":false,editable:true},
				{name:'orderNumber', index:'orderNumber',align:'center',"sortable":false,editable:true},
				{name:'remark', index:'remark',align:'center',"sortable":false,editable:true},				
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false}
			],
			cellEdit: true,
			cellsubmit:"clientArray",
			pager: '#dictListPager',
//			multiselect: true,
			rowNum:10,
			rowList:[10,20,30],
			viewrecords: true,
			sortable:false,
			emptyrecords:"没有数据！",
			jsonReader : {
		         root:"griddata",  

		         page: "currpage",  

		         total: "totalpages",  

		         records: "totalrecords"

		     },
		     afterEditCell:function (id,name,val,iRow,iCol){
			      $("#"+iRow+"_"+name,"#roleList4CreateGrid").attr("style","width:100%");
			 },		     
		     gridComplete:function(){
			    	debugger;
			    	$("div[name='dictTab']").find(".dict-create-selall-cbox").parent("div").attr("class","");
			 },
			 onPaging:function(pgButton){
				 debugger;
				 var  grid=$(this).jqGrid();
				 gridOnPaging(pgButton,grid,"dictListPager",{});
			 }	     
	});
    
    //grid里面的复选框
    $("div[name='dictTab']").on("click",".dict-create-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='dictTab']").find(".dict-create-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='dictTab']").find(".dict-create-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='dictTab']").find(".dict-create-selall-cbox")[0].checked=false;
    	}
    	
    });    
    
    //全选按钮
    $("div[name='dictTab']").on("click",".dict-create-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='dictTab']").find(".dict-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='dictTab']").find(".dict-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });   
    
    //角色新增行
    $("[name='addDictBtn']").click(function(){
    	debugger;
    	var ids = $("#dictListGrid").jqGrid('getDataIDs');
    	
    	//获得当前最大行号（数据编号）  
        var rowid =0;
        if(ids && ids.length>0){
        	rowid=Math.max.apply(Math,ids);
        }
        //获得新添加行的行号（数据编号）  
        var newrowid = rowid+1;  
        var dataRow = { 
        		dictId:"",
        		name: "",  
        		code:"",  
        		type:'',
        		state:'',
        		orderNumber:'',
        		remark:'',
        		created_by:'',
        		created_date:'',
        		last_updated_by:'',
        		last_updated_date:'',          		
        };      
          
        //将新添加的行插入到第一列  
        $("#dictListGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });    
    
    //给grid列中的修改图标添加点击事件
    $("div[name='dictTab']").on("click",".ui-icon-edit",function(){
    	debugger;
    	var dictName=$(this).attr("data-name");
    	var dictId=$(this).attr("data-val");
        var request_data={};
        if(dictId && dictName){
        	request_data.parentId=dictId;            
        	$("#parentArea").append("<a href='#" + dictId + "'>." +dictName+ "</a>");
        	$("#parentArea").find("a").unbind("click");
        	$("#parentArea").find("a").bind("click",function(){
        		var parentId = $(this).attr("href");
        		parentId = parentId.replace("#","");
    			request_data.parentId=parentId==""? 0:parentId; 
                $("#dictListGrid").jqGrid('setGridParam',{  
                    datatype:'json',  
                    postData:{'request_data':JSON.stringify(request_data)}, //发送数据
                    page:1,
                    rowNum:10
                }).trigger("reloadGrid"); //重新载入 
                $(this).nextAll().remove();
        	}); 
            $("#dictListGrid").jqGrid('setGridParam',{  
                datatype:'json',  
                postData:{'request_data':JSON.stringify(request_data)}, //发送数据
                page:1,
                rowNum:10
            }).trigger("reloadGrid"); //重新载入        	
        }    	
    });

    //输入用户名称，点击按钮进行过滤
    $("#searchDictListBtn").click(function(){
        var dictName = $("input[name='dictName']").val();
    	var parentId = $("#parentArea").find("a:last").attr("href").replace("#","");
    	parentId = parentId==""?0:parentId;
        var request_data={};
        request_data.parentId = parentId;
        if(dictName){
        	request_data.name=dictName;
        }
        
        $("#dictListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的删除按钮
    $("[name='delDictBtn']").click(function(){
        var request_data=[];        
    	$("div[name='dictTab']").find(".dict-create-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				var dictId = $(cbox).parents("tr:first").find("span:first").attr("data-val");
				if(dictId && $.trim(dictId)){
					request_data.push(dictId);
				}else{
		    		$("#dictListGrid").jqGrid("delRowData", $(cbox).parents("tr:first").attr("id")); 
				}
			}
		});
    	
    	if(request_data.length < 1){
    		return;
    	}
    	
		publicSaveAjax("dictService","deleteDict",JSON.stringify(request_data),"","","#searchDictListBtn");
    });
    
    $("[name='saveDictBtn']").click(function(){
    	var checkFlag = true;
    	var parentId = $("#parentArea").find("a:last").attr("href").replace("#","");
    	parentId = parentId==""?0:parentId;
    	
    	var grid_data=[];
    	var rowids = $("#dictListGrid").jqGrid('getDataIDs');
    	for(var i=0;i<rowids.length;i++){
    	  var rowData=$("#dictListGrid").jqGrid("getRowData",rowids[i]);
    	  $("#dictListGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
    	    var inputName=$(input).attr("name");
    		var inputVal=$(input).val();
    		rowData[inputName]=inputVal;
    	  });
    	  $("#dictListGrid").find("tr[id='"+rowids[i]+"']").find("textarea").each(function(i,textarea){
    	    var textareaName=$(textarea).attr("name");
    		var textareaVal=$(textarea).val();
    		rowData[textareaName]=textareaVal;
    	  });
    	  rowData.parent_id = parentId;
    	  grid_data.push(rowData);
    	}
    	
    	$.each(grid_data,function(i,item){
    		var dictId = $(item.dictId).attr("data-val");
    		if(!dictId || !$.trim(dictId)){
    			item.dictId = null;
    		}else{
    			item.dictId = dictId * 1;
    		}
    		
    		if(!item.name || !$.trim(item.name)){
    			messageBox.createMessageDialog("提示","第" + i + "行名称不能为空！","","","warning");
    			checkFlag = false;
    		}
    	});
    	
    	if(!checkFlag){
    		return;
    	}
    	
    	var request_data={};
    	request_data.parentId = parentId;
    	request_data.griddata = grid_data;
		//调用服务
		publicSaveAjax("dictService","insertDict",JSON.stringify(request_data),"","","#searchDictListBtn");
    });    
})