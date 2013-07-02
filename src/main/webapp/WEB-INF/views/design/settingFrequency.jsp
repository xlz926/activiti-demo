<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<form class="pageForm">
    <div class="page-content">
		<div class="pageFormContent form-area" title='起始时间' style="margin-top:5px">
			<ul>
				<li>
				 	<input type="radio" id="rightNow" value="0" checked="checked" name="startTime"/><span>立刻</span>
		        </li>
				<li style="width: 98%; margin-bottom: 15px;" id="taskLi">
				 	<input type="radio" id="beforeExpire" value="1" name="startTime"/><span>任务到期前</span>
				 	<input id="startTimeNum" value="1" validate="{required:true,number:true}"/>
					<select id="startTimeDateType" required="required" style="margin-top: 10px">
						<c:forEach items="${dateTypes }" var="item">
							<option value="${item.key }">${item.value }</option>
						</c:forEach>
					</select>
		        </li>
			</ul>
		</div>
		<div class="pageFormContent form-area" title='发送频率' >
			<ul>
				<li>
				 	<input type="radio" id="once" value="0" checked="checked" name="frequency"/><span>一次</span>
		        </li>
				<li style="width: 98%;margin-bottom: 15px;">
				 	<input type="radio" id="everyTimes" value="1" name="frequency"/><span>每</span>
				 	<input id="frequencyNum" value="1" validate="{required:true,number:true}"/>
					<select id="frequencyDateType" required="required" style="margin-top: 10px">
						<c:forEach items="${dateTypes }" var="item">
							<option value="${item.key }">${item.value }</option>
						</c:forEach>
					</select>
					<span>一次</span>
		        </li>
			</ul>
		</div>
	</div>
</form>