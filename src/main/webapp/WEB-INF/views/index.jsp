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
        
   <script src="${jsPath }/module/index.js"  ></script>   
</head>
<body>

  <div id="layoutDemo"  style="width:1200px;height:700px;">  

      <div region="north"  split="true" style="height:30px;"></div>  

      <div region="south"  split="true" style="height:40px;"></div>  


     <div region="west" split="true" title="左侧导航" style="width:150px;">
         
        <ul id="treeDemo" class="ztree"></ul>
     </div>  

    <div region="center"   split="true"  >
       <div id="navTab">
          <div title ="首页"></div>
       
       </div>

    </div>  

 </div> 
</body>
</html>
