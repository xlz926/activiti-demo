<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div data-layout fit="true" >
	<div region="center" border="false" >
		<div data-tabs="tabs">
			<div title="按组织选">
				<div data-layout fit="true" style="height: 100%; width: 100%;">
					<div region="north" style="width: 100%;height:38px;" border="false">
						<div class="datagrid-search">
						   <form class="form-search" onkeydown="if(event.keyCode==13){return false;}" >
							   	<ul>
							   		<li>
										<label><spring:message code="org.txt.orgname" />：</label>
										<input  type="text" class="search-query" placeholder='<spring:message code="org.txt.orgname" />' id="keyword" />
									</li>
							   	</ul>
							</form>
						</div>
					</div>
					<div region="west"  style="width: 300px" border="false">
						<div id="orgTabs">
							<div id="orgTabAdministrative" title='<spring:message code="org.txt.administrative" />'>
								<ul id="orgAdministrativeTree" class="ztree"></ul>
							</div>
							<div id="orgTabBusiness" title='<spring:message code="org.txt.business" />'>
								<ul id="orgBusinessTree" class="ztree"></ul>
							</div>
						</div>
					</div>
					<!-- 组织列表-->
					<div region="center" border="false">
						<div data-tabs="tabs">
							<div title='按职位选'>
								<ul id="positionTree" class="ztree"></ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div title="按工作组选">
				<div id="GroupList" data-datagrid="datagrid" url="common/groupData">
					<div class="datagrid-search">
					   <form class="form-search" onkeydown="if(event.keyCode==13){return false;}" >
					   		<ul>
					   			<li style="width: 350px">
									<label title='<spring:message code="group.txt.name" />'><spring:message code="group.txt.name" />：</label>
									<div class="input-append">
										<input class="input-medium" type="text" placeholder='<spring:message code="group.txt.name" />' name="sch_name" />
										<a class="btn" name="search" data-rel='btn'> <i class="icon-search"></i><spring:message code="common.btn.search"></spring:message></a>
									</div>
					   			</li>
					   		</ul>
						</form>
					</div>
					<table class="table">
						<thead>
							<tr>
								<th width="25"><spring:message code="common.txt.seq"/></th>
								<th width="13"></th>
								<th width="150"><spring:message code="group.txt.id" /></th> 
								<th width="140"><spring:message code="group.txt.name" /></th> 
								<th width="200"><spring:message code="group.txt.description" /></th> 
							</tr>
						</thead>
						<tbody style="display:none">
					        <tr>
			           			<td>{{:#index+1 }}</td>
			           			<td><input type="checkbox" class="datagrid-cell-check" value="{{:id}}"/></td>
								<td>{{:id }}</td>
								<td>{{:name }}</td>
								<td>{{:description }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div title="按人员选">
				<div id="UserList" data-datagrid="datagrid" url="common/userData">
					<div class="datagrid-search">
					   <form class="form-search" onkeydown="if(event.keyCode==13){return false;}" >
						   	<ul>
						   		<li style="width: 350px">
									<label style="width: 100px" title='<spring:message code="user.txt.idorname" />'><spring:message code="user.txt.idorname" />：</label>
									<div class="input-append">
										<input class="input-medium" type="text" placeholder='<spring:message code="user.txt.idorname" />' name="sch_keyword" /> 
										<a class="btn" name="search" data-rel='btn'> <i class="icon-search"></i><spring:message code="common.btn.search"></spring:message></a>
									</div>
						   		</li>
						   	</ul>
						</form>
					</div>
					<table class="table">
						<thead>
							<tr>
								<th width="25"><spring:message code="common.txt.seq"/></th>
								<th width="13"></th>
								<th width="150" ><spring:message code="user.txt.id" /></th> 
								<th width="130"><spring:message code="user.txt.first" /></th> 
								<th width="200"><spring:message code="user.txt.email" /></th> 
							</tr>
						</thead>
						<tbody style="display:none">
						  	<tr>
					            <td>{{:#index+1 }}</td>
					            <td><input type="checkbox" class="datagrid-cell-check" value="{{:id}}"/></td>
								<td>{{:id }}</td>
								<td>{{:first }}</td>
								<td>{{:email }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div title="高级设置">
				<div style="text-align: center;height: 5px;">
					<div class="form-area" title="选择参与者">
						<ul>
							<li style="width: 98%">
								 <span  id="userSpan">
						            <input type="radio" class="user"  id="startUser" value="pi_processInitiator" name="user" /><label for="startUser">启动者</label>
						            <input type="radio" class="user" id="applyUser" value="pi_applyUserID" name="user" /><label for="applyUser">申请者</label>
						            <input type="radio" class="user" id="oriUser" value="pi_taskBeforeUserID" name="user" /><label for="oriUser">前一参与者</label>
						            <input type="radio" class="user" id="oriStepUser" value="pi_taskBeforeLastUserID" name="user" /><label for="oriStepUser">前一步骤最后参与者</label>
						         </span>
							</li>
						</ul>
					</div>
					<div class="form-area" title='选择关系'>
						<ul >
							<li style="width: 98%">
								 <span  id="managerSpan">
						            <input type="radio" class="manager" id="administrativeUser" value="0" name="manager" /><label for="administrativeUser">行政上级</label>
						            <input type="radio" class="manager" id="businessUser" value="1" name="manager" /><label for="businessUser">业务上级</label>
						         </span>
							</li>
						</ul>
					</div>
					<div class="form-area" title='选择组织'>
						<ul >
							<li style="width: 98%">
								 <input  type="text" id="orgTree" value="0-0" readonly="readonly" style="width: 500"/>
							</li>
						</ul>
					</div>
			</div>
			</div>
		</div>
	</div>
	<div region="south" style="height: 31px; width: 100%;" border="false">
		<div class="input-prepend" style="height: 7px">
		  <span class="add-on">当前选择的路径：</span>
		  <span class="uneditable-input" style="min-width: 475px;" id="showPath" name="showPath">Some value here</span>
		  <input type="hidden" id="path" name="path" />
		</div>
	</div>
</div>
