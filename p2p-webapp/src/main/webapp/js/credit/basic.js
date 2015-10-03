//页面初始化加载函数
$(function(){
	
	//注册window的onpopstate事件
	window.onpopstate = function(event) {  
		  debugger;
		  window.location.href=window.location.href;
	}; 
	
	
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
					$(".hae-breadcrumb").html(liHtml);
					
					//获取页面
					var fileUrlstr=treeNode.urlstr;
					if(fileUrlstr){
						var jsFileUrl="../js/credit/"+fileUrlstr.substring(fileUrlstr.lastIndexOf("/")+1,fileUrlstr.lastIndexOf("."))+".js";
						var requestUrl="http://"+window.location.host+"/p2p-webapp/"+fileUrlstr;
						window.history.pushState({},treeNode.name, requestUrl+"?"+(new Date()).getTime());
						$("title").text(treeNode.name);
						$.ajax({ 
							url: requestUrl,
							//context: document.body,
							success: function(data){
								debugger;	
								if(data && data.length>0){
								  var  haeMainHtml=data.substring(data.indexOf("<!--hae_Main_start-->"),data.indexOf("<!--hae_Main_end-->")+19);
								  $("#hae_Main").html(haeMainHtml);
								  if(treeNode.isloadjs=="true"){
									  $("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
								  }
								}
							},error:function(error){
							  debugger;
							  $("#hae_Main").html('<div class="hae-wrong"><h2 class="hae-errcode">404</h2><p class="hae-errtext">Not Found</p><div></div><p></p><p>城立信金融</p></div>');
							}
						});
					}
					
					
				}
		}

	},zTreeNodes = [
		{"id":1,"pId":0,"name":"首页","urlstr":"page/index.html",isloadjs:"true"},
		{"id":2,"pId":0,"name":"风控管理"},
		{"id":3,"pId":0,"name":"系统管理"},
		{"id":4,"pId":3,"name":"权限管理","urlstr":"page/hh.html",isloadjs:"true"},
		{"id":5,"pId":2,"name":"信用初审","urlstr":"page/firstTrialList.html",isloadjs:"true"},
		{"id":6,"pId":2,"name":"信用复审","urlstr":"page/reviewList.html",isloadjs:"true"},
		{"id":7,"pId":2,"name":"标的管理","urlstr":"page/tenderMngList.html",isloadjs:"true"},
		{"id":8,"pId":2,"name":"投标","urlstr":"page/makeTenderList.html",isloadjs:"true"}
		
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
	$(".hae-breadcrumb").html(liHtml);



	//展开或隐藏左侧栏目区域
	$("#hae_Menu").on("click",".toggle-icon",function(){
		
		var thisClss=$(this).attr("class");
		if(thisClss.indexOf("icon-chevron-left")!=-1){
			 $(this).attr("class",thisClss.replace("icon-chevron-left","icon-chevron-right"));
			 $(this).text(">");
			 $("#hae_LeftPanel").width("30");
			 $("#menu_ztree").hide()
		}else{
			 $(this).attr("class",thisClss.replace("icon-chevron-right","icon-chevron-left"));
			 $(this).text("<");
			 $("#hae_LeftPanel").width("216");
			 $("#menu_ztree").show()
		}
		
	});


	//tab页面点击事件
	$("#hae_Main").on("click",".tabs-head li",function(){
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
				    $(".tabs-body").children("div").attr("class","tabs-body-item haePageContext hae-validator hae-hide");
				    var requestUrl="http://"+window.location.host+"/p2p-webapp/"+pageAddress;
				    var jsFileUrl="../js/credit/"+pageAddress.substring(pageAddress.lastIndexOf("/")+1,pageAddress.lastIndexOf("."))+".js";
					$.ajax({ 
						url: requestUrl,
						//context: document.body,
						success: function(data){
							debugger;	
							if(data && data.length>0){
							  //var  haeMainHtml=data.substring(data.indexOf("<!--hae_Main_start-->"),data.indexOf("<!--hae_Main_end-->")+19);
							  $(".tabs-body").append(data);
							  
							  $("head").append('<script src="'+jsFileUrl+'" type="text/javascript"></script>"');
							}else{
								$("#hae_Main").html('<div class="hae-wrong"><h2 class="hae-errcode">404</h2><p class="hae-errtext">Not Found</p><div></div><p></p><p>城立信金融</p></div>');
							}
							
						},error:function(error){
						  debugger;
						  $("#hae_Main").html('<div class="hae-wrong"><h2 class="hae-errcode">404</h2><p class="hae-errtext">Not Found</p><div></div><p></p><p>城立信金融</p></div>');
						}
					});
					
					$(this).removeAttr("page");
			   }else{
				   currentTab.attr("class","tabs-body-item haePageContext hae-validator");
				   //相邻的内容区域隐藏
				   currentTab.siblings("div").attr("class","tabs-body-item haePageContext hae-validator hae-hide");
			   }
			  
			   
			}
		
		
	});

})