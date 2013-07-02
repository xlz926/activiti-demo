
define(function(require, exports, module){

	 
	
		var zNodes =[
			{ id:1, pId:0, name:"表单管理", t:"我很普通，随便点我吧", open:true},
			{ id:11, pId:1, name:"请假流程", t:"我很普通，随便点我吧"},
			{ id:12, pId:1, name:"请假流程 - 2", t:"我很普通，随便点我吧"},
			{ id:13, pId:1, name:"请假流程 - 3", t:"我很普通，随便点我吧"},
			{ id:2, pId:0, name:"流程管理", t:"点我可以，但是不能点我的子节点，有本事点一个你试试看？", open:true},
			{ id:21, pId:2, name:"流程管理 - 1", t:"你哪个单位的？敢随便点我？小心点儿..", click:false},
			{ id:22, pId:2, name:"流程管理 - 2", t:"我有老爸罩着呢，点击我的小心点儿..", click:false},
			{ id:23, pId:2, name:"流程管理 - 3", t:"好歹我也是个领导，别普通群众就来点击我..", click:false},
			{ id:3, pId:0, name:"组织架构", t:"别点我，我好害怕...我的子节点随便点吧...", open:true, click:false },
			{ id:31, pId:3, name:"组织架构 - 1", t:"唉，随便点我吧"},
			{ id:32, pId:3, name:"组织架构 - 2", t:"唉，随便点我吧"},
			{ id:33, pId:3, name:"组织架构 - 3", t:"唉，随便点我吧"}
		];
	
	
		var setting = {
			data: {
				key: {
					title:"t"
				},
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: onClick
			}
		};
	
	    function onClick(){
	    	
	    	
	    	
	    }
	
	
	
	
$(function(){
	
	$("#layoutDemo").layout();
	
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	
	$("#navTab").navTab();
	
});	

	
	
	
	
});