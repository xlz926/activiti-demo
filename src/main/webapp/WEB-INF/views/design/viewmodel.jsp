<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查看流程图</title>
<%@ include file="/resource/meta.jsp"%>
<%@ include file="/resource/global.jsp"%>
    <%@ include file="/resource/include-base-styles.jsp" %>

    <!-- 开发平台地址 -->
<script src="${jsPath }/lib/seajs/sea.js"
        data-config="${jsPath }/lib/seajs/config.js"
        data-main="${jsPath }/module/design/workflow.view.js"></script> 
<style>
.tip img{ width: 15px;height: 15px;}
.tip li{margin: 0px 5px;}
</style>

</head>
<body >

<div id="viewFolw" style="height:100%;"></div>
<textarea id="model" class="hide">${model}</textarea>
<textarea id="record" class="hide">${pageInfo}</textarea>
</body>
</html>
<script>
seajs.use("module/design/workflow.view",function(workfolw){
	$(function(){
		
		
	 new workfolw($("#viewFolw"),$("#model").val(),$("#record").val()); 
		
		
	});
	
	
	
	
});


</script>