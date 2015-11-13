//rest服务地址
var serviceAddress="http://"+window.location.host+"/p2p-webapp/services/process"; 
//页面初始化加载函数
$(function(){
	$(window).resize(function(){
		gridResize("credit_Main");
		messageBox.resetMessageDialogDiv();
		loadingBox.resetLoadingDiv();
		showImgDialog.resetImgDialogDiv();
	});
	$(window).scroll(function(){
		messageBox.resetMessageDialogDiv();
		loadingBox.resetLoadingDiv();
		showImgDialog.resetImgDialogDiv();
	});
	//注册window的onpopstate事件
	window.onpopstate = function(e) {  
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
    //创建左侧栏目
    createCatalogTree();
	loadingBox.hideLoading();

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
				    loadingBox.showLoading();
				    $(".tabs-body").children("div").attr("class","tabs-body-item creditPageContext credit-validator credit-hide");
				    var requestUrl="http://"+window.location.host+"/p2p-webapp/"+pageAddress;
				    var jsFileUrl="../js/credit/"+pageAddress.substring(pageAddress.lastIndexOf("/")+1,pageAddress.lastIndexOf("."))+".js";
					$.ajax({ 
						url: requestUrl,
						//context: document.body,
						success: function(data){
							loadingBox.hideLoading();
							if(data && data.indexOf("loginBtn")!=-1){
								window.location.href="http://localhost:8080/p2p-webapp/page/login.jsp";
							}else if(data && data.indexOf("<p>No Permission</p>")!=-1){
								$("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">403</h2><p class="credit-errtext">No Permission</p><div></div><p></p><p>诚立信金融</p></div>');
								return;
							}else if(data && data.indexOf("<p>Not Found</p>")!=-1){
								$("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div>');
								return;
							}
							if(data && data.length>0){
							  //var  creditMainHtml=data.substring(data.indexOf("<!--credit_Main_start-->"),data.indexOf("<!--credit_Main_end-->")+19);
								$(".tabs-body").append(data);
							    $("head").find("script[src='"+jsFileUrl+"']").remove();
							    $("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>');
							}else{
								$("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div>');
							}
							
						},error:function(error){
						  loadingBox.hideLoading();
						  $("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">500</h2><p class="credit-errtext">Error</p><div></div><p></p><p>诚立信金融</p></div>');
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
	
	
	//跳转到ip138查询
	$("#credit_MainPanel").on("click",".ip138",function(){
		var ip138Address="http://www.ip138.com:8080/search.asp?action=mobile&mobile=";
		var mobileElement=$(this).attr("mobile");
		if(mobileElement){
			var phoneNumber=$(this).parent().find("[name='"+mobileElement+"']").val() || $(this).parent().find("[name='"+mobileElement+"']").text();
			ip138Address+=phoneNumber;
		}
		window.open(ip138Address);  
	});

	//点击图标显示某块区域
	$("#credit_MainPanel").on("click",".expand-down",function(){
		 $(this).parent().next("div:first").show();
		 $(this).attr("class","expand-up");
		 gridResize("credit_Main");
	});
	
	//点击图标隐藏某块区域
	$("#credit_MainPanel").on("click",".expand-up",function(){
		 $(this).parent().next("div:first").hide();
		 $(this).attr("class","expand-down");
	});
	
	//给显示图片的span加上点击事件
	$("#credit_MainPanel").on("click",".show-img-span",function(){
		 var imgType=$(this).attr("img-type");
		 var userId=$(this).attr("user-id");
		 var imgTitle=$(this).attr("img-title");
		 
		 //显示一个图片层
		 showImgDialog.createImgDialog(imgType,userId,imgTitle)
	});
	
	//给所有的.drag的div绑定拖拽事件
	var _move=false;//移动标记  
	var _x,_y;//鼠标离控件左上角的相对位置  
	$("body").on("mousedown",".drag",function(e){
		_move=true;  
		_x=e.pageX-parseInt($(".drag").css("left"));  
		_y=e.pageY-parseInt($(".drag").css("top"));
	});
	$("body").on("mousemove",".drag",function(e){
		if(_move){  
			var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置  
			var y=e.pageY-_y;  
			$(".drag").css({top:y,left:x});//控件新位置  
		}
	});
	$("body").on("mouseup",".drag",function(e){
		_move=false; 
	});
	
	$("#credit_MainPanel").on("click",".upLoadBtn",function(){
		debugger;
		var uploadElement=$(this).siblings("span:first").attr("name");
		 var img_path=$(this).siblings("span:first").attr("img_path");
		 var img_name=$(this).siblings("span:first").text();
		 //弹出文件选择框
		 uploadDialog.createUploadDialog(uploadElement,img_path,img_name);
	});
})

//构造左侧菜单的函数
function createCatalogTree(){
    loadingBox.showLoading();
    //调用获取栏目菜单的服务
	$.ajax({ 
		url: serviceAddress,
		datatype:'json',
		method:"post",
		async:false,
		data:{"module":"commonAction",
			  "method":"getCatalogLeftTree"
		},			
		success: function(zTreeNodes){
			if(!zTreeNodes){
				loadingBox.hideLoading();
				return;
			}
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
				   key:{
				     name:"catalog_name",
				     url:""
				   },
				   simpleData: {
					enable: true,
					idKey: "catalog_id",
					pIdKey: "parent_id",
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
							$("#menu_ztree").find("span[class='credit-span-blue']").attr("class","");
							$(event.toElement).attr("class","credit-span-blue");
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
									liHtml="<li><a>"+treeNode.catalog_name+"</a></li>"+liHtml;
									checkAllParents(treeNode.getParentNode());
								}
							}
							checkAllParents(treeNode);
							//设置面包屑
							$(".credit-breadcrumb").html(liHtml);
							$(".credit-breadcrumb").find("li:last").find("a").attr("style","class:blue;");
							//获取页面
							var fileUrlstr=treeNode.url;
							if(fileUrlstr && fileUrlstr!="#"){
								loadingBox.showLoading();
								var jsFileUrl="/p2p-webapp/js/credit/"+fileUrlstr.substring(fileUrlstr.lastIndexOf("/")+1,fileUrlstr.lastIndexOf("."))+".js";
								fileUrlstr=fileUrlstr.indexOf("/")==0?fileUrlstr.substring(1):fileUrlstr;
								var requestUrl="http://"+window.location.host+"/p2p-webapp/"+fileUrlstr;
								$("title").text(treeNode.catalog_name);
								$.ajax({ 
									url: requestUrl,
									//context: document.body,
									success: function(data){
										loadingBox.hideLoading(500);
										if(data && data.indexOf("loginBtn")!=-1){
											window.location.href="http://localhost:8080/p2p-webapp/page/login.jsp";
										}else if(data && data.indexOf("<p>No Permission</p>")!=-1){
											$("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">403</h2><p class="credit-errtext">No Permission</p><div></div><p></p><p>诚立信金融</p></div>');
											return;
										}else if(data && data.indexOf("<p>Not Found</p>")!=-1){
											$("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div>');
											return;
										}
										if(data && data.length>0){
										  var  creditMainHtml=data.substring(data.indexOf("<!--credit_Main_start-->")+24,data.indexOf("<!--credit_Main_end-->"));
										  $("#credit_MainPanel").find("#credit_Main").remove();
										  $("#credit_MainPanel").append(creditMainHtml);
										  if(fileUrlstr.indexOf("index.jsp")==-1){
											  $("head").find("script[src='"+jsFileUrl+"']").remove();
											  $("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>');
										  }
										}
										//加入到历史状态里面
										var state = {
											title:treeNode.catalog_name,
											url: requestUrl,
											isloadjs:treeNode.isloadjs
										};
										window.history.pushState(state,data,requestUrl);
									},error:function(error){
										loadingBox.hideLoading(500);
									    $("#credit_Main").html('<div class="credit-wrong"><h2 class="credit-errcode">500</h2><p class="credit-errtext">Error</p><div></div><p></p><p>诚立信金融</p></div>');
									}
								});
							}
							
							
						}
				}

			};
			
			//获取当前访问的路径
			var currrentUrl=window.location.pathname.substring(window.location.pathname.indexOf("p2p-webapp/")+11);
			var nodeId="";
			if(currrentUrl){
				for(var i=0;i<zTreeNodes.length;i++){
					 var nodeObj=zTreeNodes[i];
					 var url=nodeObj.url.indexOf("/")==0?nodeObj.url.substring(1):nodeObj.url;
					 if(currrentUrl==url){
						 nodeId=nodeObj.catalog_id;
					 }
					
				}
			}
			//创建ztree
			zTreeObj = $.fn.zTree.init($("#menu_ztree"), setting, zTreeNodes);
			var treeNodes=zTreeObj.getNodesByParam("catalog_id",nodeId,null);
			var curentTreeNode=treeNodes[0];
			//获取父节点
			var liHtml="";
			var checkAllParents1=function(curentTreeNode){
				zTreeObj.expandNode(curentTreeNode, true, false, true,false);
				if(curentTreeNode==null){
					return;
				}else{
					liHtml="<li><a>"+curentTreeNode.catalog_name+"</a></li>"+liHtml;
					checkAllParents1(curentTreeNode.getParentNode());
				}
			}
			checkAllParents1(curentTreeNode);
			//设置面包屑
			$(".credit-breadcrumb").html(liHtml);
			$(".credit-breadcrumb").find("li:last").find("a").attr("style","class:blue;");
			loadingBox.hideLoading();
		},error:function(error){
		    loadingBox.hideLoading();
			messageBox.createMessageDialog("提示",jQuery.parseJSON(error.responseText).cause.message,"","","error");
		}
	});
}

//移除tab控件的也签
function removeTabItem(tabId,itemId){
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
	if(tabId && itemId && pageUrl){
		loadingBox.showLoading();
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
				loadingBox.hideLoading(500);
				if(data && data.indexOf("loginBtn")!=-1){
					window.location.href="http://localhost:8080/p2p-webapp/page/login.jsp";
				}
				if(data && data.length>0){
					$("div[name='"+tabId+"']").find(".tabs-body").append(data);
					if(isLoadJs==true || isLoadJs=="true"){
						$("head").find("script[src='"+jsFileUrl+"']").remove();
						$("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>');
					}
				}
			},error:function(error){
				loadingBox.hideLoading(500);
				$("div[name='"+tabId+"']").find(".tabs-body").append('<div tabid="'+itemId+'" class="tabs-body-item creditPageContext credit-validator"><div><div class="credit-wrong"><h2 class="credit-errcode">404</h2><p class="credit-errtext">Not Found</p><div></div><p></p><p>诚立信金融</p></div></div>');
			}
		});
		
	}
	
}


//公共赋值函数
function setValues(divId,dataObj,appendHtml){
	//判断传入的div是否存在
	if(divId && $("#"+divId) && $("#"+divId).length>0){
		if(appendHtml){
			$("#"+divId).append(appendHtml);
		}else{
			//设置span的值
			$("#"+divId).find(".credit-input").find("span").each(function(i,dom){
				var name=$(dom).attr("name");
				var textValue=dataObj[name]!=undefined?dataObj[name]:"";
				$(dom).text(textValue);
				if($(dom).attr("widget") && $(dom).attr("widget")=="dropdown"){
					$(dom).attr("code",textValue);
				}
			});
			
			//设置input的值
			$("#"+divId).find(".credit-input").find("input").each(function(i,dom){
				var name=$(dom).attr("name");
				var inputValue=dataObj[name]!=undefined?dataObj[name]:"";
				$(dom).val(inputValue);
			});
			
			//设置textarea的值
			$("#"+divId).find(".credit-input").find("textarea").each(function(i,dom){
				var name=$(dom).attr("name");
				var textareaValue=dataObj[name]!=undefined?dataObj[name]:"";
				$(dom).text(textareaValue);
			});
			
			//下拉框
			$("#"+divId).find(".credit-input").find("select").each(function(i,dom){
				var name=$(dom).attr("name");
				var textareaValue=dataObj[name]!=undefined?dataObj[name]:"";
				var widgetName=$(dom).attr("widget");
				$(dom).val(textareaValue);
				//渲染值到下拉框code属性上
				$(dom).attr("code",textareaValue);
			});
			
		}
	}
}

/**
 * 获取查询参数
 * @param divId 参数div id
 */
function getValue(divId){
	var request_data = {};
	if(divId && $("#"+divId) && $("#"+divId).length>0){
		//设置input和select的值
		$("#"+divId).find(".credit-input").find("input,select").each(function(i,dom){
			var name=$(dom).attr("name");
			var value = $(dom).val();
			if(!isEmptyString(value)) request_data[name] = $(dom).val();
		});
	}
	return request_data;
}
/**
 * 是否为空字符串
 * @param value 校验值
 * @return boolean
 */
function isEmptyString(value){
	var result = false;
	if(value == null || value == "") result = true;
	return result;
}

//公共校验函数
function validateRequire(elemName,tip,parantsDivId){
	var elementDom;
	if(parantsDivId){
		elementDom=$("#"+parantsDivId).find("[name='"+elemName+"']");
	}else{
		elementDom=$("[name='"+ elemName +"']");
	}
	var elemVal = $(elementDom).val();
	//取span的值
	var domType = $(elementDom).get(0).tagName;
	if(domType == "SPAN") elemVal = $(elementDom).attr("code");
    if(!isEmptyString(elemVal)){
		  var elemNameTipLength=$("span[name='" + elemName + "Tip']").length;
		  if(elemNameTipLength==0){
			  elementDom.parent().after("<span name='" + elemName + "Tip' style='color:red;'>" + tip + "</span>");
		  }
		  elementDom.change(function(e){
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
	loadingBox.showLoading();
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
			loadingBox.hideLoading();
			resultData=data;
		},error:function(error){
			loadingBox.hideLoading();
			var errorObj=$.parseJSON(error.responseText);
			var errorStr=errorObj.cause?errorObj.cause.message:errorObj.message;
			messageBox.createMessageDialog("提示",errorStr,"","","error");
		}
	});
	if(setValueDiv){
		setValues(setValueDiv,resultData);
		//渲染下拉框
		selectRender(setValueDiv);
	}
	return resultData;
}

//公共的保存或修改表单的方法
function publicSaveAjax(moduleName,methodName,requestDataStr,removeTabId,removeItemId,searchBtn,successTipInfo,okFunc,cancelFunc){
	loadingBox.showLoading();
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
			loadingBox.hideLoading(500);
			if(successTipInfo){
			  messageBox.createMessageDialog("提示",successTipInfo,"","","true",okFunc,cancelFunc);
			}
			if(removeTabId && removeItemId){
				removeTabItem(removeTabId,removeItemId);
			}
			$(searchBtn).click();
		},error:function(error){
			loadingBox.hideLoading(500);
			var errorObj=$.parseJSON(error.responseText);
			var errorStr=errorObj.cause?errorObj.cause.message:errorObj.message;
			messageBox.createMessageDialog("提示",errorStr,"","","error");
		}
	});
}


//显示图片弹出框
var showImgDialog={
    createImgDialog:function(imgType,userId,dialogTitle){
    	debugger;
    	showImgDialog.removeImgDialogDiv();
    	var servletUrl="";
    	if(imgType && userId){
    		servletUrl="http://"+window.location.host+"/p2p-webapp/ShowPicture?imgType="+imgType+"&userId="+userId;
    	}
    	var showHtml="";
    	if(servletUrl){
    		showHtml='<img src="'+servletUrl+'" style="max-width: 500px;max-height:500px;">';
    	}else{
    		showHtml='<span style="font-size: 20px;font-weight: bold;margin-top: 100px;display: inline-block;">没有图片！</span>';
    		
    	}
		var temp='<div style="line-height:25px;padding-left: 5px;padding-right: 5px;border-bottom: 1px solid #CCC;"><span style="font-weight: bold;">'+(dialogTitle || "")+'</span><span style="float: right;" class="img-dialog-close"><a style="text-decoration: underline;color: blue;">关闭</a></span></div>'
				+'<div style="padding: 20px;text-align: center;">'+showHtml+'</div>';
		
		//创建弹出层
		$("body").append("<div id='showImgDialogDiv' class='drag'></div>");
		var showImgDialogDiv=$("#showImgDialogDiv");
		showImgDialogDiv.attr("style","position:absolute;overflow:visible;z-index:1990;border:1px solid #CCC;background-color: #F3F7F8;min-width: 500px;min-height: 300px;");
		showImgDialogDiv.html(temp);
		var left=($(window).width()-500)/2+"px";
		var top=(($(window).height()-500)/2+document.body.scrollTop)+"px";
		showImgDialogDiv.css({'left':left,'top':top});
		//关闭图片层
		showImgDialogDiv.find(".img-dialog-close").click(function(){
			showImgDialog.removeImgDialogDiv();
		});
    	
    },
    //删除loading层
    removeImgDialogDiv:function(){
    	$("#showImgDialogDiv").remove();
    },
    resetImgDialogDiv:function(){
    	var showImgDialogDiv=$("#showImgDialogDiv");
		var left=($(window).width()-showImgDialogDiv.width())/2+"px";
		var top=(($(window).height()-showImgDialogDiv.height())/2+document.body.scrollTop)+"px";
		showImgDialogDiv.css({'left':left,'top':top});
    }
}

//上传文件弹出框
var uploadDialog={
		img_path:"",
		img_name:"",
		uploadElement:"",
		//创建弹出框
	    createUploadDialog:function(uploadElement,img_path,img_name){
	    	$("#uploadDialogDiv").remove();
	    	uploadDialog.removeMaskDiv();
	    	uploadDialog.createMaskDiv();
    		uploadDialog.uploadElement=uploadElement || "";
    		uploadDialog.img_path=img_path || "";
    		uploadDialog.img_name=img_name || "";
    		var tdHtml="";
    		if(uploadDialog.img_path){
    			tdHtml="<img style='max-width: 430px;max-height:280px;' src='"+uploadDialog.img_path+"' />";
    		}else{
    			tdHtml="点击上传按钮选择图片！";
    		}
			var temp="<form name='uploadImgForm' method='post' enctype='multipart/form-data' target='hidden_frame'><div style=\"border:2px solid #37B6D1;background-color: #fff; font-weight: bold;font-size: 12px;\" >"
					+"<div style=\"line-height:25px; padding:0px 5px;	background-color: #37B6D1;\">图片上传(类型：jpg、png、bmp)</div>"
					+"<table width=\"500px\" height=\"300px\" cellspacing=\"0\" border=\"0\"><tr>" 
					+"<td  style=\" padding:0px 0px 0px 20px;align:center;font-size: 20px;\" align=\"center\">"+tdHtml+"</td>"
					+"</tr></table>"
					+"<div style=\"display:none;\"><input id='imgFile' name='imgFile' type=\"file\"/> </div>"
					+"<div style=\"text-align:center; padding:0px 0px 20px;background-color: #fff;\">" 
//					+"<input type='button'  class=\"grid-toobar-btn\" value='添加'id=\"addBtn\"  onclick=\"uploadDialog.addFunc();\">"
					+"&nbsp;&nbsp;&nbsp;<input type='button' class=\"grid-toobar-btn\" value='上传'  id=\"uploadBtn\"   onClick='uploadDialog.uploadFunc();'>"
				    +"&nbsp;&nbsp;&nbsp;<input type='button' class=\"grid-toobar-btn\" value='关闭'  id=\"closeBtn\"   onClick='uploadDialog.cancelFunc();'>"
				    +"</div></div><iframe name='hidden_frame' id='hidden_frame' style='display:none;'></iframe> </form>";
			
			//创建弹出层style='display:none'
			$("body").append("<div id='uploadDialogDiv' class='drag'></div>");
			var uploadDialogDiv=$("#uploadDialogDiv");
			uploadDialogDiv.attr("style","position:absolute;width: 500px;height: 300px;overflow:visible;z-index:1993");
			uploadDialogDiv.html(temp);
			var left=($(window).width()-uploadDialogDiv.width())/2+"px";
			var top=(($(window).height()-uploadDialogDiv.height())/2+document.body.scrollTop)+"px";
			uploadDialogDiv.css({'left':left,'top':top});
			
			$("#uploadDialogDiv").find("input[type='file']").change(function(){
				debugger;
				var imgUrl=$(this).val();
				var imgSuffix=imgUrl.substring(imgUrl.lastIndexOf(".")+1);
				if(imgSuffix && imgSuffix.toLowerCase()!="jpg" && imgSuffix.toLowerCase()!="png" && imgSuffix.toLowerCase()!="bmp"){
					$("#uploadDialogDiv").find("td").html("<span style='color:red;'>只能上传jpg、png、bmp类型的图片！</span>");
					return false;
				}
				loadingBox.showLoading();
				var uploadImgForm=$("#uploadDialogDiv").find("form[name='uploadImgForm']");
				uploadImgForm[0].action="http://"+window.location.host+"/p2p-webapp/UploadPicture";
				uploadImgForm.submit();
			});
	    },
	    //取消
	    cancelFunc:function(){
	    	$("#uploadDialogDiv").remove();
	    	uploadDialog.removeMaskDiv();
	    },
	    //上传成功的回调函数
	    uploadCallBack:function(data){
	    	debugger;
	    	if(data){
	    		var resultObj=JSON.parse(data);
	    		$("#uploadDialogDiv").find("td").html("<img style='max-width: 430px;max-height:280px;' src='"+resultObj.img_path+"' />");
	    		uploadDialog.img_path=resultObj.img_path;
	    		uploadDialog.img_name=resultObj.img_name;
	    		$("span[name='"+uploadDialog.uploadElement+"']").text(resultObj.img_name);
	    		$("span[name='"+uploadDialog.uploadElement+"']").attr("img_path",resultObj.img_path);
	    	}
	    	loadingBox.hideLoading();
	    },
	    //上传图片
        uploadFunc:function(){
        	$("#uploadDialogDiv").find("input[type='file']").click();
	    },
	    //创建遮罩层
	    createMaskDiv:function(){
	    	var uploadDialogMaskDivHtml='<div id="uploadDialogMaskDiv" unselectable="on" style="background:#000;filter:alpha(opacity=10);opacity:.1;left:0px;top:0px;position:fixed;height:100%;width:100%;overflow:hidden;z-index:1992;"></div>';
	        $("body").append(uploadDialogMaskDivHtml);
	    },
	    removeMaskDiv:function(){
	    	$("body").find("#uploadDialogMaskDiv").remove();
	    },
	    resetUploadDialogDiv:function(){
	    	var uploadDialogDiv=$("#uploadDialogDiv");
			var left=($(window).width()-uploadDialogDiv.width())/2+"px";
			var top=(($(window).height()-uploadDialogDiv.height())/2+document.body.scrollTop)+"px";
			uploadDialogDiv.css({'left':left,'top':top});
	    }
};

//自定义alert、confirm框
var messageBox={
    
    //创建弹出框
    createMessageDialog:function(title,content,cancel,focus,icon,okFunc,cancelFunc){
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
				+"<table  cellspacing=\"0\" border=\"0\"><tr><td style=\" padding:0px 0px 0px 20px;vertical-align: text-top; \"><img src=\""+icon+"\" width=\"64\" height=\"64\"></td>"
				+"<td ><div style=\"background-color: #fff; font-weight: bold;font-size: 12px;padding:20px 0px ; text-align:left;word-break: break-all;\">"+content
				+"</div></td></tr></table>"
				+"<div style=\"text-align:center; padding:0px 0px 20px;background-color: #fff;\"><input type='button'  style=\"border:1px solid #CCC; background-color:#CCC; width:50px; height:25px;\" value='确定'id=\"msgDialogConfirmBtn\"  onclick=\"messageBox.removeMessageDialogDiv(1);\">";
		if(cancel){
			temp+="&nbsp;&nbsp;&nbsp;<input type='button' style=\"border:1px solid #CCC; background-color:#CCC; width:50px; height:25px;\" value='取消'  id=\"msgDialogCancelBtn\"   onClick='messageBox.removeMessageDialogDiv(0);'>";
		}
		temp+="</div></div>";
		
		//创建弹出层
		$("body").append("<div id='messageDialogDiv' class='drag'></div>");
		var messageDialogDiv=$("#messageDialogDiv");
		messageDialogDiv.attr("style","position:absolute;width:400px;overflow:visible;z-index:2001");
		messageDialogDiv.html(temp);
//		var left=(document.body.clientWidth-messageDialogDiv.width())/2+"px";
//		var top=(document.body.clientHeight-messageDialogDiv.height())/2+"px";
		var left=($(window).width()-messageDialogDiv.width())/2+"px";
		var top=(($(window).height()-messageDialogDiv.height())/2+document.body.scrollTop)+"px";
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

//创建loading锁屏，防止重复提交
var loadingBox={
		//创建loading提示层
		showLoading:function(){
			loadingBox.hideLoading();
			loadingBox.createloadingMaskDiv();
			
			var icon="/p2p-webapp/images/loading.gif";
			var temp="<div style=\"width:200px;border:2px solid #6DD137;background-color: #fff; font-weight: bold;font-size: 12px;\" >"
					+"<table  cellspacing=\"0\" border=\"0\"><tr><td style=\" padding:0px 0px 0px 50px;\"><img src=\""+icon+"\"></td>"
					+"<td ><div style=\"background-color: #fff; font-weight: bold;font-size: 16px;padding:20px 0px;font-style: oblique;;text-align:left;word-break: break-all;\">Loading..."
					+"</div></td></tr></table>"
					+"</div>";
			
			//创建弹出层
			$("body").append("<div id='loadingDiv'></div>");
			var loadingDiv=$("#loadingDiv");
			loadingDiv.attr("style","position:absolute;width:200px;overflow:visible;z-index:1999");
			loadingDiv.html(temp);
			var left=($(window).width()-loadingDiv.width())/2+"px";
			var top=(($(window).height()-loadingDiv.height())/2+document.body.scrollTop)+"px";
			loadingDiv.css({'left':left,'top':top});
		},
		//关闭loading提示层
		hideLoading:function(delayTime){
			if(delayTime && delayTime>0){
				setTimeout(function(){
					loadingBox.removeLoadingDiv();
					loadingBox.removeLoadingMaskDiv();
				},delayTime)
			}else{
				loadingBox.removeLoadingDiv();
				loadingBox.removeLoadingMaskDiv();
			}
		},
		//创建遮罩层
	    createloadingMaskDiv:function(){
	    	var loadingMaskDivHtml='<div id="loadingMaskDiv" unselectable="on" style="background:#000;filter:alpha(opacity=10);opacity:.1;left:0px;top:0px;position:fixed;height:100%;width:100%;overflow:hidden;z-index:1998;"></div>';
	        $("body").append(loadingMaskDivHtml);
	    },
	    removeLoadingMaskDiv:function(){
	    	$("body").find("#loadingMaskDiv").remove();
	    },
	    //删除loading层
	    removeLoadingDiv:function(){
	    	$("#loadingDiv").remove();
	    },
	    resetLoadingDiv:function(){
	    	var loadingDiv=$("#loadingDiv");
			var left=($(window).width()-loadingDiv.width())/2+"px";
			var top=(($(window).height()-loadingDiv.height())/2+document.body.scrollTop)+"px";
			loadingDiv.css({'left':left,'top':top});
	    }
}

//下拉框组件通过数据字典服务构造选项
function selectRender(formDivId){
	$("#"+formDivId).find("[widget='dropdown']").each(function(i,dom){
		var moduleName = $(dom).attr("servicemodule") || "dictService";
		var methodName = $(dom).attr("servicemethod") || "getDictItems";
		var valueField = $(dom).attr("valuefield") || "code";
		var textField = $(dom).attr("textfield") || "name";
		var dictionaryType = $(dom).attr("dictionary_type");
		var istext=$(dom).attr("istext");
		var code=$(dom).attr("code");
		var is_cache=$(dom).attr("is_cache");//是否需要缓存
		//缓存可以ps:模块名_方法名_数据字典key(可选)
		var cacheKey = moduleName + "_" + methodName + "_" + (dictionaryType || "");
		if(code){
			cacheKey+="_"+code;
		}
		var dicDataArray=localStorage[cacheKey]?JSON.parse(localStorage[cacheKey]):[];
		if(is_cache == "true" && dicDataArray && dicDataArray.length>0){
			if(istext=="true"){
				//span渲染
				$.each(dicDataArray, function(i){
					if(code && code == dicDataArray[i].code){
						$(dom).text(dicDataArray[i][textField]);
						$(dom).attr("code", dicDataArray[i][valueField]);
					}
				});
			}else{
				//下拉框填充
				_setOptions(dom, dicDataArray, textField, valueField, code);
			}
		}else{
			var paramsObj={};
			if(dictionaryType){
				paramsObj.type=dictionaryType;
			}
			if(istext=="true"){
				paramsObj.code=code;
			}
			//调用数据字典服务
			$.ajax({ 
				url: serviceAddress,
				datatype:'json',
				method:"post",
				data:{"module":moduleName,
					"method":methodName,
					"request_data":JSON.stringify(paramsObj)
				},			
				success: function(data){
					if(data && data.length>0){
						if(istext=="true"){
							//span渲染
							$.each(data, function(i){
								if(code && code == data[i].code){
									$(dom).text(data[i][textField]);
									$(dom).attr("code", data[i][valueField]);
								}
							});
						}else{
							//下拉框填充
							_setOptions(dom, data, textField, valueField, code);
						}
						localStorage[cacheKey]=JSON.stringify(data);
					}
				},error:function(error){
					var errorObj=$.parseJSON(error.responseText);
					var errorStr=errorObj.cause?errorObj.cause.message:errorObj.message;
					messageBox.createMessageDialog("提示",errorStr,"","","error");
				}
			});
		}
		
	});
}


//公共渲染时间控件
function datepickerRender(formDiv){
	$("#"+formDiv).find("[widget='datepicker']").each(function(i,dom){
		var dateFormat=$(dom).attr("dateFormat") || "yy-mm-dd";
		$(dom).datepicker({dateFormat:dateFormat});
	});
}

//获取grid列需要构造的下拉框的值
function gridSelectColRender(serviceModuleName,serviceMethodName,requestData,valueField,textField,is_cache){
	var moduleName=serviceModuleName || "dictService";
	var methodName=serviceMethodName || "getDictItems";
	var resltObj={};
	var cacheKey="grid_select_col_"+moduleName+"_"+moduleName+"_"+(requestData?requestData.type:"");
	if(requestData && requestData.parent_type){
		cacheKey+="_"+requestData.parent_type;
	}
	if(requestData && requestData.parent_code){
		cacheKey+="_"+requestData.parent_code;
	}
	resltObj.jsonArray=localStorage[cacheKey]?JSON.parse(localStorage[cacheKey]):[];
	resltObj.jsonStr="";
	if((is_cache || is_cache=="true") && resltObj.jsonArray && resltObj.jsonArray.length>0){
		$.each(resltObj.jsonArray,function(i,item){
			resltObj.jsonStr += item[valueField] + ":" + item[textField] + ";";
		});
		resltObj.jsonStr = resltObj.jsonStr.substring(0,resltObj.jsonStr.length-1);
	}else{
		$.ajax({ 
			url: serviceAddress,
			datatype:'json',
			method:"post",
		    async:false,
			data:{"module":moduleName,
				  "method":methodName,
				  "request_data":requestData?JSON.stringify(requestData):"{}"
			},			
			success: function(data){
				resltObj.jsonArray = data;
				$.each(data,function(i,item){
					resltObj.jsonStr += item[valueField] + ":" + item[textField] + ";";
				});
				resltObj.jsonStr = resltObj.jsonStr.substring(0,resltObj.jsonStr.length-1);
				localStorage[cacheKey]=JSON.stringify(resltObj.jsonArray);
			},error:function(error){
				messageBox.createMessageDialog("提示",jQuery.parseJSON(error.responseText).cause.message,"","","error");
			}
		});
	}
	return resltObj;
}

//grid公共分页函数
function gridOnPaging(pgButton,grid,pagerDiv,request_data){
    var request_data=request_data || {};
	var page = grid.getGridParam('page'); // current page
	var lastpage =grid.getGridParam('lastpage'); // current page
	if(pgButton=='next'){
		page+=1;
	}else if(pgButton=='prev'){
		page-=1;
	}else if(pgButton=='first'){
		page=1;
	}else if(pgButton=='last'){
		page=lastpage;
	}else if(pgButton=='user'){
		page=$("#"+pagerDiv).find("input").val();
	}
	request_data.currpage=page;
	var rows=$("#"+pagerDiv).find("select").val();
	request_data.rowNum=rows;
	grid.jqGrid('setGridParam', {
		datatype:'json',  
		postData:{'request_data':JSON.stringify(request_data)}, //发送数据
		page:page,
		rowNum:rows
	}).trigger("reloadGrid");
}


/**
 * 级联数据服务请求
 * @param e 促发拉框
 * @param value 促发下拉框值
 */
function elementCascade(e, value){
	debugger;
	var trigger = $(e).attr("trigger");
	//city dom
	var triggerDom = $("#"+trigger);
	var moduleName = $(triggerDom).attr("serviceModule") || "dictService";
	var methodName = $(triggerDom).attr("serviceMethod") || "getDictItems";
	var valueField = $(triggerDom).attr("valueField") || "code";
	var textField = $(triggerDom).attr("textField") || "name";
	var params_key = $(triggerDom).attr("params_key") || "type";
	var dictionary_type=$(triggerDom).attr("dictionary_type");
	var parent_type=$(triggerDom).attr("parent_type");
	var code=$(triggerDom).attr("code");
	var paramsObj = {};
	//参数
	paramsObj[params_key] = value;
	if(dictionary_type){
		paramsObj.type=dictionary_type;
	}
	paramsObj.parent_type=parent_type || "";
	paramsObj.parent_code=value;
	//获取缓存里面的数据
	var cacheKey="cascade_city"+"_"+moduleName+"_"+methodName+"_"+value+"_"+(parent_type || "")+"_"+(dictionary_type || "");
	var elementDataArray=localStorage[cacheKey]?JSON.parse(localStorage[cacheKey]):[];
	if(elementDataArray && elementDataArray.length>0){
		//清空下拉框
		$(triggerDom).empty();
		$(triggerDom).append('<option value="">请选择</option>');
		//赋值
		_setOptions(triggerDom, elementDataArray, textField, valueField, code);
	}else{
		//调用数据字典服务
		$.ajax({ 
			url: serviceAddress,
			datatype:'json',
			method:"post",
			data:{"module" : moduleName,
				"method" : methodName,
				"request_data" : JSON.stringify(paramsObj)
			},
			success: function(data){
				//清空下拉框
				$(triggerDom).empty();
				$(triggerDom).append('<option value="">请选择</option>');
				//赋值
				if(data && data.length>0){
					_setOptions(triggerDom, data, textField, valueField, code)
				}
				//加入缓存
				localStorage[cacheKey]=JSON.stringify(data);
			},error:function(error){
				var errorStr=$.parseJSON(error.responseText).cause.message;
				messageBox.createMessageDialog("提示",errorStr,"","","error");
			}
		});
	}
	
}
/**
 * 渲染下拉框选项数据，并根据code值选中
 * @param dom
 * @param data
 * @param textField
 * @param valueField
 * @param code 选中值(可选)
 */
function _setOptions(dom, data, textField, valueField, code){
	//赋值
	if(data && data.length>0){
		for(var i=0;i<data.length;i++){
			if(!isEmptyString(code) && code == data[i][valueField]){
				$(dom).append('<option value="'+data[i][valueField]+'"  selected="selected">'+data[i][textField]+'</option>');
				// 下拉框（如果是省份，则触发change事件，级联城市）
				var triggerKey = $(dom).attr('trigger');
				if(triggerKey != null && triggerKey.indexOf("city_cascade_") != -1){
					elementCascade(dom, code);
				}
			}else{
				$(dom).append('<option value="'+data[i][valueField]+'">'+data[i][textField]+'</option>');
			}
		}
	}
}

/**
 * 上传图片
 */
function ajaxFileUpload() {  
	debugger;
	loadingBox.showLoading();
	$.ajaxFileUpload({  
		url : "http://"+window.location.host+"/p2p-webapp/UploadPicture",// servlet请求路径  
		secureuri : false,  
		fileElementId : 'profession_img_v',// 上传控件的id  
		dataType : 'json', 
		data : {username : $("#username").val()},
		success : function(data, status) {  
			loadingBox.hideLoading();
			debugger;
//			if(data.msg) {  
//				alert(data.msg);  
//			}  
		},  
		error : function(data, status, e) {  
			loadingBox.hideLoading();
//			messageBox.createMessageDialog("提示", e, "", "", "error");
		}  
	});  
} 