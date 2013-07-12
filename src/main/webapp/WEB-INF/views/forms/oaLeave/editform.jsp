<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<form permission="${permission}" method="post" action="forms/oaLeave/save">
<%@ include file="../header.jsp" %>

 <div class="row-fluid">
		<div class="span12 center form-area" title="表单内容">
			<ul>
				<li><label class="red">开始时间：</label><input type="text" value="2012-12-12" validate="{required:true}" name="startTime" class="date hasDatepicker"></li>
				<li><label class="red">结束时间：</label> <input type="text" value="2012-12-12" validate="{required:true}" name="endTime" class="date hasDatepicker"></li>
				<li><label class="red">出差天数：</label> <input type="text" value="3" validate="{required:true,number:true,min:0}" name="days" id="eDays"></li>
				<li><label>预支金额：</label> <input type="text" value="" maxlength="18" validate="{number:true,min:0,maxlength:14}" name="prepMoney" id="prepMoney"></li>
				<li><label>补助金额：</label> <input type="text" value="" maxlength="18" validate="{number:true,min:0,maxlength:14}" name="allowance" id="allowance"> <input type="hidden" name="totalTemp" id="totalChar"></li>
				<li style="width: 580px; height: 80px;"><label>出差事由：
				</label> <textarea id="evectionReason" name="evectionReason" style="width: 440px;" rows="3"></textarea>
				</li>
			</ul>
		</div>
   </div>
      <div class="form-actions">
				<button class="btn btn-primary" type="submit">保存</button>
				<button class="btn btn-success" type="submit">保存并提交</button>
				<a class="btn" href="index">取消</a>
	</div>
	</form>