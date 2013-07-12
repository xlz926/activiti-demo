

define(function(require, exports, module){


   require("module/common/jsviewHelper");
   require("module/index");


   $("form").livequery(function(){
	   $(this).ajaxForm();
   })
});