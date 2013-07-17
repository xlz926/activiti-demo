<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>框架demo</title>




    <%@ include file="/common/meta.jsp" %>
    <%@ include file="/common/global.jsp" %>
    <%@ include file="/common/include-base-styles.jsp" %>
    <%@ include file="/common/include-plugin-js.jsp" %>
    <%@ include file="/common/include-pousheng-js.jsp" %>
 
 
 
 
    
 <link href="${basePath }/style/css/unicorn.main.css" rel="stylesheet" media="screen">
 <link href="${basePath }/style/css/unicorn.white.css" rel="stylesheet"  class="skin-color" media="screen">
 <link href="${basePath }/style/css/unicorn.form.css" rel="stylesheet"  class="skin-color" media="screen">
 
 <link href="${basePath }/style/css/font-awesome.css" rel="stylesheet"  class="skin-color" media="screen">
 <link href="${basePath }/style/css/stilearn-helper.css" rel="stylesheet"  class="skin-color" media="screen">
     <!-- 开发平台地址 -->
<script src="${jsPath }/lib/seajs/sea.js"
        data-config="${jsPath }/lib/seajs/config.js"
        data-main="${jsPath }/module/common/main.js"></script> 
        
        
          

</head>
<body>
	<div id="header">
			<h1><a href="./dashboard.html">ACTIVITI  BPMS　　DEMO</a></h1>		
		</div>
		<div id="user-nav" class="navbar navbar-inverse">
            <ul class="nav btn-group">
                <li class="btn btn-inverse"><a title="" href="#"><i class="icon icon-user"></i> <span class="text">肖列尊</span></a></li>
                <li class="btn btn-inverse dropdown" id="menu-messages"><a href="#" data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"><i class="icon icon-envelope"></i> <span class="text">新消息</span> <span class="label label-important">5</span> <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a class="sAdd" title="" href="#">新消息</a></li>
                        <li><a class="sInbox" title="" href="#">inbox</a></li>
                        <li><a class="sOutbox" title="" href="#">outbox</a></li>
                        <li><a class="sTrash" title="" href="#">trash</a></li>
                    </ul>
                </li>
                <li class="btn btn-inverse"><a title="" href="#"><i class="icon icon-cog"></i> <span class="text">设置</span></a></li>
                <li class="btn btn-inverse"><a title="" href="login.html"><i class="icon icon-share-alt"></i> <span class="text">注销</span></a></li>
            </ul>
        </div>
            
		<div id="sidebar">
			<a href="#" class="visible-phone"><i class="icon icon-home"></i> 个人面板</a>
			<ul>
				<li class="active"><a href="index.html"><i class="icon icon-home"></i> <span>个人桌面</span></a></li>
				<li class="submenu">
					<a href="#"><i class="icon icon-th-list"></i> <span>财务类</span> <span class="label">3</span></a>
					<ul>
						<li><a href="forms/oaLeave/addForm"> 请假申请</a></li>
						<li><a href="engine/addTemplate">流程部署</a></li>
						<li><a href="forms/getFormsList">流程列表</a></li>
					</ul>
				</li>
				<li><a href="design/index"><i class="icon icon-tint"></i> <span>流程建模</span></a></li>
				<li><a href="interface.html"><i class="icon icon-pencil"></i> <span>数据库类</span></a></li>
				<li><a href="tables.html"><i class="icon icon-th"></i> <span>流程管理</span></a></li>
				<li><a href="grid.html"><i class="icon icon-th-list"></i> <span>流程管理</span></a></li>
				<li class="submenu">
					<a href="#"><i class="icon icon-file"></i> <span>流程管理</span> <span class="label">4</span></a>
					<ul>
						<li><a href="invoice.html">流程关联</a></li>
						<li><a href="chat.html">人员统计</a></li>
						<li><a href="calendar.html">人员统计</a></li>
						<li><a href="gallery.html">人员统计</a></li>
					</ul>
				</li>
				<li>
					<a href="charts.html"><i class="icon icon-signal"></i> <span>报表统计</span></a>
				</li>
				<li>
					<a href="widgets.html"><i class="icon icon-inbox"></i> <span>报表统计</span></a>
				</li>
			</ul>
		
		</div>
		
		<div id="style-switcher">
			<i class="icon-arrow-left icon-white"></i>
			<span>Style:</span>
			<a href="#grey" style="background-color: #555555;border-color: #aaaaaa;"></a>
			<a href="#blue" style="background-color: #2D2F57;"></a>
			<a href="#red" style="background-color: #673232;"></a>
			<a href="#white" style="background-color: #CCCCC;"></a>
		</div>
		
		<div id="content">
		
			<div id="breadcrumb">
				<a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> 个人桌面</a>
				<a href="#" class="current" data-link="nav[selectedNav].title"></a>
			</div>
			<div class="container-fluid" id="container">
				<div class="row-fluid" >
					<div class="span12 center" style="text-align: center;">						
	            <ul class="quick-actions-horizontal" data-link="{for nav tmpl='#NavTemplate' }">
							
				</ul>
			
					</div>	
				</div>
			
				<div class="row-fluid">
					<div class="span12">
						<div class="widget-box">
							<div class="widget-title"><span class="icon"><i class="icon-file"></i></span><h5 data-link="dataCount">排序</h5>
		</div>
							<div class="widget-content nopadding">
								<ul class="recent-posts row-fluid" data-link="{for dataList tmpl='#viewListTemplate'}" >				
								</ul>
							</div>
							<div class="widget-footer">
							<a href="" action="viewMore" class="tip-top action" data-original-title="View all posts" data-link="viewMore">  </a>
							</div>
						</div>
					</div>
				</div>
			
			</div>
		</div>
        <div class="row-fluid">
					<div id="footer" class="span12">
						2012 &copy; Unicorn Admin. Brought to you by <a href="https://wrapbootstrap.com/user/diablo9983">diablo9983</a>
					</div>
		</div>
</body>
</html>

<script type="text/javascript">
<!--
$(function(){
	$("#testPanel").panel2({
		title:"数据列表",
		headerCls:"icon-th-list",
		buttons:[{cls:"icon-refresh",name:'刷新',click:function(){
			
		}}]
	});
	
});
//-->
</script>

<script id="NavTemplate" type="text/x-jsrender">
        <li>
			<a href="{{:url}}" class="action" action="NavSelected">
				<i class="{{:icon}}"></i><span>{{:title}}</span><span data-link="count"></span>
			</a>
		</li>
</script>

<script id="viewListTemplate" type="text/x-jsrender">
	   <li class="span6">
						<div class="user-thumb">
											<img width="40" height="40" alt="User" src="style/img/demo/av1.jpg" />
										</div>
										<div class="article-post">
											<span class="user-info"> By: {{: ~formatDate(createTime,'yyyy-MM-dd')}} </span>
											<p>
												<a href="#">{{:name}}</a>
											</p>
					 <a href="#" class="btn btn-primary btn-mini action" action="complate">审核</a> <a href="#" class="btn btn-success btn-mini">审核</a> <a href="#" class="btn btn-danger btn-mini">关注</a>
				</div>
			</li>
</script>
