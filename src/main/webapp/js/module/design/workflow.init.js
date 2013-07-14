define(function(require, exports, module) {
	
	  var Workflow =  require('module/design/workflow.tools');
	  
	  var  node  = require('module/design/workflow.node');
	  var workflow =new Workflow();

	
	
	/* 工具条模块功能 */
	var toolbar = new Object();
	var flowTabs = $("#flowTabs").tabs();
	// 选择模板编辑

	toolbar.form = $("<form method='post'></from>").hide().appendTo("body");
	toolbar.getDiagram = function() {
		if ($(".diagram:visible").length > 0) {
			return $(".diagram:visible").first();
		} else {
			pousheng.errorMsg("还没创建图形");
			return false;
		}
	}

	// 创建新流程
	toolbar.newFlow = function() {
		var contents = $("<div title='流程信息'></div>");
		contents.append("<p><label class='red'>流程编号:</label><input type='text'  class='flowId'/></p>");
		contents.append("<p><label class='red'>流程名称:</label><input type='text'  class='flowName'/></p>");
		contents.modal({
			title : "新建流程模板",
			width : 260,
			height : 240,
			buttons : [ {
				text : "确定",
				click : function() {
					if ($(this).find(".flowName").val() != "" && $(this).find(".flowId").val() != "") {
						var diagramId = pousheng.getNextId("diagram_");
						var diagramDiv = $("<div  class='diagram'/>").attr("id", diagramId);
						var process;
						flowTabs.tabs("addTab", {
							title : $(this).find(".flowName").val(),
							content : diagramDiv
						});
						diagram = workflow.createDiagram(diagramId);
						process = node.nodeCreate("process");
						process.name = $(this).find(".flowName").val();
						process.id = $(this).find(".flowId").val();
						diagramDiv.data("process", process);
						toolbar.loadModel(false, process, diagram, diagramDiv);
						$(this).modal("close");
						$("#application-toolbar").find("i.disabled").removeClass("disabled");

					} else {
						$(this).find(".flowName").val()=="" && pousheng.errorMsg("流程名称不能为空");
						$(this).find(".flowId").val() =="" && pousheng.errorMsg("流程编号不能为空");
					}

				},
				cls : "btn-primary"
			}, {
				text : btn.cancel,
				click : function() {
					$(this).modal("close");
				}
			} ]
		});

	};
	// 编辑流程
	toolbar.editFlow = function() {
		function selectFlow(data, modelInfo) {
			var diagram,
			diagramId , 
			diagramDiv;
			
			if (flowTabs.tabs("exists", modelInfo.name)) {
				$("<div>存在相同名称流程模板，是否保存模板并打开新的流程模板</div>").modal({
					width:300,
					height:150,
					title:"同名流程模板提示",
					newwinBtn:false,
					resizable:false,
					buttons:[{text:"保存并打开",click:function(){
						toolbar.saveFlow(flowTabs.tabs("getTab",modelInfo.name).id);
                         modelInfo.metaInfo = pousheng.jsonEval(modelInfo.metaInfo);
				         modelInfo.metaInfo.id = modelInfo.key;
				        modelInfo.metaInfo.version = modelInfo.version;
				        diagramDiv = $("#"+flowTabs.tabs("getTab",modelInfo.name).id).find(".diagram");    
						toolbar.loadModel(data, modelInfo.metaInfo, diagramDiv.data("diagram"), diagramDiv);
						$(this).modal("close");
					},cls:"btn-primary"},{text:"不保存只打开",click:function(){
						modelInfo.metaInfo = pousheng.jsonEval(modelInfo.metaInfo);
				        modelInfo.metaInfo.id = modelInfo.key;
				        modelInfo.metaInfo.version = modelInfo.version;
				        diagramDiv = $("#"+flowTabs.tabs("getTab",modelInfo.name).id).find(".diagram");    
						toolbar.loadModel(data, modelInfo.metaInfo, diagramDiv.data("diagram"), diagramDiv);
				         flowTabs.tabs("selectTab", modelInfo.name);
				         $(this).modal("close");
					}},{text:btn.cancel,click:function(){
						$(this).modal("close");
					}}]
				});
				
			} else {
			   diagramId = pousheng.getNextId("diagram_");
               	diagramDiv = $("<div  class='diagram'/>").attr("id", diagramId);
				flowTabs.tabs("addTab", {
					title : modelInfo.name,
					content : diagramDiv
				});
				modelInfo.metaInfo = pousheng.jsonEval(modelInfo.metaInfo);
				modelInfo.metaInfo.id = modelInfo.key;
				modelInfo.metaInfo.version = modelInfo.version;
				diagram = workflow.createDiagram(diagramId);
				toolbar.loadModel(data, modelInfo.metaInfo, diagram, diagramDiv);
			}
			$("#application-toolbar").find("i.disabled").removeClass("disabled");

		}

		$.modal({
			width:950,
			remote : "design/list",
			ready : function(event, context) {
				var target = $(context).find("#modelListGrid").datagrid({
					url : "design/getDataList",
					onDblClickRow : function(index, result) {
						$.post("design/getModelData", {
							id : result.id
						}, function(data) {
							selectFlow(data, result);
							$(context).modal("close");
						});
					}
				});
				target.datagrid("register", "search", function(element) {
					$.extend(this.opts.queryParams, this.opts.search.getFieldValues() || {});
					this.refresh(null, this.opts.queryParams);
				})
			},
			"buttons" : [ {
				text : "确定",
				click : function() {
					var modelInfo = $("#modelListGrid", this.dialog).datagrid("getSelect");

					$.post("design/getModelData", {
						id : modelInfo.id
					}, function(data) {
						selectFlow(data, modelInfo);
					});
					$(this).modal("close");
				},
				cls : "btn-primary"
			}, {
				text : btn.cancel,
				click : function() {
					$(this).modal("close");
				}
			} ]
		});
	};
	// 保存流程
	toolbar.saveFlow = function(diagramID) {
		if(toolbar.validate(diagramID,true)){
			var diagram =diagramID ?$("#"+diagramID).find(".diagram").data("diagram"): $(".diagram:visible").data("diagram");
			var process = diagramID ? $("#"+diagramID).find(".diagram").data("process") : $(".diagram:visible").data("process")
	
			var result = JSON.stringify({
				"class" : "go.GraphLinksModel",
				"linkFromPortIdProperty" : "fromPort",
				"linkToPortIdProperty" : "toPort",
				nodeDataArray : diagram.model.nodeDataArray,
				linkDataArray : diagram.model.linkDataArray
			})
	
			pousheng.ajaxData("design/insertModel", {
				data : {
					model : result,
					name : process.name,
					key : process.id,
					category : process.nameSpace,
					version : process.version
				}
			});
			
		}else{
			pousheng.warnMsg("验证不通过，保存失败");
		}
		

	};
	//部署流程
	toolbar.deployFlow=function(){
			if(toolbar.validate(false,true)){
			var diagram = $(".diagram:visible").data("diagram");
			var process = $(".diagram:visible").data("process");
	
			var result = JSON.stringify({
				"class" : "go.GraphLinksModel",
				"linkFromPortIdProperty" : "fromPort",
				"linkToPortIdProperty" : "toPort",
				nodeDataArray : diagram.model.nodeDataArray,
				linkDataArray : diagram.model.linkDataArray
			})
	
			pousheng.ajaxData("design/createAndDeployModel", {
				data : {
					model : result,
					name : process.name,
					key : process.id,
					category : process.nameSpace,
					version : process.version
				}
			});
			
		}else{
			pousheng.warnMsg("验证不通过，保存失败");
		}
		
	};
	// 复制流程
	toolbar.copyFlow = function() {
		var diagram = $(".diagram:visible").data("diagram");
		var process = $(".diagram:visible").data("process");
		var processInfo = node.nodeCreate("process");
		processInfo.id = process.id + "_tmpl";
		processInfo.name = process.name + "_副本";
		var diagramInfo, diagramId = pousheng.getNextId("diagram_"), diagramDiv = $("<div  class='diagram'/>").attr("id", diagramId);
		flowTabs.tabs("addTab", {
			title : processInfo.name,
			content : diagramDiv
		});

		diagramInfo = workflow.createDiagram(diagramId);
		var model = JSON.stringify({
			"class" : "go.GraphLinksModel",
			"linkFromPortIdProperty" : "fromPort",
			"linkToPortIdProperty" : "toPort",
			nodeDataArray : diagram.model.nodeDataArray,
			linkDataArray : diagram.model.linkDataArray
		})
		toolbar.loadModel(model, processInfo, diagramInfo, diagramDiv);

	};

	// 保存所有
	toolbar.savaAll = function() {

	};
	// 显示palatte
	toolbar.palatte = function() {
		$("#palette").is(":visible") ? $("#palette").panel("close") : $("#palette").panel("open");

	};
	// 创建帮助
	toolbar.help = function() {
		//$("#helper").dialog();
		
	
		

	};
		// 保存组
	toolbar.saveGroup = function() {	
		$("<div><label>活动名称</label><input id='groupName' type='text'/></div>").modal({
			title:"添加自定义活动",
			width:300,
			height:200,
			buttons : [ {
				text : btn.ok,
				cls : "btn btn-primary",
				click : function() {
					var $this =$(this);
					var palette =$("#myPaletteGroup").data("palette");
					var diagram =toolbar.getDiagram().data("diagram");
					diagram.commandHandler.groupSelection();
					$.each(diagram.selection.toArray()||[],function(i,v){
						if(v.data.isGroup){
							v.data.name=$this.find("#groupName").val();
						};
					});
					palette.commandHandler.pasteSelection(diagram.commandHandler.copySelection());
					diagram.commandHandler.ungroupSelection();
					var model = JSON.stringify({nodeDataArray :palette.model.nodeDataArray,linkDataArray:palette.model.linkDataArray});
					pousheng.ajaxData("design/saveModelGroup",{data:{nodeData:model}});
					$(this).modal("close");
				}
			}, {
				text : btn.cancel,
				click : function() {
					$(this).modal("close");
				}
			} ]
			
		})
		
		
		

	};
	// 重做
	toolbar.redo = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.redo();
	};
	// 撤销
	toolbar.undo = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.undo();
	};
	// 合并成组
	toolbar.group = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.groupSelection();
	};
	// 分组
	toolbar.unGroup = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.ungroupSelection();
	};
	// 剪切
	toolbar.cut = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.cutSelection();
	};
	// 复制
	toolbar.copy = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.copySelection();
	};
	// 粘贴
	toolbar.paster = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.pasteSelection(this.getDiagram().data("diagram").lastInput.documentPoint);
	};
	// 删除
	toolbar.deletes = function() {
		this.getDiagram() && this.getDiagram().data("diagram").commandHandler.deleteSelection();
	};
	// 导出
	toolbar.exports = function() {
		var t = this.getDiagram() ? this.getDiagram() : false;
		if (t) {
			this.form.attr("action", "design/export").html();
			this.form.html($("<input name='fileName'>").val(t.data("process").name));
			var result = JSON.stringify({
				"class" : "go.GraphLinksModel",
				"linkFromPortIdProperty" : "fromPort",
				"linkToPortIdProperty" : "toPort",
				nodeDataArray : t.data("diagram").model.nodeDataArray,
				linkDataArray : t.data("diagram").model.linkDataArray
			})
			this.form.append($("<input name='fileContent'>").val("{\"process\":" + JSON.stringify(t.data("process")) + ",\"model\":" + result + "}"));

			this.form.trigger("submit");

		}
	};
	// 导入
	toolbar.import = function() {

		this.form.html($("<input type='file' class='span3' name='file' id='file'>"));
		this.form.clone().show().attr("action", "design/import").modal({
			width : 250,
			height : 150,
			buttons : [ {
				text : "确定",
				click : function() {
					$(this).ajaxSubmit({
						success : function(response, statusText, xhr, jqForm) {
							var diagram, diagramDiv = $("<div  class='diagram'/>").attr("id", pousheng.getNextId("diagram_"));

							var result = pousheng.jsonEval(response);
							if (flowTabs.tabs("exists", result.process.name)) {
								flowTabs.tabs("selectTab", result.process.name);
							} else {
								flowTabs.tabs("addTab", {
									title : result.process.name,
									content : diagramDiv
								});
							}
							diagram = workflow.createDiagram(diagramDiv.attr("id"));
							toolbar.loadModel(result.model, result.process, diagram, diagramDiv);
							$("#application-toolbar").find("i.disabled").removeClass("disabled");

						}
					});
					$(this).modal("close");
					return false;
				},
				cls : "btn-primary"
			}, {
				text : btn.cancel,
				click : function() {
					$(this).modal("close");
				}
			} ]
		});
	};

	// 图形验证
	toolbar.validate = function(diagramID,isTip) {
       var diagramDiv = diagramID? $("#"+diagramID).find(".diagram") : this.getDiagram();
		if (diagramDiv) {
			var diagram =diagramDiv.data("diagram")
			var startC = 0;
			var endC = 0;
			var errorMsg = $("<ul>").empty();
			var process = diagramDiv.data("process");
			if((/^\d/).test(process.id)||(/[\u4E00-\u9FA5]/g).test(process.id)){
				errorMsg.append(("<li>流程编号填写不正确 </li>"));
			}
			$.each(diagram.model.nodeDataArray || [], function(i, v) {
				if (v.category != "comment") {
					if (v.category != "endEvent" && diagram.findNodeForKey(v.key).findLinksOutOf().count == 0) {
						errorMsg.append(("<li>节点编号:{0} 没有出线 </li>").format(v.key));
					} else if (v.category == "startEvent") {
						startC++;
					}
					if (v.category != "startEvent" && diagram.findNodeForKey(v.key).findLinksInto().count == 0) {
						errorMsg.append(("<li>节点编号:{0}没有入线 </li>").format(v.key));
					} else if (v.category == "endEvent") {
						endC++;
					}
					
					if (v.category != "exclusiveGateway" && diagram.findNodeForKey(v.key).findLinksOutOf().count > 1) {
						errorMsg.append(("<li>节点编号:{0}有多条出线</li>").format(v.key));
						
					}else if(v.category == "exclusiveGateway"){
						var it =diagram.findNodeForKey(v.key).findLinksOutOf();
						while(it.next()){
							if(it.value.data.key !=  v['default'] && it.value.data.properties.conditionExpression==""){
								errorMsg.append(("<li>线条编号:{0}不能为空</li>").format(it.value.data.key));
							}else if(it.value.data.key ==  v['default'] && it.value.data.properties.conditionExpression!=""){
								errorMsg.append(("<li>线条编号:{0}设为默认只能为空</li>").format(it.value.data.key));
							}
						}
						
					}
					
					$.each(v.properties.extensionElements || [], function(i, e) {
						$.each(e.activiti_taskListener || [], function(k, z) {
							if (z.activiti_field.activiti_expression === "") {
								errorMsg.append(("<li>节点编号:{0}—{1}不能为空 </li>").format(v.key, z.attr.__name));
							}
							if(z.attr.__validate){
								for(s in z.attr.__validate){
									switch(s){
										case "number" : 
											!$.isNumeric(z.activiti_field.activiti_expression)&&errorMsg.append(("<li>{0}节点{1}只能为数字 </li>").format(v.key,z.attr.__name));
										break;
										
									}
								}
							}
						});
					});
				}
			});
			
		
			startC != 1 && errorMsg.append(("<li>开始节点数目不能为{0}</li>").format(startC));
			endC != 1 && errorMsg.append(("<li>结束节点数目不能为{0}</li>").format(endC));
			if(errorMsg.find("li").length==0 ){
				!isTip && pousheng.successMsg("验证通过");
				return true;
			}else{
				pousheng.warnMsg(errorMsg) ;
				return false;
			}
		}else{
			pousheng.warnMsg("未选中流程模板") ;
		}
	};

	toolbar.loadModel = function(model, process, diagram, diagramDiv) {
		model = model || {
			"class" : "go.GraphLinksModel",
			"linkFromPortIdProperty" : "fromPort",
			"linkToPortIdProperty" : "toPort"
		}
		diagramDiv.data("diagram", diagram);
		diagram.model = go.Model.fromJson(model);
		addDiagramEvent(diagram, diagramDiv);
		diagramDiv.data("process", process);
	}

	// 为图形添加事件
	function addDiagramEvent(diagram, diagramDiv) {
	   var 	properSetings = $("#properSetings")
       var tmpl =$.templates("#activitiTmpl");
		 
		diagram.addDiagramListener("BackgroundSingleClicked", function(e) {
			$.templates("#processTmpl").link("#properSetings", diagramDiv.data("process"));
		});

		
		diagram.addDiagramListener("ExternalObjectsDropped", function(e,obj) {
			
			
			var sel = e.diagram.selection.toArray() ;
		   $.each(sel||[],function(i,v){
			   v.data.properties = v.data.properties||node.nodeCreate(v.data.__node);
		   });
		   e.diagram.commandHandler.ungroupSelection();
		   
		});

		diagram.addDiagramListener("LinkDrawn", function(e) {
     
            e.subject.data.category = "sequenceFlow";
			e.subject.data.properties = node.nodeCreate("sequenceFlow");
			e.subject.data.key =e.subject.fromNode.data.key+'_'+e.subject.toNode.data.key;
			e.subject.data.condition='条件判断';
			e.subject.diagram.model.updateTargetBindings(e.subject.data);
			if (e.subject.fromNode.data.__figure === "Diamond") {
				var label = e.subject.findObject("LABEL");
				if (label !== null){	
					label.visible = true;
				}
				e.subject.fromNode.data['default']==undefined &&(e.subject.fromNode.data['default'] =e.subject.data.key);
			}
			
		});

		diagram.addDiagramListener("ObjectSingleClicked", function(e) {
			var sel = e.diagram.selection.first();
			if (sel !== null) {
				tmpl.link("#properSetings", sel.data);
				
				//设置默认条件
				if(sel.data.category=='exclusiveGateway'){
					var it = sel.findLinksOutOf();
					var proper ={};
					while(it.next()){
						proper[it.value.data.key]=it.value.data;
						$("#properSetings #exclusiveGateway").append("<option value='"+it.value.data.key+"'>"+it.value.data.condition+"</option>");
					}
					$("#properSetings #exclusiveGateway").val(sel.data['default']).change(function(){
						sel.data['default']=$(this).val();
					});
				}
				
			}

		});

	}

	$("#application-toolbar").on("click", "li.toolbarItem", function(event) {
		if (toolbar[$(this).attr("action")] && !$(this).find("i").hasClass("disabled")) {
			toolbar[$(this).attr("action")].call(toolbar);
		}
	});
	
	
    //初始化palette
	  workflow.createPalette();
	
       var imgBase =jsPath+"module/design/img/";
      
       var nodeDataArray = [ // specify the contents of the Palette
        { category: "startEvent", name: "开始" ,__node:"startEvent", __icon:imgBase+"start.png",activiti_initiator:"pi_processInitiator", key:"start",__icon2:imgBase+"start.png"},
        { name: "普通任务", category: "userTask" ,__node:"userTask",key:"userTask", __icon:imgBase+"ptsh.png",__icon2:imgBase+"work.png"},
         {  name: "循环任务",category:"userTask",__node:"cycleServiceTask",key:"userTask2", __icon:imgBase+"hqzy.png",__icon2:imgBase+"123.png"},
        { name: "邮件服务", category: "serviceTask"  ,__node:"serviceTask",key:"serviceTask", __icon:imgBase+"email2.png",__icon2:imgBase+"email.png","activiti_class" : "com.pousheng.bpms.engine.delegate.AutoServiceDelegate"},
        { name: "web服务", category: "serviceTask",__node:"webService",key:"webService" , __icon:imgBase+"webserve.png", __icon2:imgBase+"web.png","activiti_class" : "com.pousheng.bpms.engine.delegate.AutoServiceDelegate" },
        { name: "条件", category: "exclusiveGateway",__node:"gateway", __icon:imgBase+"dytj.png", __icon2:imgBase+"parallel.png",__figure: "Diamond" ,key:"exclusiveGateway" },
        { category: "endEvent", name: "结束",__node:"endEvent",key:"end", __icon:imgBase+"finish.png",__icon2:imgBase+"stop.png"},
        { name: "sql活动",category:"serviceTask",__node:"sqlService",key:"userTask2", __icon:imgBase+"zxsql.png",__icon2:imgBase+"sql.png","activiti_class" : "com.pousheng.bpms.engine.delegate.AutoServiceDelegate"},
        { category: "comment", __node:"comment",key:"comment", name: "注释", __icon:imgBase+"note.png"}
     ];
 

         $("#myPalette").data("palette").model = new go.GraphLinksModel(nodeDataArray);
        
       	pousheng.ajaxData("design/getModelByUser",{data:{userId:'000000'}},function(data){
		      $("#myPaletteGroup").data("palette").model = go.Model.fromJson(pousheng.jsonEval(data));
         });
       	
       	
       	 $("#myPaletteGroup").data("palette").addDiagramListener("ObjectDoubleClicked",function(e){
       		 pousheng.confirm("你确定要删除选中的图形",function(){
       			  var part = e.diagram.selection.toArray();
		          	$.each(part||[],function(i,v){
		          		e.diagram.remove(v); 
		          	});
		          	var model = JSON.stringify({nodeDataArray :e.diagram.model.nodeDataArray,linkDataArray:e.diagram.model.linkDataArray});
	            	pousheng.ajaxData("design/saveModelGroup",{data:{nodeData:model}});
       		 });
           
        });
     
     	 


});