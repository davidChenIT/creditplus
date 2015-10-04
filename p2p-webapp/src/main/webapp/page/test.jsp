<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>测试界面</title>
<script src="<%=request.getContextPath()%>/js/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
</head>
<body>
<form action="<%=request.getContextPath()%>/services/process" method="post">
	<textarea name="request_data" rows="20" cols="100"></textarea> <br/>
	<input type="text" name="module"  />
	<input type="text" name="method" />
	<input type="submit" value="submit" />
</form>

</body>
</html>