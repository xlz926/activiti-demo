<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   
 <!DOCTYPE html>
<html lang="en">
	<head>
	 <%@ include file="/resource/meta.jsp" %>
    <%@ include file="/resource/global.jsp" %>
	 <%@ include file="/resource/include-base-styles.jsp" %>
	 
	 <link href="${jsPath }/module/design/wui.toolbar.css" rel="stylesheet">

	   <%@ include file="/resource/include-plugin-js.jsp" %>

	 <link href="${jsPath }pousheng/themes/default/pousheng.css" rel="stylesheet">
    <script type="text/javascript" src="${jsPath }pousheng/pousheng.ui.js"> </script>
	   
	   
	   
      	<!--jquery 模板-->
<script type="text/javascript" src="${jsPath}/lib/jsview/jquery.observable.js"></script>
<script type="text/javascript" src="${jsPath}/lib/jsview/jquery.views.js"></script>
	   
    <!-- 开发平台地址 -->
<script src="${jsPath }/lib/seajs/sea.js"
        data-config="${jsPath }/lib/seajs/config.js"
        data-main="${jsPath }/module/design/main.js"></script> 

   <style>
 #properSetings .group>ul>li {width: 290px; display: block;
    float: left;
    height: 24px;
    margin: 0;
    padding: 6px 0;}
 #properSetings .group>ul>li>label{width: 70px; float: left;
    line-height: 24px;
    overflow: hidden;
    padding: 0;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80px;}
 #properSetings input:text{ float: left;}
   </style>
	
	<script type="text/javascript">
		function loginOut(){
			 pousheng.confirm("&nbsp;&nbsp;确定要注销吗?",function(r){
    	    	 if(r){
    	    		 window.parent.location.href="logout";
    	    	 }else{
    	    		 $(this).dialog("close");
    	    	 }
    	    });
		}
	</script>
	<title>流程模板设计</title>
	</head>
	<body>
			<div id="indexLayout" style="height: 100%;">
				<div region="north" border="false"
					style="height: 110px;">

              <div id="topPanel">
						<div class="logo-sets">
							<img alt="logo" src="themes/img/toplogo.png" id="logo">
						</div>
						<div class="topBanner">
					      <div class="exit">
								<i class="icon-off icon-white"></i> <a
									href="javascript:loginOut()" style="color: #FFFFFF">注销</a>
							</div>
							<div class="splitter"></div>
							<div class="exit">
								<i class="icon-qrcode icon-white"></i> <a href="${basePath }/index"
									style="color: #FFFFFF" target="_blank">返回首页</a>
							</div>
							<div class="splitter"></div>
							<div class="user-info">
								<i class="icon-user icon-white"></i> <font color="#FFFFFF">${username}</font>
							</div>
							<div class="splitter"></div>
							<div class="user-info">
								<c:choose>
									<c:when
										test="${not empty currentLoginType and currentLoginType eq '1'}">
										<i class="icon-pencil icon-white"></i>
										<a href="https://password.pousheng.com/"
											style="color: #FFFFFF" target="_blank">修改域密码</a>
									</c:when>
									<c:otherwise>
										<!-- 
								<a href="javascript:modifyPassWord();" style="color: #FFFFFF">修改密码</a>
								 -->
									</c:otherwise>
								</c:choose>
							</div>
							<!--
					<div class="splitter"></div>
					<div class="user-info">
						 
						<i class="icon-tag icon-white"></i>
						<a href="javascript:perfectInfo();" style="color: #FFFFFF">个人资料</a>
					</div>
					<div class="splitter"></div>
					-->
						</div>
					</div>
					

					<div id="application-toolbar" class="wui-toolbar">
						<ul>
							<li class="toolbarGroup">
								<ul>
									<li class="drag"></li>
									<li action="newFlow" class="toolbarItem " title="创建新流程">
									  <i class="new"></i><span class="name">新建</span></li>
									<li action="editFlow" class="toolbarItem " title="打开">
									  <i class="open" ></i>打开
									</li>
									<li action="saveFlow" class="toolbarItem save"title="保存">
										<i class="save "></i>保存
										</li>
									<li action="deployFlow" class="toolbarItem save"title="保存">
										<i class="save "></i>部署
										</li>
									<li action="import"  class="toolbarItem  "	title="导入">
										<i class="import "></i>导入
										</li>
									<li action="exports"  class="toolbarItem " title="导出">
											<i class="export"></i>导出
										</li>
									<!-- <li class="check toolbarItem" action="copyFlow" title="验证"><i class="check"></i>转存</li> -->
									<li class="check toolbarItem" action="validate" title="验证"><i class="check "></i>验证</li>
									<li class="copyFlow toolbarItem" action="copyFlow" title="拷贝"><i class="check "></i>拷贝</li>
									<li action="saveGroup" class="toolbarItem " title="">
									<i class="group  "></i>存库
									</li>
								</ul>
							</li>

							<li class="toolbarGroup">
								<ul>
									<li class="drag"></li>
									
									<li action="undo" class="toolbarItem" title="撤销（Ctrl+Z）">
									<i class="undo "></i>撤销
									</li>
									<li action="redo" class="toolbarItem" title="重做">
									<i class="redo "></i>恢复
									</li>
									<li action="cut" class="toolbarItem" title="剪切（Ctrl+X）">
									<i class="cut "></i>剪切
									</li>
									<li action="copy" class="toolbarItem" title="复制（Ctrl+C）">
									<i class="copy "></i>复制</li>
									<li action="paster" class="toolbarItem"
										title="粘贴（Ctrl+V）">
										<i class="paster "></i>粘贴</li>
									<li action="deletes" class="toolbarItem"
										title="删除（Delete）">
										<i class="delete "></i>删除</li>
									<!--  <li action="group" class="toolbarItem "
										title="合并成（Ctrl+G）"><i class="group "></i>合并</li>
									<li action="unGroup" class="toolbarItem " title="分解组">
									<i class="unGroup  "></i>分解
									</li>  -->
									
								</ul>
							</li>

							<li class="toolbarGroup">
								<ul>
									<li class="drag"></li>
									<li action="help" class="toolbarItem " title="帮助">
									
									<i class="help"></i>帮助</li>

								</ul>
							</li>
						</ul>
					</div>




				</div>
				<div region="east" id="properSetings"  closed="true"
				 split="true" title="属性设置"
					style="width: 320px;"></div>
			<div id="palette"  region="west" style="width: 190px;">
             <div data-tabs>
				<div id="myPalette" title="基本活动">
				</div>

				   <div id="myPaletteGroup"  title="组合活动">
				   </div>	
				</div>
			</div>
				<div region="center">
					<div id="flowTabs"></div>
				</div>
				<div  region="south" style="height:30px;">
				<div id="footer">POUSHENG All Rights Reserved.[ Version 2.17 ]</div>
				</div>
			</div>

	


		<div style="width: 400px" class="hide">
			<div id="helper" data-tabs>
				<div title="表达式操作">
					<table class="table">
						<thead>
							<tr>
								<th>操作符名称</th>
								<th>操作符</th>
								<th>例子</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>大于</td>
								<td>&gt;</td>
								<td>
									<%
										out.print("${approve>0}");
									%>
								</td>
							</tr>
							<tr>

								<td>小于</td>
								<td>&gt;</td>
								<td>
									<%
										out.print("${approve>0}");
									%>
								</td>
							</tr>
							<tr>
								<td>等于</td>
								<td>&gt;</td>
								<td>
									<%
										out.print("${approve>0}");
									%>
								</td>
							</tr>
						</tbody>

					</table>

				</div>
			</div>

		</div>


	
</body>
</html>
<c:import url="template.jsp"></c:import>
