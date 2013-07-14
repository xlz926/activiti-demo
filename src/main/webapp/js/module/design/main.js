/*!
 * BPMS 业务流程管理系统
 * @VERSION
 * 创建人 liezun.xiao
 * 创建时间 2013-5-22
 *
 * Depends:
 *	jquery.js
 */
define(function(require, exports, module) {
		
	window.pousheng =window.viewui;
	
	
	      //注册全局方法
      pousheng.addMethod("getI18N",function(code){
    	  var result ={};
    	  pousheng.ajaxData("common/getI18N?prefix="+code,{async:false},function(data){
    		  $.map(data||{},function(v,i){
    			 list2json(v,i.replace(code+".",""),result)
    		  }); 
    	  });
    	  function list2json(val,key,slt){
    		    var k = key.split(".");
    			 if(k.length==1){
    			   slt[k[0]]=val;
    			 }else{
    				slt[k[0]]=slt[k[0]] ||{};
    				list2json(val,key.replace(k[0]+".",""),slt[k[0]]);
    			 }
    		 }
           return result;
      });
	
	
	
   // require('module/design/workflow.init');

	


	$("#content").layout();
	

      
      
      
      
      $(function(){
	
	  $.boxModel=true;
	
	  
	  
      window.pousheng = window.viewui;
      
      $("#indexLayout").layout();
      
	
	  $("[data-layout]").livequery(function () {
            $(this).layout();
      }); 


      $("div[data-tabs]").livequery(function () {
          $(this).tabs();
      });

      $("#palette").panel({ draggable: true});
      
      
   $("[data-accordion]").livequery(function () {
          $(this).accordion({
              header: "h3",
              heightStyle: "fill"
          });
      }); 
      
   
   $("#properSetings [data-buttonset]").livequery(function () {
	   var that =this;
	   var app = $.view(this).data
	   setAttr(app.activiti_field.activiti_expression);
	   $(this).buttonset().find("input:radio").change(function(){
		  setAttr($(this).val()); 
		  $.observable(app).setProperty( "activiti_field.activiti_expression", $(this).val() );
	   });
       function setAttr(v){
    	   $(that).find("input:radio").removeAttr("checked");
    	  $(that).find("input[value='"+v+"']").attr("checked","checked");
       }
   });
   
   //设置默认条件
 
   
   
   
   

    $("div[data-datagrid]").livequery(function () {
          var target = $(this).datagrid(pousheng.jsonEval($(this).attr("data-datagrid")));

          target.datagrid("register","search",function(){
        	    $.extend(this.opts.queryParams, this.opts.search.getFieldValues() || {});
                this.refresh(null,this.opts.queryParams);
          });
          
     });
      
		
	   $("[data-spinner]").livequery(function(){ 
			 $(this).spinner({
				  min: 0,    
				  max: 12,    
                  step: 1,     
                  start: 1,
			 });
		}); 

	   //过期时间
	   $(".timeDuration").livequery(function(){
		    var  $this = $(this),
		         app = $.view(this).data;
		     
		  var initValue =  $this.find("input:text").hide();
		    
		   $('<input  id="spinner" style="width:40px;height:12px;" name="value"/>').val(initValue.val().match(/^\d*/)[0]).appendTo($this).spinner({
		    	change:function(event,ui){
		    		  var result =app.activiti_field.activiti_expression.replace(/^\d*/,$(this).val());
		            $.observable(app).setProperty( "activiti_field.activiti_expression",result );
		    	}
		    });
		   
		     var uint ='<div class="btn-group"> <a class="btn dropdown-toggle unit" data-toggle="dropdown" href="#">'
		                +'<span class="date">天</span> <span class="caret"></span>'
		                + '</a> <ul class="dropdown-menu"></ul> </div>';
		   var data = [{value:"_Minute",name:"分钟"},
		               {value:"_Hour",name:"小时"},
		               {value:"_Day",name:"天"},
		               {value:"_Week",name:"周"},
		               {value:"_Month",name:"月"}]
		    $(uint).appendTo($this).find(".dropdown-menu").append($.templates('<li unit="{{:value}}"><a>{{:name}}</a></li>').render(data))
		                                                  .find(">li").click(function(){
		                                                	  $this.find(".unit .date").text($(this).find("a").html())
		                                                	  var result =app.activiti_field.activiti_expression.replace(/_\w*/,$(this).attr("unit"));
		                                                	$.observable(app).setProperty( "activiti_field.activiti_expression",result );
		                                                  });
		      $this.find(".unit").dropdown().find(".date").text($this.find(".dropdown-menu>li[unit='"+initValue.val().match(/_\w*/)[0]+"']").find("a").text());                           
	   });
	   
	   
		
	   $("[data-dropdown]").livequery(function(){ 
			$(this).dropdown();
		}); 
	
	  
       $("#runType").livequery(function(){ 
		    var that= this;
		    var p = $(that).closest("ul");
		    $(that).change(function(data){
		    	setAttr($(that).val());
		     $.observable($.view(that).data).setProperty( "activiti_field.activiti_expression", $(that).val() );
		    });
		    
		     $(that).val($.view(that).data.activiti_field.activiti_expression).trigger("change");
		    function setAttr(v){
		    		switch(v){
		    			case "0" :
		    				p.find("li.orgLoop").show().end().find("li.groupLoop,li.usersLoop").hide(); 
		    				break;
		    			case "1" :
		    				p.find("li.groupLoop").show().end().find("li.orgLoop,li.usersLoop").hide();
		    				break;
		    			case "2" : 
		    				p.find("li.usersLoop").show().end().find("li.orgLoop,li.groupLoop").hide();
		    				break;
		    		}
		    }
		
		});  
       
       
       $("#sqlService").livequery(function(){
    	   var $this= $(this);
    	   $this.find(".runType").change(function(e,v){
    		   if($(this).val()==0){
    			   $this.find(".runType_show").show().end().find(".runType_hide").hide();
    		   }else{
    			   $this.find(".runType_hide").show().end().find(".runType_show").hide();
    		   }
    	   });
    	   
    	    $this.find(".sqlType").change(function(e,v){
    		   if($(this).val()==1){
    			   $this.find(".sqlType_show").show();
    		   }else{
    			   $this.find(".sqlType_show").hide();
    		   }
    	   });
    	    
    	     $this.find(".runType").trigger("change");
    	    $this.find(".sqlType").trigger("change");
       });
	    $(window).bind("resize",function(){
    	    $("body>div").triggerHandler( "_resize");
       });
	    
          
});
      
      
      
      	
	seajs.use("jQuery.validate",function(){
		
		$.metadata.setType("attr", "validate");
		  
		$.validator.setDefaults({
		        wrapper: "div",
		        errorElement: "span",
		        errorClass: "va_sp_txt",
		        ignore: ":hidden,.readonly",
		        onfocusin:$.noop,
		        onkeyup:$.noop,
		        errorPlacement: function(error, element){
		            var pos = element.position();
		            actualWidth = element[0].offsetWidth, actualHeight = element[0].offsetHeight;
		            error.prepend('<span class="va_tips_warn"></span>').append('<span class="arr"></span><a class="tips_close"></a>').css({
		                top: pos.top - 30,
		                left: pos.left
		            }).addClass("validatebox").appendTo(element.parent());
		           error.find(".tips_close").click(function(){
		        	  error.hide();
		           });
		        }
		    });
	});
      
      

	
});