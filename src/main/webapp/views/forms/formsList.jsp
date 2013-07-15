<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div id="breadcrumb">
	<a href="#" title="Go to Home" class="tip-bottom"><i
		class="icon-home"></i> 个人桌面</a> <a href="#" class="current">待办</a>
</div>
<div class="container-fluid" id="container">
	<div class="row-fluid">
		<div class="span12 center" style="text-align: center;">


			<ul class="quick-actions-horizontal">
				<li><a href="#"> <i class="icon-calendar"></i> <span>Manage
							Events</span>
				</a></li>
				<li><a href="#"> <i class="icon-shopping-bag"></i> <span>Manage
							Orders</span>
				</a></li>
				<li><a href="#"> <i class="icon-database"></i> <span>Manage
							DB</span>
				</a></li>
				<li><a href="#"> <i class="icon-people"></i> <span>Manage
							Users</span>
				</a></li>
				<li><a href="#"> <i class="icon-lock"></i> <span>Security</span>
				</a></li>
				<li><a href="#"> <i class="icon-piechart"></i> <span>Statistics</span>
				</a></li>
			</ul>
			<form class="form-search hide" id="indexSearch">
				<ul class="nav">
					<li class="span3"><label>单据编号</label> <input type="text" /></li>
					<li class="span3"><label>单据名称</label> <input type="text" /></li>

				</ul>
			</form>
		</div>
	</div>

	<div class="row-fluid">
		<div class="span12">
			<div class="widget-box">
				<div class="widget-title">
					<span class="icon"><i class="icon-file"></i></span>
					<h5>待办列表</h5>
					<div class="input-append dropup" id="search">
						<input class="span6" id="appendedInput" type="text">
						<button class="btn">
							<i class="icon-search"></i>搜索
						</button>
						<button class="btn advice">
							高级查询<b class="caret"></b>
						</button>
					</div>

				</div>
				<div class="widget-content nopadding">
					<ul class="recent-posts row-fluid">
						<li class="span6">
							<div class="user-thumb">
								<img width="40" height="40" alt="User"
									src="style/img/demo/av2.jpg" />
							</div>
							<div class="article-post">
								<span class="user-info"> 申请人:雄伟, 时间：2013-12-2 </span>
								<p>
									<a href="#">雄伟的费用报销单(EA-104-130708-0002)</a>
								</p>
								<a href="#" class="btn btn-primary btn-mini">编辑</a> <a href="#"
									class="btn btn-success btn-mini">审核</a> <a href="#"
									class="btn btn-danger btn-mini">关注</a>
							</div>
						</li>

						<li class="span6">
							<div class="user-thumb">
								<img width="40" height="40" alt="User"
									src="style/img/demo/av3.jpg" />
							</div>
							<div class="article-post">
								<span class="user-info">申请人:雄伟, 时间：2013-12-2 </span>
								<p>
									<a href="#">雄伟的费用报销单(EA-104-130708-0002)</a>
								</p>
								<a href="#" class="btn btn-primary btn-mini">编辑</a> <a href="#"
									class="btn btn-success btn-mini">审核</a> <a href="#"
									class="btn btn-danger btn-mini">关注</a>
							</div>
						</li>

						<li class="span6">
							<div class="user-thumb">
								<img width="40" height="40" alt="User"
									src="style/img/demo/av1.jpg" />
							</div>
							<div class="article-post">
								<span class="user-info"> By: michelle on 22 Jun 2012,
									02:44 PM, IP: 172.10.56.3 </span>
								<p>
									<a href="#">Vivamus sed auctor nibh congue, ligula vitae
										tempus pharetra...</a>
								</p>
								<a href="#" class="btn btn-primary btn-mini">编辑</a> <a href="#"
									class="btn btn-success btn-mini">审核</a> <a href="#"
									class="btn btn-danger btn-mini">关注</a>
							</div>
						</li>
						<li class="span6">
							<div class="user-thumb">
								<img width="40" height="40" alt="User"
									src="style/img/demo/av1.jpg" />
							</div>
							<div class="article-post">
								<span class="user-info"> By: michelle on 22 Jun 2012,
									02:44 PM, IP: 172.10.56.3 </span>
								<p>
									<a href="#">Vivamus sed auctor nibh congue, ligula vitae
										tempus pharetra...</a>
								</p>
								<a href="#" class="btn btn-primary btn-mini">编辑</a> <a href="#"
									class="btn btn-success btn-mini">审核</a> <a href="#"
									class="btn btn-danger btn-mini">关注</a>
							</div>
						</li>

						<li class="viewall" class="span6"><a title="View all posts"
							class="tip-top" href="#"> + View all + </a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</div>
