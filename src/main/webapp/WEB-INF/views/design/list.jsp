<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div id="modelListGrid" >
	<div class="datagrid-search">
	<form  class="form-search">
	    <ul> 
		    <li><label><spring:message code="procemodel.txt.key" />：</label><input  type="text" placeholder='<spring:message code="procemodel.txt.searchKey" />' name="sch_modelKey" /></li>
		    <li><label><spring:message code="procemodel.txt.name" />：</label><input  type="text" placeholder='<spring:message code="procemodel.txt.name" />' name="sch_modelNameLike" /></li>
		    <li style="width:270px;">
 			<!-- selected="selected" 默认选择项 -->
			<select name="sch_selectModels" validate="{required:true}" data-chosen="">
				<option value="selectAll" selected="selected"><spring:message code="process.txt.selectAlls"/></option>
				<option value="notDeployed"><spring:message code="procemodel.txt.notDeployed"/></option>
				<option value="active"><spring:message code="procemodel.txt.deployed"/></option>		
				<option value="suspended"><spring:message code="process.txt.suspended"/></option>
			</select>	
		    <a href="getDataList" name="search" class="btn" data-rel="btn" ><i class="icon-search"></i><spring:message code="common.btn.search"></spring:message></a></li>
	    </ul>
	   </form>
	</div>	
	<table>
		<thead>
			<th width="22"><spring:message code="common.txt.seq" /></th>
			<th width="15"></th>	
			<th width="160" class="sort-header" data-code="modelKey"><spring:message code="procemodel.txt.key"/></th>		
			<th width="200" class="sort-header" data-code="modelName"><spring:message code="procemodel.txt.name" /></th>
			<th width="30" class="sort-header" data-code="modelVersion"><spring:message code="procemodel.txt.version" /></th> 	 			 						
			<th width="50"><spring:message code="procemodel.txt.state" /></th>
			<th width="70"><spring:message code="common.txt.createby" /></th>
			<th width="70"><spring:message code="common.txt.modifyby" /></th>		
			<th width="120" class="sort-header" data-code="createTime"><spring:message code="procemodel.txt.createTime" /></th>	
			<th width="120" class="sort-header" data-code="lastUpdateTime"><spring:message code="procemodel.txt.modifyTime" /></th>	
			<th width="120"><spring:message code="procemodel.txt.deploymentTime" /></th>			
		</thead>
		<tbody style="display:none">
		     <tr>
	            <td style="text-align: right;">{{:#index+1}}</td>
	            <td><input type="checkbox" class="datagrid-cell-check" value="{{:id }}"/></td>       
	            <td title="{{:key }}">{{:key }}</td>	
				<td title="{{:name }}">{{:name }}</td>
				<td align="center">{{:version }}</td>
				<td>
				   {{if state=="3" }}
				       <span class="badge badge-success">
				           <spring:message code="procemodel.txt.deployed"/>
				       </span>
				   {{else state=="2" }}  
				        <span class="badge badge-info">
				            <spring:message code="process.txt.suspended"/>
				        </span>
				   {{else}}
				        <span class="badge badge-important"> 				    
						    <spring:message code="procemodel.txt.notDeployed"/>
	 				    </span>					
				   {{/if}}			              
				</td>			
				<td title="{{:createby }}">{{:createby }}</td>		
				<td title="{{:modifyby }}">{{:modifyby }}</td>		
				<td>{{:~formatDate(modifydate,"yyyy-MM-dd hh:mm:ss")}}</td>			
				<td>{{:~formatDate(createdate,"yyyy-MM-dd hh:mm:ss")}}</td>							
				<td>{{:~formatDate(deploymentTime,"yyyy-MM-dd hh:mm:ss")}}</td>	
			</tr>	
		</tbody>
	</table>
</div>