<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>框架demo</title>


    <%@ include file="/common/meta.jsp" %>
    <%@ include file="/common/global.jsp" %>
    
 <link href="${basePath }/style/css/bootstrap-cerulean.css" rel="stylesheet" media="screen">
 <link href="${basePath }/style/css/charisma-app.css" rel="stylesheet" media="screen">
</head>
<body>

<div class="container-fluid">
		<div class="row-fluid">
		
			<div class="row-fluid">
				<div class="span12 center login-header">
					<h2>Welcome to BPMS Demo</h2>
				</div><!--/span-->
			</div><!--/row-->
			
			<div class="row-fluid">
				<div class="well span5 center login-box">
					<div class="alert alert-info">
						Please login with your Username and Password.
					</div>
					<form method="post" action="login" class="form-horizontal">
						<fieldset>
							<div data-rel="tooltip" class="input-prepend" data-original-title="Username">
								<span class="add-on"><i class="icon-user"></i></span><input type="text" value="admin" id="username" name="username" class="input-large span10" autofocus="">
							</div>
							<div class="clearfix"></div>

							<div data-rel="tooltip" class="input-prepend" data-original-title="Password">
								<span class="add-on"><i class="icon-lock"></i></span><input type="password" value="admin123456" id="password" name="password" class="input-large span10">
							</div>
							<div class="clearfix"></div>

							<p class="center span5">
							<button class="btn btn-primary" type="submit">Login</button>
							</p>
						</fieldset>
					</form>
				</div><!--/span-->
			</div><!--/row-->
				</div><!--/fluid-row-->
	</div>
</body>
</html>
