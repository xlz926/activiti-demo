<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div  id="emailList"  data-datagrid="{url:'design/getEmailData'}">
	<div class="datagrid-search">
		<form class="form-search">

			<ul  class="search">
			   <li>
				<label><spring:message code="mail.txt.id" />：</label><input type="text" placeholder="<spring:message code="mail.txt.id" />" name="sch_id" /></li>
				 <li><label><spring:message code="mail.txt.name" />：</label><input  type="text" placeholder="<spring:message code="mail.txt.name" />" name="sch_name" /></li>
				<li><a class="btn" name="search" data-rel='btn'> 
				<i class="icon-search"></i>
				<spring:message code="common.btn.search"></spring:message>
			    </a>
			    </li>
				
				</ul> 

		</form>
	</div>
	
	<table class="table">
		<thead>
			<th style="width:20px">#</th>
			<th style="width:100px" class="sort-header" data-code="MAIL_TEMPLATE_ID" ><spring:message code="mail.txt.id" /></th> 
			<th style="width:100px"><spring:message code="mail.txt.name"/></th> 
			<th style="width:140px" ><spring:message code="mail.txt.to_mail" /></th> 
			<th style="width:140px" ><spring:message code="mail.txt.from_mail" /></th> 
			<th style="width:140px" ><spring:message code="mail.txt.cc" /></th> 
			<th style="width:300px"  ><spring:message code="mail.txt.subject" /></th> 
			<th style="width:140px"  ><spring:message code="mail.txt.format" /></th> 
		</thead>
		<tbody class="hide">
			<tr>
            <td><input type="checkbox" class="datagrid-cell-check" value="{{>id}}"/></td>
			<td>{{>id }}</td>
			<td>{{>name }}</td>
			<td>{{>to_mail }}</td>
			<td>{{>from_mail }}</td>
			<td>{{>cc }}</td>
			<td>{{>subject }}</td>
			<td>{{>format }}</td>
		</tr>
		</tbody>
	</table>
	
</div>


