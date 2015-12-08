var app_verion=".v.1.0";
//rest服务地址
var appContext="http://"+window.location.host;
var serviceAddress=appContext+"/p2p-webapp/services/process";
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
				    var requestUrl=appContext+"/p2p-webapp/"+pageAddress;
				    var jsFileUrl="../js/credit/"+pageAddress.substring(pageAddress.lastIndexOf("/")+1,pageAddress.lastIndexOf("."))+app_verion+".js";
					$.ajax({ 
						url: requestUrl,
						//context: document.body,
						success: function(data){
							loadingBox.hideLoading();
							if(data && data.indexOf("loginBtn")!=-1){
								window.location.href=appContext+"/p2p-webapp/page/login.jsp";
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
			var phoneNumber=$(this).parent().find("[name='"+mobileElement+"']").val() || $(this).parent().find("[name='"+mobileElement+"']").text() || $($(this).parents("div")[3]).find("[name='"+mobileElement+"']").val() || $($(this).parents("div")[3]).find("[name='"+mobileElement+"']").text();
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
		 var img_type=$(this).siblings("span:first").attr("img-type");
		 var user_id=$(this).siblings("span:first").attr("user-id");
		 var is_upload=$(this).siblings("span:first").attr("is-upload");
		 //弹出文件选择框
		 uploadDialog.createUploadDialog(uploadElement,img_type,user_id,is_upload);
	});
	
	//关闭提示层
	$("body").on("click",".tip-error-close",function(){
		debugger;
		$(this).parent().remove();
		var tipDivName=$(this).parent().attr("name");
		var tabId=$("li[class='tabs-selected']").attr("tabid");
		var tipInput=$("div[tabid='"+tabId+"']").find("[name='"+tipDivName.replace("_tip_div","")+"']");
		if(tipInput && tipInput.length>0){
			tipInput.removeClass("input-error");
		}
	});
	
	//关闭提示层
	$("body").on("click",".tip-error-span",function(){
		debugger;
		$(this).parent().remove();
		var tipDivName=$(this).parent().attr("name");
		var tabId=$("li[class='tabs-selected']").attr("tabid");
		var tipInput=$("div[tabid='"+tabId+"']").find("[name='"+tipDivName.replace("_tip_div","")+"']");
		if(tipInput && tipInput.length>0){
			tipInput.removeClass("input-error");
		}
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
							var parentLiId=$(event.toElement).parents("li:last").attr("id");
							$("#menu_ztree").find("span[class='credit-span-blue']").attr("class","");
							$("#menu_ztree").find(".ztree-li-selected").removeClass("ztree-li-selected");
							$(event.toElement).attr("class","credit-span-blue");
							$(event.toElement).parents("li:last").addClass("ztree-li-selected");
							if(parentLiId=="menu_ztree_1"){
								$(event.toElement).parents("li:last").attr("style","border-top: none;");
							}
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
							$(".credit-breadcrumb").find("li:last").find("a").attr("style","color:blue;");
							//获取页面
							var fileUrlstr=treeNode.url;
							if(fileUrlstr && fileUrlstr!="#"){
								loadingBox.showLoading();
								var jsFileUrl="/p2p-webapp/js/credit/"+fileUrlstr.substring(fileUrlstr.lastIndexOf("/")+1,fileUrlstr.lastIndexOf("."))+app_verion+".js";
								fileUrlstr=fileUrlstr.indexOf("/")==0?fileUrlstr.substring(1):fileUrlstr;
								var requestUrl=appContext+"/p2p-webapp/"+fileUrlstr;
								$("title").text(treeNode.catalog_name);
								$.ajax({ 
									url: requestUrl,
									//context: document.body,
									success: function(data){
										loadingBox.hideLoading(500);
										if(data && data.indexOf("loginBtn")!=-1){
											window.location.href=appContext+"/p2p-webapp/page/login.jsp";
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
			//设置选中菜单区域对应的背景色
			var currentSelSpanId=curentTreeNode.tId+"_span";
			$("#"+currentSelSpanId).attr("class","credit-span-blue");
			if(curentTreeNode.tId=="menu_ztree_1"){
				$("#"+currentSelSpanId).parents("li:last").attr("style","border-top: none;");
			}
			$("#"+currentSelSpanId).parents("li:last").addClass("ztree-li-selected");
			//设置面包屑
			$(".credit-breadcrumb").html(liHtml);
			$(".credit-breadcrumb").find("li:last").find("a").attr("style","color:blue;");
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
//			paramsObj=JSON.parse(paramsStr.replace(/@#_#@/g,"\""));//双引号替换
			paramsObj=JSON.parse(unescape(paramsStr));
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
		var requestUrl=appContext+pageUrl;
		$.ajax({ 
			url: requestUrl,
			success: function(data){
				loadingBox.hideLoading(500);
				if(data && data.indexOf("loginBtn")!=-1){
					window.location.href=appContext+"/p2p-webapp/page/login.jsp";
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
				if($(dom).attr("widget") && $(dom).attr("widget") == "dropdown"
					|| $(dom).attr("is_data") == "true"){
					$(dom).attr("code", textValue);
				}
			});
			
			//设置input的值
			$("#"+divId).find(".credit-input").find("input").each(function(i,dom){
				var name=$(dom).attr("name");
				var inputValue=dataObj[name]!=undefined?dataObj[name]:"";
				$(dom).val(inputValue);
			});
			
			//设置textarea的值
			$("#"+divId).find("textarea").each(function(i,dom){
				var name=$(dom).attr("name");
				var textareaValue = dataObj[name] != undefined ? dataObj[name] : "";
				//处理意见字符串特殊处理
				if(name = "approve_content" && textareaValue && textareaValue.indexOf(":") != -1){
					textareaValue = textareaValue.substring(textareaValue.indexOf(":")+1);
				}
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
		$("#"+divId).find("input,select,textarea,span").each(function(i,dom){
			var domType = $(dom).get(0).tagName;
			var name = $(dom).attr("name");
			var value = $(dom).val();
			if(domType == "SPAN" && $(dom).attr("is_data") != null){
				value = $(dom).attr("code");
			}
			//过滤控制;
			if(!isEmptyString(value)) 
				request_data[name] = value;
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
	if(value == null || value.replace(/^\s+|\s+$/g,'') == "") result = true;
	return result;
}

/**
 * 检验规则
 */
var domValid = {
    required : function(value){
    	if(!isEmptyString(value)) return true;
    	else return false;
	},
    number : function(value){
    	if(isEmptyString(value)) return true;
    	return /^(0|[1-9][0-9]*)$/.test(value);
	},	
    id_card : function(value){
    	if(isEmptyString(value)) return true;
    	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
	},
	percent_num:function(value){
		if(isEmptyString(value)) return true;
    	return /^(0|[1-9][0-9]*)[%]$/.test(value);
	}
}


/**
 * 校验公共函数
 * @param elemName
 * @param tip
 * @param parentDivId
 * @param rules
 */
function validateDom(elementDom, parentDivId){
	debugger;
	var tip = "";
	var result = true;
	var elemName = $(elementDom).attr('name');
	var value = $(elementDom).val();
	//取span的值
	var domType = $(elementDom).get(0).tagName;
	if(domType == "SPAN") 
		value = $(elementDom).attr("code");
	//取校验规则
	var rules = $(elementDom).attr("validation").split(" ");
	//循环校验
	for(var i = 0; i < rules.length; i++){
		var rule = rules[i];
		switch(rule){
			case 'required':
				result = domValid.required(value);
				tip = "此项为必填！";
				break;
			case 'number':
				result = domValid.number(value);
				tip = "无效数字！";
				break;
			case 'id_card':
				result = domValid.id_card(value);
				tip = "无效身份证号码！";
				break;
			case 'percent_num':
				result = domValid.percent_num(value);
				tip = "无效的百分比！";
				break;
		}
		//校验失败， value重置为空
		if(!result){
			value = "";
			validErrorTip(elemName, elementDom, tip,parentDivId);
			break;
		}
	}
	return result;
}

/**
 * 校验失败tip提示
 * @param elemName
 * @param content
 */
function validErrorTip(elemName, elementDom, tip, parentDivId){
	debugger;
//	var elemNameTipLength;
//	if(parentDivId){
//		elemNameTipLength = $("#" + parentDivId).find("span[name='" + elemName + "_tip']").length;
//	}else{
//		elemNameTipLength = $("span[name='" + elemName + "_tip']").length;
//	}
//    if(elemNameTipLength == 0){
//	    $(elementDom).parent().after("<span class='error-tip' name='" + elemName + "_tip' style='color:red;'>" + tip + "</span>");
//    }
//    $(elementDom).change(function(e){
//    	if(parentDivId){
//    		$("#"+parentDivId).find("span[name='" + elemName + "_tip']").remove();
//    	}else{
//    		$("span[name='" + elemName + "_tip']").remove();
//    	}
//	    $(this).unbind(e);
//    });
	var tabId=$("li[class='tabs-selected']").attr("tabid");
	var tipDivName=$(elementDom).attr("name")+"_"+"tip_div";
	if($(elementDom).attr("index")){
		tipDivName+=$(elementDom).attr("index");
	}
	$(elementDom).addClass("input-error");
	var elementOffset=$(elementDom).offset();
	var leftX=elementOffset.left+($(elementDom).width()/4-5);
	leftX+="px";
	var topY=elementOffset.top+($(elementDom).height())+10;
	var tagName=$(elementDom)[0].tagName;
    if(tagName=="TEXTAREA" || tagName=="SELECT"){
    	topY+=6;
	}
    topY+="px";
    if($("div[name='"+tipDivName+"']").length>0){
    	$("div[name='"+tipDivName+"']").remove();
    }
	$("div[tabid='"+tabId+"']").append('<div name="'+tipDivName+'" class="tip-error" style="display:none;"><span class="tip-error-close">X</span><span class="tip-error-span">x</span>'+tip+'</div>');
	if($(elementDom).width()<200){
		var tipW=$("div[name='"+tipDivName+"']").width()/2;
		leftX=(elementOffset.left-tipW+5)+"px";
	}
	$("div[name='"+tipDivName+"']").css({"left":leftX,"top":topY});
	$("div[name='"+tipDivName+"']").show();
	$(elementDom).change(function(e){
		$(this).removeClass("input-error");
		$("div[tabid='"+tabId+"']").find("div[name='"+tipDivName+"']").remove();
	    $(this).unbind(e);
    });
}

//公共重置函数
function clearDomVal(areaDivId){
	$("#"+areaDivId).find("input").each(function(i,input){
		$(input).val("");
	});
	
	$("#"+areaDivId).find("select").each(function(i,select){
		$(select).val("");
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
    		servletUrl=appContext+"/p2p-webapp/ShowPicture?imgType="+imgType+"&userId="+userId;
    	}
    	var showHtml="";
    	if(servletUrl){
    		showHtml='<img src="'+servletUrl+'" style="max-width: 430px;max-height:280px;">';
    	}else{
    		showHtml='<span style="display: inline-block;">没有图片！</span>';
    		
    	}
    	var temp="<div style=\"border:2px solid #37B6D1;background-color: #fff; font-weight: bold;font-size: 12px;\" >"
			+"<div style=\"line-height:25px; padding:0px 5px;	background-color: #37B6D1;\">"+(dialogTitle || "")+"<span style=\"float: right;\" class=\"img-dialog-close\"><a style=\"text-decoration: underline;color: blue;\">关闭</a></span></div>"
			+"<table width=\"500px\" height=\"300px\" cellspacing=\"0\" border=\"0\"><tr>" 
			+"<td  style=\" padding:0px 0px 0px 20px;align:center;font-size: 20px;\" align=\"center\">"+showHtml+"</td>"
			+"</tr></table>"
			+"</div>";
		
		//创建弹出层
		$("body").append("<div id='showImgDialogDiv' class='drag'></div>");
		var showImgDialogDiv=$("#showImgDialogDiv");
		showImgDialogDiv.attr("style","position:absolute;width: 500px;height: 300px;overflow:visible;z-index:1990;");
		showImgDialogDiv.html(temp);
		var left=($(window).width()-showImgDialogDiv.width())/2+"px";
		var top=(($(window).height()-showImgDialogDiv.height())/2+document.body.scrollTop)+"px";
		showImgDialogDiv.css({'left':left,'top':top});
		//关闭图片层
		showImgDialogDiv.find(".img-dialog-close").click(function(){
			//删除图片显示层
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
		img_type:"",
		user_id:"",
		is_upload:"",
		uploadElement:"",
		//创建弹出框
	    createUploadDialog:function(uploadElement,img_type,user_id,is_upload){
	    	$("#uploadDialogDiv").remove();
	    	uploadDialog.removeMaskDiv();
	    	uploadDialog.createMaskDiv();
    		uploadDialog.uploadElement=uploadElement || "";
    		uploadDialog.img_type=img_type || "";
    		uploadDialog.user_id=user_id || "";
    		uploadDialog.is_upload=is_upload || "";
    		var tdHtml="";
    		if(uploadDialog.is_upload){
    			var servletUrl=appContext+"/p2p-webapp/ShowPicture?imgType="+img_type+"&userId="+user_id;
    			tdHtml="<img style='max-width: 430px;max-height:280px;' src='"+servletUrl+"' />";
    		}else{
    			tdHtml="点击上传按钮选择图片！";
    		}
			var temp="<form name='uploadImgForm' method='post' enctype='multipart/form-data' target='hidden_frame'><div style=\"border:2px solid #37B6D1;background-color: #fff; font-weight: bold;font-size: 12px;\" >"
					+"<div style=\"line-height:25px; padding:0px 5px;	background-color: #37B6D1;\">图片上传(类型：jpg、png、bmp)<span style=\"float: right;\" class=\"img-dialog-close\"><a style=\"text-decoration: underline;color: blue;\">关闭</a></span></div>"
					+"<table width=\"500px\" height=\"300px\" cellspacing=\"0\" border=\"0\"><tr>" 
					+"<td  style=\" padding:0px 0px 0px 20px;align:center;font-size: 20px;\" align=\"center\">"+tdHtml+"</td>"
					+"</tr></table>"
					+"<div style=\"display:none;\"><input id='imgFile' name='imgFile' type=\"file\"/> </div>"
					+"<div style=\"text-align:center; padding:0px 0px 20px;background-color: #fff;\">" 
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
			//关闭图片上传弹出框
			uploadDialogDiv.find(".img-dialog-close").click(function(){
				uploadDialog.cancelFunc();
			});
			$("#uploadDialogDiv").find("input[type='file']").change(function(){
				debugger;
				var imgUrl=$(this).val();
				if(imgUrl){
					var imgSuffix=imgUrl.substring(imgUrl.lastIndexOf(".")+1);
					if(imgSuffix && imgSuffix.toLowerCase()!="jpg" && imgSuffix.toLowerCase()!="png" && imgSuffix.toLowerCase()!="bmp"){
						$("#uploadDialogDiv").find("td").html("<span style='color:red;'>只能上传jpg、png、bmp类型的图片！</span>");
						return false;
					}
					loadingBox.showLoading();
					var uploadImgForm=$("#uploadDialogDiv").find("form[name='uploadImgForm']");
					uploadImgForm[0].action=appContext+"/p2p-webapp/UploadPicture?userId="+uploadDialog.user_id+"&imgType="+uploadDialog.img_type;
					uploadImgForm.submit();
				}else{
					$("#uploadDialogDiv").find("td").html("点击上传按钮选择图片！");
		    		$("span[name='"+uploadDialog.uploadElement+"']").attr("is_upload","false");
				}
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
	    		if(resultObj && resultObj.result=="true"){
	    			var servletUrl=appContext+"/p2p-webapp/ShowPicture?imgType="+uploadDialog.img_type+"&userId="+uploadDialog.user_id;
	    			$("#uploadDialogDiv").find("td").html("<img style='max-width: 430px;max-height:280px;' src='"+servletUrl+"' />");
	    			$("span[name='"+uploadDialog.uploadElement+"']").attr("is-upload","true");
	    			//移除提示层
	    			var tabId=$("li[class='tabs-selected']").attr("tabid");
	    			var tipDiv=$("div[tabid='"+tabId+"']").find("div[name='"+uploadDialog.uploadElement+"_tip_div']");
	    			if(tipDiv && tipDiv.length>0){
	    				tipDiv.remove();
	    			}
	    			$("span[name='"+uploadDialog.uploadElement+"']").removeClass("input-error");
	    		}
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
				+"<div style=\"line-height:25px; padding:0px 5px;	background-color: #37B6D1;\">"+title+"<span style=\"float: right;\" class=\"img-dialog-close\"><a style=\"text-decoration: underline;color: blue;\">关闭</a></span></div>"
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
		//关闭弹出框提示层
		messageDialogDiv.find(".img-dialog-close").click(function(){
			messageBox.removeMessageDialogDiv();
		});
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
	if(requestData && requestData.parent_id){
		cacheKey+="_"+requestData.parent_id;
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
	var parent_id=$(e).find("option:selected").attr("item-val");
	var code=$(triggerDom).attr("code");
	var paramsObj = {};
	//参数
	paramsObj[params_key] = value;
	if(dictionary_type){
		paramsObj.type=dictionary_type;
	}
	paramsObj.parent_type=parent_type || "";
	paramsObj.parent_id=parent_id || "";
	paramsObj.parent_code=value;
	//获取缓存里面的数据
	var cacheKey="cascade_city"+"_"+moduleName+"_"+methodName+"_"+value+"_"+parent_type+"_"+(dictionary_type || "")+"_"+parent_id;
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
				$(dom).append('<option item-val="'+data[i].dictId+'" value="'+data[i][valueField]+'"  selected="selected">'+data[i][textField]+'</option>');
				// 下拉框（如果是省份，则触发change事件，级联城市）
				var triggerKey = $(dom).attr('trigger');
				if(triggerKey != null && triggerKey.indexOf("city_cascade_") != -1){
					elementCascade(dom, code);
				}
			}else{
				$(dom).append('<option item-val="'+data[i].dictId+'" value="'+data[i][valueField]+'">'+data[i][textField]+'</option>');
			}
		}
	}
}