//页面初始化加载函数
$(function(){
	debugger;
	var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";
	//构造grid
    $("#dictListGrid").jqGrid({
			url:serviceAddress,
			datatype: 'json',
			postData:{"module":"dictService","method":"getDictListWithPage"},
			mtype: 'POST',
			autowidth:true,
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
						   return "<span name='dictEditSpan' class='ui-icon-edit' data-val=''></span>";
					   }else{
						   return "<span name='dictEditSpan' class='ui-icon-edit' data-val='"+rowObject.dictId+"'></span>";
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
    	var dictId=$(this).attr("data-val");
    	var dictUpdate=$("div[name='dictTab']").find("li[tabid='dictUpdate']");
    	if(dictUpdate && dictUpdate.length>0){
    		$("div[name='dictTab']").find("li[tabid='dictUpdate']").remove();
    		$("div[name='dictTab']").find("div[tabid='dictUpdate']").remove();
    	}
    	$("div[name='dictTab']").find(".tabs-head li").attr("class","");
    	var dictUpdateLi='<li tabid="dictUpdate" class="tabs-selected"><span>修改用户</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='dictTab']").find(".tabs-head ul").append(dictUpdateLi);
    	$(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
    	
    	var jsFileUrl="/p2p-webapp/js/credit/dictUpdate.js";
    	$("script[src='"+jsFileUrl+"']").remove();
		var requestUrl="http://"+window.location.host+"/p2p-webapp/page/systemmng/dictUpdate.html";
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='dictTab']").find(".tabs-body").append(data);
					$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
				}
			},error:function(error){
				$("div[name='dictTab']").find(".tabs-body").append('<div tabid="dictUpdate" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
    });

    //输入用户名称，点击按钮进行过滤
    $("#searchDictListBtn").click(function(){
        var dictname = $("input[name='dictName']").val();
        var request_data={};
        if(dictname){
        	request_data.dictname=dictname;
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
    	var selRowIds=[];
    	$("div[name='dictTab']").find(".dict-create-sel-cbox").each(function(i,cbox){
			var ischecked=$(cbox)[0].checked;
			if(ischecked){
				selRowIds.push($(cbox).parents("tr:first").attr("id"));
			}
		});
    	for(var i = 0;i <selRowIds.length;i ++) {  
    		$("#dictListGrid").jqGrid("delRowData", selRowIds[i]);  
    	}  
    });
    
    $("[name='saveDictBtn']").click(function(){
    	var rowids = $("#dictListGrid").jqGrid('getDataIDs');
    	for(var i=0;i<rowids.length;i++){
    	  $("#dictListGrid").restoreRow(rowids[i]);
    	}
    	
    	var checkFlag = true;
    	var request_data =$("#dictListGrid").jqGrid("getRowData");
    	$.each(request_data,function(i,item){
    		var dictId = $(item.dictId).attr("data-val");
    		if(!dictId || !$.trim(dictId)){
    			item.dictId = null;
    		}else{
    			item.dictId = dictId;
    		}
    		
    		if(!item.name || !$.trim(item.name)){
    			alert("第" + i + "行名称不能为空！");
    			checkFlag = false;
    		}
    	});
    	
    	if(!checkFlag){
    		return;
    	}
    	
		var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process";		
		$.ajax({ 
			url: serviceAddress,
			datatype: 'json',
			method:"post",
			data:{"module":"dictService","method":"insertDict","request_data":JSON.stringify(request_data)},			
			success: function(data){
				$("#searchDictListBtn").click();
			},error:function(error){
				alert(jQuery.parseJSON(error.responseText).cause.message);
			}
		});    	
    	
    });    
})