<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   
 <!DOCTYPE html>
<html lang="en" style="height:100%;width:100%;">
	<head>
	 <%@ include file="/common/meta.jsp" %>
    <%@ include file="/common/global.jsp" %>
	 <%@ include file="/common/include-base-styles.jsp" %>
	 
	 <link href="${jsPath }/module/design/wui.toolbar.css" rel="stylesheet">
	 
	 <link href="${jsPath }/src/themes/default/pousheng.css" rel="stylesheet">
	 
	   <%@ include file="/common/include-plugin-js.jsp" %>

  <%@ include file="/common/include-pousheng-js.jsp" %>

    <!-- 开发平台地址 -->
<script src="${jsPath }/lib/seajs/sea.js"
        data-config="${jsPath }/lib/seajs/config.js"
        data-main="${jsPath }/module/design/main.js"></script> 

	<title>流程模板设计</title>
	</head>
	<body style="height:100%;width:100%;">
	
	 <div id="content"  style="height:100%;width:100%;">
	 <div region="north" style="height:55px;">
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
	 
	 <div region="east" style="width:150px;"></div>
	 <div region="west" style="width:150px;"></div>
	 <div region="center" style="width:150px;"></div>
	 
	 
	 
	 
	 </div>
		

</body>
</html>
<%-- <c:import url="template.jsp"></c:import> --%>
