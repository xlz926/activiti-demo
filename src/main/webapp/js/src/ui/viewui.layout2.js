(function ($) {
    $.widget("ui.layout", {
        options: {
        	fit:false,
        	borderW:28
    },
    _create: function () {
        this.element.data(this.widgetName,this._inits());
        this._bindEvents();
        this._setSize();
    },
    
    _inits:function(){
    	var that = this;
    	    
    	that.element.data(this.widgetName,{panels:{}});
    	that.element.find(">div[region]").each(function(i){
    		var $this = $(this),
    		     expendPanel ={
    			     north:'expendNorth',
    			     south:'expendSouth',
    			     east:'expendEast',
    			     west:'expendWest',
    			}
    	    that._createPanel($this.attr('region'));
    		expendPanel[$this.attr('region')]&&that._createExpandPanel($this.attr('region'));
    	});
    },
    _setSize:function(){
    	
        var cpos = {
            top: 0,
            left: 0,
            width: this.element.innerWidth(),
            height: this.element.innerHeight()
        },
        opts= this.options,
        panels = this.element.data(this.widgetName).panels;
        
        if(panels.north){
        	if(panels.north.panel('option', 'closed')){
        		cpos.top += opts.borderW;
                cpos.height -= opts.borderW;
              
        	}else{
        		 panels.north.panel('resize', {
	                width: cpos.innerWidth(),
	                height:  panels.north.panel('option','height'),
	                left: 0,
	                top: 0
	            });
	        	 
	        	cpos.top +=  panels.north.panel('option', 'height');
	            cpos.height -=  panels.north.panel('option', 'height');
        	    panels.expandNorth.detach();
        	}
        }
        
        
        if(panels.south){
        	if(panels.south.panel('option', 'closed')){
                cpos.height -= opts.borderW;
              
        	}else{
        		 panels.north.panel('resize', {
	                width: cpos.innerWidth(),
	                height: pp.panel('option','height'),
	                left: 0,
	                top: 0
	            });
	            cpos.height -= panels.south.panel('option', 'height');
        	    panels.expandSouth.detach();
        	}
        }
        
        
    	 if(panels.south){
        	if(panels.south.panel('option', 'closed')){
                cpos.height -= opts.borderW;
              
        	}else{
        		 panels.north.panel('resize', {
	                width: cpos.innerWidth(),
	                height: pp.panel('option','height'),
	                left: 0,
	                top: 0
	            });
	            cpos.height -= panels.south.panel('option', 'height');
        	    panels.expandSouth.detach();
        	}
        }
    	        
    	if(panels.south){
        	if(panels.south.panel('option', 'closed')){
                cpos.height -= opts.borderW;
              
        	}else{
        		 panels.north.panel('resize', {
	                width: cpos.innerWidth(),
	                height: pp.panel('option','height'),
	                left: 0,
	                top: 0
	            });
	            cpos.height -= panels.south.panel('option', 'height');
        	    panels.expandSouth.detach();
        	}
        }
        
        
        
    	
    	
    },
    _createPanel:function(dir){
    	var that =this,
    	   panels =that.element.data(this.widgetName).panels,
    	   region={
    			north:'layout-button-up',
    			south:'layout-button-down',
    			east:'layout-button-right',
    			west:'layout-button-left'
    			},
    		handles ={
    			north:'s',
    			south: 'n',
    			east:'w',
    			west:'e'
    	        },
            cls = 'layout-panel layout-panel-' + dir,
            pp=this.element.find('>div[region=' + dir + ']').addClass('layout-body');
    	
    	
    	    pp.attr('split') == 'true' &&(cls += ' layout-split-' + dir);
    	    
    	    pp.panel({
                cls: cls,
                doSize: false,
                border: (pp.attr('border') == 'false' ? false : true),
                tools: [{
                    iconCls: region[dir]
                }]
            });
    	    
    	     if (pp.attr('split') == 'true') {
    	    	 
    	    	  var panel = pp.panel('panel');
    	    	  
    	    	 panel.resizable({
                    handles: handles[dir],
                    helper: "resizable-helper",
                    stop: function (event, ui) {
                        var opts = pp.panel('option');
                        opts.width = ui.helper.outerWidth();
                        opts.height = ui.helper.outerHeight();
                        pp.panel('resize', opts);
                        that._setSize();

                    }
                });

    	     }
    	     panels[dir]=pp;
    },
    _createExpandPanel:function(dir){
    	var icon={
    			expandEast:'layout-button-left',	
    			expandWest:'layout-button-right',
    			expandNorth:'layout-button-down',
    			expandSouth:'layout-button-up'
    	     },
    	     panels = that.element.data(this.widgetName).panels,
    	     expandPanel = $('<div></div>').panel({
                cls: 'layout-expand',
                title: '&nbsp;',
                closed: true,
                doSize: false,
                tools: [{ iconCls: icon[dir]}]
            });
    	panels[dir]=expandPanel;
    },
    _bindEvents:function(){
    	var that = this;
    	    panels = that.element.data(this.widgetName).panels;
    	
    	
    	this.element.on('click','.layout-panel .layout-button-up',function(){
    		panels.north?panels.north.panel('close'):that._createPanel('north');
    		that._setSize();
    		
    	});
    	this.element.on('click','.layout-panel .layout-button-down',function(){
    		panels.south?panels.south.panel('close'):that._createPanel('south');
    		
    	});
    	this.element.on('click','.layout-panel .layout-button-right',function(){
    		panels.east?panels.east.panel('close'):that._createPanel('east');
    		that._setSize();
    		
    	});
    	this.element.on('click','.layout-panel .layout-button-left',function(){
    		panels.west?panels.west.panel('close'):that._createPanel('west');
    		that._setSize();
    		
    	});
    	this.element.on('click','.layout-expand .layout-button-left',function(){
    		panels.expandEast?panels.expandEast.panel('close'):that._createPanel('expandEast');
    		panels.east.panel('open');
    		that._setSize();
    	});
    	this.element.on('click','.layout-expand .layout-button-right',function(){
    		panels.expandWest?panels.expandWest.panel('close'):that._createPanel('expandWest');
    		panels.west.panel('open');
    		that._setSize();
    	});
    	this.element.on('click','.layout-expand .layout-button-down',function(){
    		panels.expandNorth?panels.expandNorth.panel('close'):that._createPanel('expandNorth');
    		panels.north.panel('open');
    		that._setSize();
    	});
    	this.element.on('click','.layout-expand .layout-button-up',function(){
    		panels.expandSouth?panels.expandSouth.panel('close'):that._createPanel('expandSouth');
    		panels.south.panel('open');
    		that._setSize();
    	});
    	
    }
    
    
  
});

} (jQuery));