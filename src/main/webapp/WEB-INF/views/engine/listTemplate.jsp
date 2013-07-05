<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<div id="templateList" url='engine/dataTemplate'>
<table>

   <thead><tr><th>模板key</th><th>模板名称</th><th>创建时间</th><th></th><th></th></tr></thead>
  <tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>

</table>


</div>


<script>
$(document).ready(function(){
	$("#templateList").basegrid();
	
});


</script>