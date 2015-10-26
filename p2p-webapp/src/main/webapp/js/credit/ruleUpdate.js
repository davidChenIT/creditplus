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
			colNames:['<input type="checkbox" class="rule-update-selall-cbox">',"业务对象","字段","语义","值","与或运算"],
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
	
	
	$("[name='saveRule4UpdateBtn']").click(function(){
     	var checkPass = true;
        var request_data={};
            request_data.roleId=roleId;
        	request_data.enable=$("select[name='enable']").val();
        	request_data.created_by = created_by;
        	request_data.created_date = created_date;

        var roleName = validateRequire("rolenameupdate","请输入密码！");
		if(roleName){			
        	request_data.roleName=roleName;	
        }else{
        	checkPass = false;
        }

		if(!checkPass){
			return;
		}
		
				
		//publicSaveAjax("roleService","updateRole",JSON.stringify(request_data),"roleTab","roleUpdate","#searchRoleListBtn");
	});	
})