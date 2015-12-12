<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
</head>
<body>
   <!-- 菜单区域 -->
	<div id="credit_LeftPanel" class="equalheight-item content-equalheight-item">
		<div class="heightfixed-left">
			<!--展开、收缩图标区域 -->
			<div id="credit_Menu" widget="ToggleMenu" name="credit_bigIcon" class="render credit-menu menu-tree menu-togglemenu creditRendered tree-togglemenu credit-tree">
				<div class="credit-menu-toggle">
					<a class="toggle-icon credit-icon icon-chevron-left" title="点击进行菜单收起到边缘"><</a>
				</div>
			</div>
			
			<!-- 左侧栏目树区域 -->
			<div id="menu_ztree" class="ztree" style="overflow-x: hidden;overflow-y:auto;height: 500px;">
			
			</div>
		
		</div>
	</div>
</body>
</html>