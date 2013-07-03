<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<form id="fromEdit" permission="${permission}">
<%@ include file="../header.jsp" %>

 <div class="row-fluid">
		<div class="span12 center form-area" title="表单内容">
		<input type="hidden" value="" name="procInstanceId"> <!-- 流程实例ID -->
		<input type="hidden" value="" name="state"> <!-- 表单状态 -->
		<input type="hidden" value="" name="taskId"><!-- 活动ID -->
		<input type="hidden" value="" name="taskName" id="taskName"><!-- 流程节点(任务名称) -->
		<input type="hidden" value="" id="billNo"><!-- 单据编号 -->
		<!-- 审核状态,0-未签收/未分配,1-已签收/已分配,2-已委派,3-已代理,4-已取回,5-已加签 -->
		<input type="hidden" value="" name="taskState" id="taskState">
		<input type="hidden" value="" name="sendAccount"> <!-- 送审人账号 -->
			<ul>
				<li><label class="red">开始时间：</label> <input type="text" value="20121212" validate="{required:true}" id="beginDate" name="beginDate" class="date hasDatepicker"></li>
				<li><label class="red">结束时间：</label> <input type="text" value="20121212" validate="{required:true}" id="endDate" name="endDate" class="date hasDatepicker"></li>
				<li><label class="red">出差天数：</label> <input type="text" value="20121212" validate="{required:true,number:true,min:0}" name="eDays" id="eDays"></li>
				<li><label class="red">单据张数：</label> <input type="text" value="20121212" validate="{number:true,min:0,digits:true,required:true}" name="affixNo" id="affixNo"></li>
				<li><label>预支金额：</label> <input type="text" value="" maxlength="18" validate="{number:true,min:0,maxlength:14}" name="prepMoney" id="prepMoney"></li>
				<li><label>补助金额：</label> <input type="text" value="" maxlength="18" validate="{number:true,min:0,maxlength:14}" name="allowance" id="allowance"> <input type="hidden" name="totalTemp" id="totalChar"></li>
				<li style="width: 580px; height: 80px;"><label>出差事由：
				</label> <textarea id="evectionReason" name="evectionReason" style="width: 440px;" rows="3"></textarea>
				</li>
			</ul>
		</div>
		</div>
		
		
 <div class="row-fluid">
					<div class="span12 center form-area" title="费用明细">
				
				<div class="datagrid" style="width: 1176px;"><div class="datagrid-wrap" style="width: 1176px;"><div class="datagrid-view" style="width: 1176px; height: 150px;"><div class="datagrid-view1" style="width: 0px; height: 150px;"><div class="datagrid-header" style="width: 0px; height: 28px;"><div class="datagrid-header-inner"><table cellspacing="0" cellpadding="0" border="0" style="height: 28px;"><thead><tr></tr></thead></table></div></div><div class="datagrid-body" style="width: 0px; height: 121px;"><div class="datagrid-body-inner"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="datagrid-cell"></div></td></tr></tbody></table></div></div></div><div class="datagrid-view2" style="width: 1176px; left: 0px;"><div class="datagrid-header" style="width: 1176px; height: 28px;"><div class="datagrid-header-inner"><table cellspacing="0" cellpadding="0" border="0" style="height: 29px;"><thead><tr align="center">
								<th width="90px" class=""><div class="datagrid-cell" style="width: 90px;"><span><a style="color: red;" id="addDetails" href="javascript:void(0);">添加明细(Ctrl+N)</a> <input type="hidden" name="tempDetails" id="billDetails"></span></div></th>
								<th width="70px" class=""><div class="datagrid-cell" style="width: 70px;"><span>日期</span></div></th>
								<th width="135px" class=""><div class="datagrid-cell" style="width: 135px;"><span>起迄地址</span></div></th>
								<th width="50px" class=""><div class="datagrid-cell" style="width: 50px;"><span>天数</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>机票费</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>车船费</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>市内交通费</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>住宿费</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>出差津贴费</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>出差餐费</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>杂费</span></div></th>
								<th width="90px"><div class="datagrid-cell" style="width: 90px;"><span>小计</span></div></th>
							</tr></thead></table></div></div><div class="datagrid-body" style="width: 1176px; height: 121px;"><div data-datagrid="{pagination:false,data:{dataList:[]}}" id="detailsTable_edit" cellspacing="0" cellpadding="0" border="0">
					<table id="mytable_edit" class="table"></table>
					</div></div></div></div></div></div></div>
		</div>
		

		<!-- 如果有操作权限引入fileUploadOperInfo.jsp，如果无权限引入fileUploadInfo.jsp -->
		





 <div class="row-fluid">
					<div class="span12 center form-area">
<!-- 可用浏览与添加 -->
<div title="附件明细" class="form-area" style="width: 99%;">
	<div style="width: 80%;float: left;">
		<ul id="uploadResult" style="padding-top:10px">
					<li class="uplodNoMsg">无附件信息</li>
		</ul>
	</div>
	<div style="width: 100px;float: right;">
		<a href="javascript:void(0)" id="upload" class="btn btn-primary">
			<i class="icon-upload icon-white"></i>添加
		</a>
	</div>
</div> 
		
		
	</div>
	</div>
	 <div class="row-fluid">
					<div class="span12 center form-area">
<!-- 可用浏览与添加 -->
<div title="附件明细" class="form-area" style="width: 99%;">
	<div style="width: 80%;float: left;">
		<ul id="uploadResult" style="padding-top:10px">
					<li class="uplodNoMsg">无附件信息</li>
		</ul>
	</div>
	<div style="width: 100px;float: right;">
		<a href="javascript:void(0)" id="upload" class="btn btn-primary">
			<i class="icon-upload icon-white"></i>添加
		</a>
	</div>
</div> 

	</div>
	</div>
	</form>
	
	<script>
	$(document).ready(function(){
	  var form = $("#fromEdit");
	  
	  form.find(".row-fluid").each(function(i){
		  if(form.attr('permission').charAt(i)==1){
			 $(this).viewform();
		  }
	  });
	  
	  form.scrollspy({selector:'.form-area'});
	});
	
	
	
	
	</script>