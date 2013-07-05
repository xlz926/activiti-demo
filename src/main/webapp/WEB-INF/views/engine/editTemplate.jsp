<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<form id="fileSubmit" action="engine/deployment" method="post">
 <label>请选择需要上传的文件</label>
<input type="file" name="templateFile"/>

<input  type="submit"  class="btn" value="上传"/>

</form>


<script>
$(document).ready(function(){
	
	
	$("#fileSubmit").ajaxForm();
	
});


</script>