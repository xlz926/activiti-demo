(function($,window,undefined){
	
	$.widget("viewui.panel2",{
		options:{
			title:null,
            iconCls: null,
            width: 'auto',
            height: 'auto',
            headerCls: null,
            bodyCls: null,
            border: true,
            doSize: true, 
            href: null,
            loadingMessage: 'Loading...',
			buttons:[]
		},
	    _create:function(){
	        var that = this;
	    	this.element.data(this.widgetName,{panel:this._wrapPanel()});
	    	
	    	$.each(this.options.buttons||[],function(i,v){
		 		v && that.addButton(v);
		 	})	    	
	    },
		_wrapPanel:function(){
		 	var p =this.element.parent();
		 	var that =this ;
		 	var opts = this.options;
		 	var body =p.children().detach();

		 	var  panel = $('<div class="widget-box">'+
							'<div class="widget-title">'+
								'<span class="icon"><i></i></span>'+
							     '<h5></h5>'+
								'<div class="buttons"></div>'+
							'</div>'+
							'<div class="widget-content"></div>'+
						'</div>').appendTo(p);
		 	
		 	opts.headerCls?p.find('.widget-title .icon>i').addClass(opts.headerCls):p.find('.widget-title .icon ').remove();
		 	
		 	opts.bodyCls&&p.find('.widget-content').addClass(bodyCls);
		 	
		 	opts.title&&p.find('.widget-title h5').text(opts.title)
		 	
		 	p.find('.widget-content').append(body);
		 	
		 
		 	return panel;
		 	
		},
		addButton:function(option){
			var panel = this.element.data(this.widgetName).panel;
			var that = this;
			var btn =$('<a class="btn btn-mini" href="#"><i></i></a>').appendTo(panel.find('.buttons'));
			btn.text(option.name).prepend($('<i></i>').addClass(option.cls)).click(function(event){
				that._trigger(option.click,event,panel[0]);
			});
		}
	})
	
	
	
	
})(jQuery,window,undefined)