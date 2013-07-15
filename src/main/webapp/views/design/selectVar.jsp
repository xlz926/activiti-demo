<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<style>
ul#icons li {
     cursor: pointer;
    float: left;
    height: 30px;
    line-height: 30px;
    list-style: none outside none;
    margin: 2px;
    position: relative;
    text-align: center;
    width: 30px;
}
</style>
<div data-layout  fit="true" style="height: 100%; width: 100%;" border="false">
	<div region="west" fit="true" style="width:360px;height: 100%" title='流程变量'>
		<div id="flowVarListGrid" data-datagrid="{pagination:false}" url="flowvar/getFlowVarList">
			<div class="datagrid-search" >
			   <form class="form-search" >
			   		<label style="width: 80px;line-height: 20px">变量名称:</label>
					<div class="input-append" style="margin-bottom: 4px" >
						<input type="text" name="sch_name" style="width:160px"/> 
						<a class="btn" name="search" data-rel='btn'> <i class="icon-search"></i><spring:message code="common.btn.search"></spring:message></a>
					</div>
				</form>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th width="150" class="sort-header" data-code="VARIABLE_NAME">变量名称</th>
						<th width="100" class="sort-header" data-code="VARIABLE_TYPE" >变量类型</th>
						<th width="60">变量类别</th>
					</tr>
				</thead>
				<tbody style="display:none" >
			    	<tr>
						<td title="{{:name}}">{{:name }}</td>
						<td title="{{:type}}" >{{:type}}</td>
						<td title="{{:category}}">
							{{if category=="process_instance"}}
								${varCategorys["process_instance"] }
							{{else category=="activity"}}
								${varCategorys["activity"] }
							{{else category=="global"}}
								${varCategorys["global"] }
							{{/if}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div region="center" fit="true" style="height: 100%; width: 100%;">
	     <div id="operating" style="height: 100%; width: 100%;">
	     	<div data-layout  fit="true" style="height: 100%; width: 100%;" >
		     	<div region="north" fit="true" style="height:210px" border="false" title="条件表达式">
		     		<div style="width：100%;height:100%;overflow: hidden">
			     		<div id="showVarValueDiv" style="height:100%; overflow: hidden">
				     		<div style="height:140px; overflow: hidden" title="如果手动输入变量，请在变量前后加入一个空格，否则无法替换">
								<textarea class="hide" id="hideVarValue"></textarea>
								<textarea style="width: 330px;height: 133px" id="showVarValue" title="如果手动输入变量，请在变量前后加入一个空格，否则无法替换"> </textarea>
				     		</div>
				     		<div>
				     			<a id="viewExpression" class="btn" style="float: left;">查看表达式</a>
				     			<a id="reset" class="btn" style="float: right">重置</a>
				     		</div>
			     		</div>
			     		<div id="expressionValueDiv" style="height:100%; overflow: hidden" class="hide">
				     		<div style="height:140px; overflow: hidden">
								<textarea style="width: 330px;height: 133px;" id="expressionValue" readonly="readonly"> </textarea>
				     		</div>
				     		<div>
				     			<a id="viewBack" class="btn" style="float: left;">返回</a>
				     		</div>
			     		</div>
		     		</div>
				</div>
	     		<div region="west" border="false" style="width:125px;height: 100%;" >
	     			<ul class="ui-widget ui-helper-clearfix" id="icons" style="width:110px;margin-left: 8px;">
			            <li class="ui-state-default ui-corner-all" text="1"><span>1</span></li>
			            <li class="ui-state-default ui-corner-all" text="2"><span>2</span></li>
			            <li class="ui-state-default ui-corner-all" text="3"><span>3</span></li>   
			            <li class="ui-state-default ui-corner-all" text="4"><span>4</span></li>     
			            <li class="ui-state-default ui-corner-all" text="5"><span>5</span></li>   
			            <li class="ui-state-default ui-corner-all" text="6"><span>6</span></li>      
			            <li class="ui-state-default ui-corner-all" text="7"><span>7</span></li>   
			            <li class="ui-state-default ui-corner-all" text="8"><span>8</span></li>
			            <li class="ui-state-default ui-corner-all" text="9"><span>9</span></li>
			            <li class="ui-state-default ui-corner-all" text="0"><span>0</span></li>
			            <li class="ui-state-default ui-corner-all" text="."><span>.</span></li>
			         </ul>
	     		</div>
	     		<div region="center" fit="true" border="false">
		     		<ul class="ui-widget ui-helper-clearfix" id="icons" style="width:145px;margin-left: 5px;">
			            <li class="ui-state-default ui-corner-all" text="+"><span>+</span></li>
			            <li class="ui-state-default ui-corner-all" text="-"><span>-</span></li>
			            <li class="ui-state-default ui-corner-all" text="*"><span>*</span></li>   
			            <li class="ui-state-default ui-corner-all" text="/"><span>/</span></li>   
			            <li class="ui-state-default ui-corner-all" text="=="><span>==</span></li>   
			            <li class="ui-state-default ui-corner-all" text="!="><span>!=</span></li>
			            <li class="ui-state-default ui-corner-all" text="<"><span><</span></li>
			            <li class="ui-state-default ui-corner-all" text=">"><span>></span></li>      
			            <li class="ui-state-default ui-corner-all" text="<="><span><=</span></li>
			            <li class="ui-state-default ui-corner-all" text=">="><span>>=</span></li>   
			            <li class="ui-state-default ui-corner-all" text="("><span>(</span></li>
			            <li class="ui-state-default ui-corner-all" text=")"><span>)</span></li>
			            <li class="ui-state-default ui-corner-all" text='"'><span>"</span></li>
			            <!-- 
			            <li class="ui-state-default ui-corner-all" text="["><span>[</span></li>
			            <li class="ui-state-default ui-corner-all" text="]"><span>]</span></li>
			            <li class="ui-state-default ui-corner-all" text="'"><span>'</span></li>
			             -->
			         </ul>
	     		</div>
	     		<div region="east" fit="true" border="false" style="width:55px;height: 100%">
	     			<ul class="ui-widget ui-helper-clearfix" id="icons" style="width:45px;margin-left: 5px;">
			            <li class="ui-state-default ui-corner-all" text="&&"><span> AND </span></li>
			            <li class="ui-state-default ui-corner-all" text="||"><span> OR </span></li>
			            <li class="ui-state-default ui-corner-all" text="!"><span> NOT </span></li>   
			         </ul>
	     		</div>
	     	</div>
	      </div>
	</div>
</div>
