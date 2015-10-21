//rest服务地址
var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process"; 
//页面初始化加载函数
$(function(){
	$(window).resize(function(){
		debugger;
		gridResize("credit_Main");
		
		messageBox.resetMessageDialogDiv();
	});
	$(window).scroll(function(){
		debugger;
		messageBox.resetMessageDialogDiv();
	});
	//注册window的onpopstate事件
	window.onpopstate = function(e) {  
		  debugger;
		  //点击浏览器的前进后退按钮处理
          if (e.state) {
              window.location.href=e.state.url;
          }
	};
	//处理点浏览器返回时候最后一个不刷新页面内容问题
    var state = {
        title: document.title,
        url: document.location.href,
        otherkey: null
    };
    window.history.replaceState(state, document.title, document.location.href);
	//设置栏目菜单
	var zTreeObj,
	setting = {
	    treeId:"menu_ztree",
		view: {
			selectedMulti: false,
			showIcon: false,
			showLine: false,
			dblClickExpand:false
		},
		data:{
		   simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pId",
			rootPId: 0
		  }
		},
		callback: {
				//禁用ztree自带的双击展开子节点的方法
				beforeExpand:function(){
				   return false;
				},
				//节点点击事件
				onClick:function(event, treeId, treeNode){
					debugger;
					var treeObj = $.fn.zTree.getZTreeObj(treeId); 
					//展开或收缩子节点
					if(treeNode.open){
					   treeObj.expandNode(treeNode, false, false, true,false);
					}else{
					   treeObj.expandNode(treeNode, true, false, true,false);
					}
					//获取父节点
					var liHtml="";
					var checkAllParents=function(treeNode){
						if(treeNode==null){
							return;
						}else{
							liHtml="<li><a>"+treeNode.name+"</a></li>"+liHtml;
							checkAllParents(treeNode.getParentNode());
						}
					}
					checkAllParents(treeNode);
					//设置面包屑
					$(".credit-breadcrumb").html(liHtml);
					
					//获取页面
					var fileUrlstr=treeNode.urlstr;
					if(fileUrlstr){
						var jsFileUrl="/p2p-webapp/js/credit/"+fileUrlstr.substring(fileUrlstr.lastIndexOf("/")+1,fileUrlstr.lastIndexOf("."))+".js";
						var requestUrl="http://"+window.location.host+"/p2p-webapp/"+fileUrlstr;
						
						
						$("title").text(treeNode.name);
						$.ajax({ 
							url: requestUrl,
							//context: document.body,
							success: function(data){
								debugger;	
								if(data && data.length>0){
								  var  creditMainHtml=data.substring(data.indexOf("<!--credit_Main_start-->")+24,data.indexOf("<!--credit_Main_end-->"));
								  $("#credit_MainPanel").find("#credit_Main").remove();
								  $("#credit_MainPanel").append(creditMainHtml);
								  if(treeNode.isloadjs=="true"){
									  $("head").find("script[src='"+jsFileUrl+"']").remove();
									  $("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>');
								  }
								}
								//加入到历史状态里面
		                        var state = {
		                            title:treeNode.name,
		                            url: requestUrl,
		                            isloadjs:treeNode.isloadjs
		                        };
								window.history.pushState(state,data,requestUrl);
							},error:function(error){
							  debugger;
							  $("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div>');
							}
						});
					}
					
					
				}
		}

	},zTreeNodes = [
		{"id":1,"pId":0,"name":"首页","urlstr":"page/index.jsp",isloadjs:"true"},
		{"id":2,"pId":0,"name":"风控管理"},
		{"id":3,"pId":0,"name":"系统管理"},
		
		{"id":4,"pId":2,"name":"信用初审","urlstr":"page/firstTrialList.jsp",isloadjs:"true"},
		{"id":5,"pId":2,"name":"信用复审","urlstr":"page/reviewList.jsp",isloadjs:"true"},
		{"id":6,"pId":2,"name":"标的管理","urlstr":"page/tenderMngList.jsp",isloadjs:"true"},
		{"id":7,"pId":2,"name":"投标","urlstr":"page/makeTenderList.jsp",isloadjs:"true"},
		
		{"id":8,"pId":3,"name":"字典管理","urlstr":"page/systemmng/dictList.jsp",isloadjs:"true"},
		{"id":9,"pId":3,"name":"栏目管理","urlstr":"page/systemmng/catalogList.jsp",isloadjs:"true"},
		{"id":10,"pId":3,"name":"用户管理","urlstr":"page/systemmng/userList.jsp",isloadjs:"true"},
		{"id":11,"pId":3,"name":"角色管理","urlstr":"page/systemmng/roleList.jsp",isloadjs:"true"},
		{"id":12,"pId":3,"name":"资源管理","urlstr":"page/systemmng/resourceList.jsp",isloadjs:"true"},
		{"id":13,"pId":3,"name":"修改密码","urlstr":"page/systemmng/changePassword.jsp",isloadjs:"true"}		
	];
	
	//获取当前访问的路径
	var currrentUrl=window.location.pathname.substring(window.location.pathname.indexOf("p2p-webapp/")+11);
	var nodeId="";
	if(currrentUrl){
		for(var i=0;i<zTreeNodes.length;i++){
		     var nodeObj=zTreeNodes[i];
			 if(currrentUrl==nodeObj.urlstr){
				 nodeId=nodeObj.id;
			 }
			
		}
	}
	
	zTreeObj = $.fn.zTree.init($("#menu_ztree"), setting, zTreeNodes);
	
	var treeNodes=zTreeObj.getNodesByParam("id",nodeId,null);
	var curentTreeNode=treeNodes[0];
	//获取父节点
	var liHtml="";
	var checkAllParents1=function(curentTreeNode){
		zTreeObj.expandNode(curentTreeNode, true, false, true,false);
		if(curentTreeNode==null){
			return;
		}else{
			liHtml="<li><a>"+curentTreeNode.name+"</a></li>"+liHtml;
			checkAllParents1(curentTreeNode.getParentNode());
		}
	}
	checkAllParents1(curentTreeNode);
	//设置面包屑
	$(".credit-breadcrumb").html(liHtml);



	//展开或隐藏左侧栏目区域
	$("#credit_LeftPanel").on("click",".toggle-icon",function(){
		
		var thisClss=$(this).attr("class");
		if(thisClss.indexOf("icon-chevron-left")!=-1){
			 $(this).attr("class",thisClss.replace("icon-chevron-left","icon-chevron-right"));
			 $(this).text(">");
			 $(this).parent("div").width("29");
			 $("#credit_LeftPanel").width("30");
			 $("#menu_ztree").hide()
		}else{
			 $(this).attr("class",thisClss.replace("icon-chevron-right","icon-chevron-left"));
			 $(this).text("<");
			 $(this).parent("div").width("215");
			 $("#credit_LeftPanel").width("216");
			 $("#menu_ztree").show()
		}
		
		//放大或缩小grid
		gridResize("credit_Main");
		
	});


	//tab页面点击事件
	$("#credit_MainPanel").on("click",".tabs-head li",function(){
			var tabId=$(this).attr("tabid");
			var liClass=$(this).attr("class");
			if("tabs-selected"!=liClass){
			   //设置标题为选中状态
			   $(this).attr("class","tabs-selected");
			   //设置相邻元素的标题为未选择状态
			   $(this).siblings("li").attr("class","");
			   
			   //设置当前选中tab对应的内容区域显示
			   var currentTab=$("div[tabid='"+tabId+"']");
			   
			   //获取tab的pege属性，如果不为空就通过ajax获取页面
			   var pageAddress=$(this).attr("page");
			   if(pageAddress){
				    $(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
				    var requestUrl="http://"+window.location.host+"/p2p-webapp/"+pageAddress;
				    var jsFileUrl="../js/credit/"+pageAddress.substring(pageAddress.lastIndexOf("/")+1,pageAddress.lastIndexOf("."))+".js";
					$.ajax({ 
						url: requestUrl,
						//context: document.body,
						success: function(data){
							debugger;	
							if(data && data.length>0){
							  //var  creditMainHtml=data.substring(data.indexOf("<!--credit_Main_start-->"),data.indexOf("<!--credit_Main_end-->")+19);
								$(".tabs-body").append(data);
							    $("head").find("script[src='"+jsFileUrl+"']").remove();
							    $("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>');
							}else{
								$("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div>');
							}
							
						},error:function(error){
						  debugger;
						  $("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div>');
						}
					});
					
					$(this).removeAttr("page");
			   }else{
				   currentTab.attr("class","tabs-body-item creditPageContext credit-validator");
				   //相邻的内容区域隐藏
				   currentTab.siblings("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
			   }
			}
		
		
	});
	
	//点击tab的关闭x图标
	$("#credit_MainPanel").on("click",".credit-tab-close",function(){
		debugger;
		var removeLi=$(this).parent();
		var siblingsLi=removeLi.siblings();
		$(siblingsLi).each(function(i,li){
			var tabid=$(li).attr("tabid");
			if(i==0){
				$(li).attr("class","tabs-selected");
				$("div[tabid='"+tabid+"']").attr("class","tabs-body-item creditPageContext credit-validator");
			}else{
				$(li).attr("class","");
				$("div[tabid='"+tabid+"']").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
			}
		});
		var removeTabId=removeLi.attr("tabid");
		removeLi.remove();
		$("div[tabid='"+removeTabId+"']").remove();
		
	});
	

})

//移除tab控件的也签
function removeTabItem(tabId,itemId){
	debugger;
	var currentItemLi=$("div[name='"+tabId+"']").find("li[tabid='"+itemId+"']");
	var firstLi=$(currentItemLi.siblings()[0]);
	var firstItemId=firstLi.attr("tabid");
	currentItemLi.remove();
	$("div[name='"+tabId+"']").find("div[tabid='"+itemId+"']").remove();
	firstLi.attr("class","tabs-selected");
	$("div[name='"+tabId+"']").find("div[tabid='"+firstItemId+"']").attr("class","tabs-body-item creditPageContext credit-validator");
}

//移除tab控件的也签
function addTabItem(tabId,itemId,title,pageUrl,isLoadJs,jsFileUrl,paramsStr){
	debugger;
	if(tabId && itemId && pageUrl){
		var paramsObj;
		if(paramsStr){
			paramsObj=JSON.parse(paramsStr.replace(/@#_@#/g,"\""));
		}else{
			paramsObj={};
		}
    	var itemLi=$("div[name='"+tabId+"']").find("li[tabid='"+itemId+"']");
    	if(itemLi && itemLi.length>0){
    		$("div[name='"+tabId+"']").find("li[tabid='"+itemId+"']").remove();
    		$("div[name='"+tabId+"']").find("div[tabid='"+itemId+"']").remove();
    	}
    	$("div[name='"+tabId+"']").find(".tabs-head li").attr("class","");
    	var newLiHtml='<li tabid="'+itemId+'" class="tabs-selected"><span>'+title+'</span><div class="credit-tab-close"><span>x</span></div></li>';
    	$("div[name='"+tabId+"']").find(".tabs-head ul").append(newLiHtml);
    	$("div[name='"+tabId+"']").find("li[tabid='"+itemId+"']").data(paramsObj);
    	$("div[name='"+tabId+"']").find(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
		var requestUrl="http://"+window.location.host+pageUrl;
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				debugger;	
				if(data && data.length>0){
					$("div[name='"+tabId+"']").find(".tabs-body").append(data);
					if(isLoadJs==true || isLoadJs=="true"){
						$("head").find("script[src='"+jsFileUrl+"']").remove();
						$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>');
					}
				}
			},error:function(error){
				$("div[name='"+tabId+"']").find(".tabs-body").append('<div tabid="'+itemId+'" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
		
	}
	
}


//公共赋值函数
function setValues(divId,dataObj,appendHtml){
	debugger;
	//判断传入的div是否存在
	if(divId && $("#"+divId) && $("#"+divId).length>0){
		if(appendHtml){
			$("#"+divId).append(appendHtml);
		}else{
			//设置span的值
			$("#"+divId).find(".credit-input").find("span").each(function(i,dom){
				var name=$(dom).attr("name");
				var textValue=dataObj[name] || "";
				$(dom).text(textValue);
			});
			
			//设置input的值
			$("#"+divId).find(".credit-input").find("input").each(function(i,dom){
				var name=$(dom).attr("name");
				var inputValue=dataObj[name] || "";
				$(dom).val(inputValue);
			});
			
			//设置textarea的值
			$("#"+divId).find(".credit-input").find("textarea").each(function(i,dom){
				var name=$(dom).attr("name");
				var textareaValue=dataObj[name] || "";
				$(dom).text(textareaValue);
			});
			
		}
	}
}


//公共校验函数
function validateRequire(elemName,tip,parantsDivId){
	var elementDom;
	if(parantsDivId){
		elementDom=$("#"+parantsDivId).find("[name='"+elemName+"']");
	}else{
		elementDom=$("[name='"+ elemName +"']");
	}
	var elemVal = elementDom.val();
    if(!elemVal || !$.trim(elemVal)){
		  var elemNameTipLength=$("span[name='" + elemName + "Tip']").length;
		  if(elemNameTipLength==0){
			  elementDom.parent().after("<span name='" + elemName + "Tip' style='color:red;'>" + tip + "</span>");
		  }
		  elementDom.focus(function(e){
			  $("span[name='" + elemName + "Tip']").remove();
			  $(this).unbind(e);
		  });
		  return;
	}
    return elemVal;
}


//公共重置函数
function clearDomVal(areaDivId){
	$("#"+areaDivId).find("input").each(function(i,input){
		$(input).val("");
	});
	
	$("#"+areaDivId).find("textarea").each(function(i,textarea){
		$(textarea).text("");
	});
}


//重新设置grid的大小
function gridResize(domId){
	$("div[class='ui-jqgrid ui-widget ui-widget-content ui-corner-all']").each(function(i,dom){
	   var gridId=$(dom).attr("id").substring(5);
	   var newWidth=$("#"+domId).width()*0.97;
	   $("#"+gridId).jqGrid().setGridWidth(newWidth);
	});
}

//公共的查询并赋值的方法
function publicQueryInfoAjax(moduleName,methodName,requestDataStr,setValueDiv){
	debugger;
	var  resultData={};
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		async:false,
		data:{"module":moduleName,
			"method":methodName,
			"request_data":requestDataStr
		},			
		success: function(data){
			resultData=data;
		},error:function(error){
			var errorStr=$.parseJSON(error.responseText).cause.message;
			messageBox.createMessageDialog("提示",errorStr,"","","error");
		}
	});
	if(setValueDiv){
		setValues(setValueDiv,resultData);
	}
	return resultData;
}

//公共的保存或修改表单的方法
function publicSaveAjax(moduleName,methodName,requestDataStr,removeTabId,removeItemId,searchBtn,successTipInfo){
	debugger;
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		async:false,
		data:{"module":moduleName,
			"method":methodName,
			"request_data":requestDataStr
		},			
		success: function(data){
			if(successTipInfo){
			  messageBox.createMessageDialog("提示",successTipInfo,"","","true");
			}
			if(removeTabId && removeItemId){
				removeTabItem(removeTabId,removeItemId);
			}
			$(searchBtn).click();
		},error:function(error){
			var errorStr=$.parseJSON(error.responseText).cause.message;
			messageBox.createMessageDialog("提示",errorStr,"","","error");
		}
	});
}


//自定义alert、confirm框
var messageBox={
    
    //创建弹出框
    createMessageDialog:function(title,content,cancel,focus,icon,okFunc,cancelFunc){
    	debugger;
    	messageBox.createMaskDiv();
    	messageBox.okFunc=okFunc;
    	messageBox.cancelFunc=cancelFunc;
    	
    	/*		
		参数列表说明:
		title :弹出对话框的标题,标题内容最好在25个字符内,否则会导致显示图片的异常															
		content:弹出对话框的内容,可以使用HTML代码,例如<font color='red'>删除么?</font>,如果直接带入函数,注意转义
		cancel:弹出对话框是否显示取消按钮,为空的话不显示,为1时显示
		focus :弹出对话框焦点的位置,0焦点在确认按钮上,1在取消按钮上,为空时默认在确认按钮上
		icon  :弹出对话框的图标
		okFunc：点击确定按钮的回调函数
		cancelFunc：点击取消按钮的毁掉函数
		*/	
		icon="/p2p-webapp/images/msgbox_"+icon+".png";
		var temp="<div style=\"width:400px;border:2px solid #37B6D1;background-color: #fff; font-weight: bold;font-size: 12px;\" >"
				+"<div style=\"line-height:25px; padding:0px 5px;	background-color: #37B6D1;\">"+title+"</div>"
				+"<table  cellspacing=\"0\" border=\"0\"><tr><td style=\" padding:0px 0px 0px 20px; \"><img src=\""+icon+"\" width=\"64\" height=\"64\"></td>"
				+"<td ><div style=\"background-color: #fff; font-weight: bold;font-size: 12px;padding:20px 0px ; text-align:left;word-break: break-all;\">"+content
				+"</div></td></tr></table>"
				+"<div style=\"text-align:center; padding:0px 0px 20px;background-color: #fff;\"><input type='button'  style=\"border:1px solid #CCC; background-color:#CCC; width:50px; height:25px;\" value='确定'id=\"msgDialogConfirmBtn\"  onclick=\"messageBox.removeMessageDialogDiv(1);\">";
		if(cancel){
			temp+="&nbsp;&nbsp;&nbsp;<input type='button' style=\"border:1px solid #CCC; background-color:#CCC; width:50px; height:25px;\" value='取消'  id=\"msgDialogCancelBtn\"   onClick='messageBox.removeMessageDialogDiv(0);'>";
		}
		temp+="</div></div>";
		
		//创建弹出层
		$("body").append("<div id='messageDialogDiv'></div>");
		var messageDialogDiv=$("#messageDialogDiv");
		messageDialogDiv.attr("style","position:absolute;width:400px;height:200px;overflow:visible;z-index:2001");
		messageDialogDiv.html(temp);
		var left=(document.body.clientWidth-messageDialogDiv.width())/2+"px";
		var top=(document.body.clientHeight-messageDialogDiv.height())/2+"px";
		messageDialogDiv.css({'left':left,'top':top});
		if(focus==0||focus=="0"||null==focus){
			$("#msgDialogConfirmBtn").focus();
		}else if(focus==1||focus=="1"){
			$("#msgDialogCancelBtn").focus();
		}	
    },
    //移除弹出框
    removeMessageDialogDiv:function(status){
    	$("#messageDialogDiv").remove();
    	messageBox.removeMaskDiv();
    	if(status==1){
    		messageBox.okFunc && messageBox.okFunc();
    	}else{
    		messageBox.cancelFunc && messageBox.cancelFunc();
    	}
    },
    //创建遮罩层
    createMaskDiv:function(){
    	var messageDialogMaskDivHtml='<div id="messageDialogMaskDiv" unselectable="on" style="background:#000;filter:alpha(opacity=10);opacity:.1;left:0px;top:0px;position:fixed;height:100%;width:100%;overflow:hidden;z-index:2000;"></div>';
        $("body").append(messageDialogMaskDivHtml);
    },
    removeMaskDiv:function(){
    	$("body").find("#messageDialogMaskDiv").remove();
    },
    resetMessageDialogDiv:function(){
    	var messageDialogDiv=$("#messageDialogDiv");
		var left=($(window).width()-messageDialogDiv.width())/2+"px";
		var top=(($(window).height()-messageDialogDiv.height())/2+document.body.scrollTop)+"px";
		messageDialogDiv.css({'left':left,'top':top});
    }
}
