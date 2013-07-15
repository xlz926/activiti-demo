<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="true"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div data-layout=""  fit="true" style="height: 100%; width: 100%;" border="false">
	<div region="north"  style="height:162px">
		<form id="urlForm" class="pageForm" method="post" action="">
			<div class="page-content">
				<div class="pageFormContent form-area" title='参数信息'>
					<ul>
						<li style="width: 99%">
							<label>URL:</label>
							<div class="input-append">
							    <input type="text" id="url" name="url" value="http://localhost:8080/bpms/services?_wadl" style="width: 570px;" validate="{required:true}"/>
							 	<button id="btnTransformUrl" class="btn btn-success" type="button" href="design/transform" style="font-size: 15px;padding-bottom: 0px" >Go!</button>
							 </div>
						</li>
						<li style="width: 99%">
							<label>名称:</label>
							<input style="width:620px;" type="text" name="name" id="name" validate="{required:true}" />
						</li>
						<li style="width: 99%">
							<label>运行时地址:</label>
							<input style="width:620px;" type="text" name="address" id="address" validate="{required:true}" value="${g_engineServer}" />
						</li>
						<li style="width: 99%">
							<label>方法签名:</label>
							<select name="method" id="method" class="input-xxlarge" style="width: 625px;" validate="{required:true}">
							</select>
						</li>
					</ul>
				</div>
			</div>
		</form>
	</div>
	<div region="center" >
		<div data-layout=""  fit="true" style="height: 100%; width: 100%;" >
			<div region="west" title="参数"  style="width:400px;" >
			<div id="paramListGrid"  >
				    <table class="table" >
		<thead>
				 <tr>
							<th width="120">类型</th>
							<th width="120">名称</th>
							<th width="110">值</th>
						</tr>
					</thead>
					<tbody id="paramTable" class="hide">
						<tr>
							<td>{{:type}}</td>
							<td>{{:name}}</td>
							<td><input type="text" class='datagrid-cell-edit' field='value' style="width:100px" value='{{:value}}' /> </td>
						</tr>
				</tbody>
	</table>
			</div>
			</div>
			<div region="center" title="返回值" >
				<div class="pageFormContent form-area">
					 <ul>
						<li>
							<label>接收返回值 :</label>
							<input type="text" id="acceptReturnType"/>
						</li>
					 </ul>
				</div>
			</div>
		</div>
	</div>
</div>
