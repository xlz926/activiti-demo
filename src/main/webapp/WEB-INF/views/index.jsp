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
 
     <!-- 开发平台地址 -->
<script src="${jsPath }/lib/seajs/sea.js"
        data-config="${jsPath }/lib/seajs/config.js"
        data-main="${jsPath }/module/common/main.js"></script> 
</head>
<body>

  <div id="layoutDemo"  style="width:600px;height:400px;">  

      <div region="north" title="North Title" split="true" style="height:100px;"></div>  

      <div region="south" title="South Title" split="true" style="height:100px;"></div>  

     <div region="east" iconCls="icon-reload" title="East" split="true" style="width:100px;"></div>  

     <div region="west" split="true" title="West" style="width:100px;"></div>  

    <div region="center" title="center title"  split="true"  >
                当前序号：${testI} 
    
    </div>  

 </div> 
</body>
</html>

<script>
    $(function () {
      var a =8 ;
      
      setInterval(function(){
    	  console.log(a);
    	  a=99;
    	  console.log(a);
      },1);
        a=888
    })

</script>