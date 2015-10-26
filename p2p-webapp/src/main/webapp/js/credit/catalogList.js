//页面初始化加载函数
$(function(){
	debugger;
	//构造grid
    $("#catalogListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"catalogService","method":"getCatalogListWithPage"},
			mtype: 'POST',
			autowidth:true,
			height:290,
			colNames:['<input type="checkbox" class="catalog-create-selall-cbox">',
			           "操作",
			           "<span style='color:red;'>*</span>栏目名称",
			           "URL",
			           "<span style='color:red;'>*</span>顺序","备注","创建人","创建时间","最后修改人","最后修改时间"],
			colModel :[
			    {
			    	name:'catalog_sel_create',
					index:'catalog_sel_create',
					align:'center',
					sortable:false,
			    	formatter:function(cellvalue, options, rowObject){
						   debugger;
						   return '<input type="checkbox" class="catalog-create-sel-cbox">';
						}
			    },				           
				{name:'catalogId', index:'operate_col',align:'center',"sortable":false,width:"100px",
					formatter:function(cellvalue, options, rowObject){
					   debugger;
					   if(!rowObject.catalogId){
						   return "<span name='catalogEditSpan' class='ui-icon-edit' data-val='' data-name=''></span>";
					   }else{
						   return "<span name='catalogEditSpan' class='ui-icon-edit' data-val='"+rowObject.catalogId+ "' data-name='" + rowObject.catalogName +"'></span>";
					   }
					}
				},
				{name:'catalogName', index:'catalogName',align:'center',"sortable":false,editable:true},
				{name:'url', index:'url',align:'center',"sortable":false,editable:true},
				{name:'orderNumber', index:'orderNumber',align:'center',"sortable":false,editable:true},
				{name:'remark', index:'remark',align:'center',"sortable":false,editable:true},
				{name:'created_by', index:'created_by',align:'center',"sortable":false},
				{name:'created_date', index:'created_date',align:'center',"sortable":false},
				{name:'last_updated_by', index:'last_updated_by',align:'center',"sortable":false},
				{name:'last_updated_date', index:'last_updated_date',align:'center',"sortable":false}
			],
			cellEdit: true,
			cellsubmit:"clientArray",			
			pager: '#catalogListPager',
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
			    	$("div[name='catalogTab']").find(".catalog-create-selall-cbox").parent("div").attr("class","");
			 }		     
	});
    
    //grid里面的复选框
    $("div[name='catalogTab']").on("click",".catalog-create-sel-cbox",function(){
    	debugger;
    	var isSelAll=true;
    	$("div[name='catalogTab']").find(".catalog-create-sel-cbox").each(function(i,cbox){
    		var ischecked=$(cbox)[0].checked;
    		if(!ischecked){
    			isSelAll=false;
    			return false;
    		}
    	});
    	if(isSelAll){
    		$("div[name='catalogTab']").find(".catalog-create-selall-cbox")[0].checked=true;
    	}else{
    		$("div[name='catalogTab']").find(".catalog-create-selall-cbox")[0].checked=false;
    	}
    	
    });    
    
    //全选按钮
    $("div[name='catalogTab']").on("click",".catalog-create-selall-cbox",function(){
    	debugger;
    	var  isChecked=$(this)[0].checked;
    	if(isChecked){
    		$("div[name='catalogTab']").find(".catalog-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=true;
    		});
    	}else{
    		$("div[name='catalogTab']").find(".catalog-create-sel-cbox").each(function(i,cbox){
    			$(cbox)[0].checked=false;
    		});
    	}
    });   
    
    //角色新增行
    $("[name='addCatalogBtn']").click(function(){
    	debugger;
    	var ids = $("#catalogListGrid").jqGrid('getDataIDs');
    	
    	//获得当前最大行号（数据编号）  
        var rowid =0;
        if(ids && ids.length>0){
        	rowid=Math.max.apply(Math,ids);
        }
        //获得新添加行的行号（数据编号）  
        var newrowid = rowid+1;  
        var dataRow = { 
        		catalogId:"",
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
        $("#catalogListGrid").jqGrid("addRowData", newrowid, dataRow, "first");
    });    
    
    //给grid列中的修改图标添加点击事件
    $("div[name='catalogTab']").on("click",".ui-icon-edit",function(){
    	debugger;
    	var catalogName=$(this).attr("data-name");
    	var catalogId=$(this).attr("data-val");
        var request_data={};
        if(catalogId && catalogName){
        	request_data.parentId=catalogId;            
        	$("#parentArea").append("<a href='#" + catalogId + "'>." +catalogName+ "</a>");
        	$("#parentArea").find("a").unbind("click");
        	$("#parentArea").find("a").bind("click",function(){
        		var parentId = $(this).attr("href");
        		parentId = parentId.replace("#","");
    			request_data.parentId=parentId==""? 0:parentId; 
                $("#catalogListGrid").jqGrid('setGridParam',{  
                    datatype:'json',  
                    postData:{'request_data':JSON.stringify(request_data)}, //发送数据
                    page:1,
                    rowNum:10
                }).trigger("reloadGrid"); //重新载入 
                $(this).nextAll().remove();
        	}); 
            $("#catalogListGrid").jqGrid('setGridParam',{  
                datatype:'json',  
                postData:{'request_data':JSON.stringify(request_data)}, //发送数据
                page:1,
                rowNum:10
            }).trigger("reloadGrid"); //重新载入        	
        }    	
    });

    //输入用户名称，点击按钮进行过滤
    $("#searchCatalogListBtn").click(function(){
        var catalogName = $("input[name='catalogName']").val();
    	var parentId = $("#parentArea").find("a:last").attr("href").replace("#","");
    	parentId = parentId==""?0:parentId;
        var request_data={};
        request_data.parentId = parentId;
        if(catalogName){
        	request_data.name=catalogName;
        }
        $("#catalogListGrid").jqGrid('setGridParam',{  
            datatype:'json',  
            postData:{'request_data':JSON.stringify(request_data)}, //发送数据
            page:1,
            rowNum:10
        }).trigger("reloadGrid"); //重新载入
    	
    });
    
    //点击用户列表中的删除按钮
    $("[name='delCatalogBtn']").click(function(){
    	var request_data=[];
    	$("div[name='catalogTab']").find(".catalog-create-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				var catalogId = $(cbox).parents("tr:first").find("span:first").attr("data-val");
				if(catalogId && $.trim(catalogId)){
					request_data.push(catalogId);
				}else{
		    		$("#catalogListGrid").jqGrid("delRowData", $(cbox).parents("tr:first").attr("id")); 
				}			
			}
		});
    	
    	if(request_data.length < 1){
    		return;
    	}
    	
		publicSaveAjax("catalogService","deleteCatalog",JSON.stringify(request_data),"","","#searchCatalogListBtn"); 
    });
    
    $("[name='saveCatalogBtn']").click(function(){
    	debugger;

    	var checkFlag = true;
    	var parentId = $("#parentArea").find("a:last").attr("href").replace("#","");
    	parentId = parentId==""?0:parentId;
    	
    	var grid_data=[];
    	var rowids = $("#catalogListGrid").jqGrid('getDataIDs');
    	for(var i=0;i<rowids.length;i++){
    	  var rowData=$("#catalogListGrid").jqGrid("getRowData",rowids[i]);
    	  $("#catalogListGrid").find("tr[id='"+rowids[i]+"']").find("input[type='text']").each(function(i,input){
    	    var inputName=$(input).attr("name");
    		var inputVal=$(input).val();
    		rowData[inputName]=inputVal;
    	  });
    	  
    	  $("#catalogListGrid").find("tr[id='"+rowids[i]+"']").find("textarea").each(function(i,textarea){
    	    var textareaName=$(textarea).attr("name");
    		var textareaVal=$(textarea).val();
    		rowData[textareaName]=textareaVal;
    	  });
    	  
    	  rowData.parent_id = parentId;
    	  grid_data.push(rowData);
    	}
    	
    	$.each(grid_data,function(i,item){
    		var catalogId = $(item.catalogId).attr("data-val");
    		if(!catalogId || !$.trim(catalogId)){
    			item.catalogId = null;
    		}else{
    			item.catalogId = catalogId*1;
    		}
    		
    		if(!item.catalogName || !$.trim(item.catalogName)){
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
		publicSaveAjax("catalogService","insertCatalog",JSON.stringify(request_data),"","","#searchCatalogListBtn");
    	
    });    
})