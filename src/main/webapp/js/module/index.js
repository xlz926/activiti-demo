
$(document).ready(function(){
	
	// === Sidebar navigation === //
	$('.submenu > a').click(function(e)
	{
		e.preventDefault();
		var submenu = $(this).siblings('ul');
		var li = $(this).parents('li');
		var submenus = $('#sidebar li.submenu ul');
		var submenus_parents = $('#sidebar li.submenu');
		if(li.hasClass('open'))
		{
			if(($(window).width() > 768) || ($(window).width() < 479)) {
				submenu.slideUp();
			} else {
				submenu.fadeOut(250);
			}
			li.removeClass('open');
		} else 
		{
			if(($(window).width() > 768) || ($(window).width() < 479)) {
				submenus.slideUp();			
				submenu.slideDown();
			} else {
				submenus.fadeOut(250);			
				submenu.fadeIn(250);
			}
			submenus_parents.removeClass('open');		
			li.addClass('open');	
		}
	});
	
	
	
	$('.submenu ul li a').click(function(e){
		e.preventDefault();
	    $("#container").load($(this).attr('href'));
	});
	
	
	var ul = $('#sidebar > ul');
	
	$('#sidebar > a').click(function(e)
	{
	/*	e.preventDefault();
		var sidebar = $('#sidebar');
		if(sidebar.hasClass('open'))
		{
			sidebar.removeClass('open');
			ul.slideUp(250);
		} else 
		{
			sidebar.addClass('open');
			ul.slideDown(250);
		}*/
	});
	
	// === Resize window related === //
	$(window).resize(function()
	{
		if($(window).width() > 479)
		{
			ul.css({'display':'block'});	
			$('#content-header .btn-group').css({width:'auto'});		
		}
		if($(window).width() < 479)
		{
			ul.css({'display':'none'});
			fix_position();
		}
		if($(window).width() > 768)
		{
			$('#user-nav > ul').css({width:'auto',margin:'0'});
            $('#content-header .btn-group').css({width:'auto'});
		}
	});
	
	if($(window).width() < 468)
	{
		ul.css({'display':'none'});
		fix_position();
	}
	if($(window).width() > 479)
	{
	   $('#content-header .btn-group').css({width:'auto'});
		ul.css({'display':'block'});
	}
	
	function fix_position()
	{
		var uwidth = $('#user-nav > ul').width();
		$('#user-nav > ul').css({width:uwidth,'margin-left':'-' + uwidth / 2 + 'px'});
        
        var cwidth = $('#content-header .btn-group').width();
        $('#content-header .btn-group').css({width:cwidth,'margin-left':'-' + uwidth / 2 + 'px'});
	}
	
	
	
	// === Style switcher === //
	$('#style-switcher i').click(function()
	{
		if($(this).hasClass('open'))
		{
			$(this).parent().animate({marginRight:'-=190'});
			$(this).removeClass('open');
		} else 
		{
			$(this).parent().animate({marginRight:'+=190'});
			$(this).addClass('open');
		}
		$(this).toggleClass('icon-arrow-left');
		$(this).toggleClass('icon-arrow-right');
	});
	
	$('#style-switcher a').click(function()
	{
		var style = $(this).attr('href').replace('#','');
		$('.skin-color').attr('href','style/css/unicorn.'+style+'.css');
		$(this).siblings('a').css({'border-color':'transparent'});
		$(this).css({'border-color':'#aaaaaa'});
	});
	
	
	
	

	
	

	
	$("#container").on("click","#search .advice",function(){
		var search = $(this).closest("#search");
		if(search.hasClass("dropup")){
		   $("#indexSearch").show().siblings("#indexNav").hide();
		   search.removeClass("dropup");
		}else{
			$("#indexSearch").hide().siblings("#indexNav").show();;
			 search.addClass("dropup");
		}
	});
	
	
	var buttonAction={};
	
	//定义首页model
	var indexModel = {
			nav:[{
				title:"待办事项",
				url:"engine/getToClaimList",
				icon:"icon-calendar",
				count:69
			},{
				title:"已办事项",
				url:"engine/getDoneList",
				icon:"icon-shopping-bag",
				count:89
			},{
				title:"待审事项",
				url:"engine/getToDoList",
				icon:"icon-calendar",
				count:69
			},{
				title:"关注",
				url:"",
				icon:"搁置",
				count:99
			}],
			selectedNav:1,
			dataList:[],
			pageIndex:0,
			pageSize:6,
			dataCount:0,
			viewMore:"+查看更多+"
	}
	
	

	
	$.link(true, "#content", indexModel);
	
	//审核
	buttonAction.complate=function(data){
		var that =this;
		$.get("forms/oaLeave/complateTask",{taskId:data.id},function(){
				if(indexModel.dataList.length>6){
					$.observable(indexModel.dataList).remove($.view(that).index, 1);
					$.observable(indexModel).setProperty("dataCount",indexModel.dataList.length);
				}else{
					$.get("engine/getToDoList",function(data){
				       $.observable(indexModel.nav[0]).setProperty("count",data.toDoCount);
		
					   $.observable(indexModel.nav[1]).setProperty("count",data.doneCount);
						
					   $.observable(indexModel).setProperty("dataList",data.dataList);
			        });
				}
		});
	}
	
	//签收
	buttonAction.claimTask=function(data){
		$.get("forms/oaLeave/claimTask",{taskId:data.id},function(){
			if(indexModel.dataList.length>6){
					$.observable(indexModel.dataList).remove($.view(that).index, 1);
					$.observable(indexModel).setProperty("dataCount",indexModel.dataList.length);
				}else{
					$.get("engine/getToClaimList",function(data){
				       $.observable(indexModel.nav[1]).setProperty("count",data.toDoCount);
					   $.observable(indexModel.nav[2]).setProperty("count",data.doneCount);
					   $.observable(indexModel).setProperty("dataList",data.dataList);
			        });
				}
			
		});
	};
	
	//查看更多
	buttonAction.viewMore=function(){
		
		$.get(indexModel.nav[indexModel.selectedNav].url,{pageSize:indexModel.pageSize,pageIndex:++indexModel.pageIndex},function(data){
			$.observable(indexModel).setProperty("dataList",indexModel.dataList.concat(data.dataList));
			$.observable(indexModel).setProperty("dataCount",indexModel.dataList.length);
		});
	}
	
	
	buttonAction.NavSelected =function(){
		$.observable(indexModel).setProperty("selectedNav",$.view(this).index);
		$.get(indexModel.nav[indexModel.selectedNav].url,{pageSize:indexModel.pageSize,pageIndex:indexModel.pageIndex},function(data){
			$.observable(indexModel.nav[0]).setProperty("count",data.toDoCount);
		
			$.observable(indexModel.nav[1]).setProperty("count",data.doneCount);
			
			$.observable(indexModel).setProperty("dataList",data.dataList);
			
			$.observable(indexModel).setProperty("dataCount",indexModel.dataList.length);
		});
		
		
		$("#dataPagenation").pagination({
			showPageList:false,
			pageSize:6,
			totals:indexModel.nav[indexModel.selectedNav].count,
			onSelectPage:function(index,size){
			indexModel.pageSize = size;
			indexModel.pageIndex = index;
			$.get(indexModel.nav[indexModel.selectedNav].url,{
				pageSize:indexModel.pageSize,
				pageIndex:indexModel.pageIndex
				},
				function(data){
					$.observable(indexModel.nav[0]).setProperty("count",data.toDoCount);
				
					$.observable(indexModel.nav[1]).setProperty("count",data.doneCount);
					
					$.observable(indexModel).setProperty("dataList",data.dataList);
					
					$.observable(indexModel).setProperty("dataCount",indexModel.dataList.length);
				});
		}});
	}
	 
	
	 $("#container").on("click",".action",function(event){
		 event.preventDefault();
		 var $this =$(this);
	   if($.isFunction(buttonAction[$this.attr("action")])){
		   buttonAction[$this.attr("action")].call($this[0],$.view(this).data);
	   }
	 });
	 
	 //切换列表的展示方式
	 $("#container").on("click",".widget-title .viewType",function(){
		var  box = $(this).closest(".widget-box").hide().siblings(".widget-box").show();
		 
	 });
	 
	 
	 
	 
	
	
});	






