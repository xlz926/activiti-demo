;(function($,window,undefined){
	$.views.helpers({
		formatDate : function(value, fmt) {
			if(!value||value=="")return "";
			var date = new Date(value);
			return fmt ? date.format(fmt) : date.format("yyyy-MM-dd hh:mm:ss");
		},
		stringStartSub:function(start, value){
    		value = value.substring(start, value.length);
			return value;
    	},
		stringSub:function(start, end, value){
    		value = value.substring(start, end, value.length);
			return value;
    	}
	});	
	
})(jQuery,window,undefined);