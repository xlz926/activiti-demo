define(function(require, exports, module){ 
  
    var node={};
    module.exports=node;
    
    node.base=function(){
        this.attr=[];
    };
    node.process=function(){
        this.modifyby="";
        this.id="";
        this.isExecutable=true;
        this.nameSpace="",
        this.version=1;
    };
    node.startEvent=function(){
   
    };
    node.endEvent=function(){
    	
    };
    
    node.endEvent=function(){
    	
    };
	node.userTask = function() {
			this.extensionElements =[ {
				activiti_taskListener : [{
				activiti_field:{activiti_expression:""},
				attr:{name:"assignee",__name:"审核人",__class:"icon-user",__value:"",__type:"field-group"}
			   },{
				activiti_field:{activiti_expression:"1"},
				attr:{name:"participantsCount ",__name:"参与人数",__validate:{number:"只能为数字"}}
			   },{
					activiti_field:{activiti_expression:false},
				    attr:{name:"firstJump",__name:"首次跳过",__class:"firstJump",__type:"field-radio",__helpName:[{__name:"是",__value:true,__group:"firstJump"},{__name:"否",__value:false,__group:"firstJump"}]}
				},{
					activiti_field:{activiti_expression:true},
				    attr:{name:"sameUserJump",__name:"相同跳过",__class:"sameUserJump",__type:"field-radio",__helpName:[{__name:"是",__value:true,__group:"sameUserJump"},{__name:"否",__value:false,__group:"sameUserJump"}]}
				},{
					activiti_field:{activiti_expression:"3_Day"},
				    attr:{name:"timeDuration",__name:"过期时间",__liClass:"timeDuration"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"formForeignKey",__name:"扩展属性",__class:"formForeignKey"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"startMailTemplateId",__name:"开始邮件",__value:"",__class:"icon-envelope",__type:"field-group"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"dueMailTemplateId",__name:"过期邮件",__value:"",__class:"icon-envelope",__type:"field-group"}
				},
				{
					activiti_field:{activiti_expression:"0|:0|"},
				    attr:{name:"frequency",__name:"发送频率",__value:"立刻;一次",__class:"icon-bullhorn",__type:"field-group"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"endMailTemplateId",__name:"结束邮件",__value:"",__class:"icon-envelope",__type:"field-group"}
				}],
				attr : {
					event : "create",
					class : "com.pousheng.bpms.engine.listener.TaskParamInitListener",
					__name:"高级属性"
				}
			    
			},{activiti_taskListener:[],attr:{
			     	event : "assignment",
					class : "com.pousheng.bpms.engine.listener.TaskFindAssigneeListener",
					__name:"检核人",
					__class:"hide"
			}},{activiti_taskListener:[],attr:{
		     	event : "complete",
				class : "com.pousheng.bpms.engine.listener.TaskEmailListener",
				__class:"hide"
		}}
			]	
	};
    
	
	node.serviceTask = function() {
			this.extensionElements =[{activiti_executionListener : [{
					activiti_field:{activiti_expression:"0|:0|"},
				    attr:{name:"frequency",__name:"发送频率",__value:"立刻;一次",__class:"icon-bullhorn",__type:"field-group",__mailservice:'true'}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"dueMailTemplateId",__name:"邮件模板",__value:"",__class:"icon-envelope",__type:"field-group"}
				}],
				attr : {
					event : "start",
					class : "com.pousheng.bpms.engine.listener.ServiceEmailListener",
					__name:"邮件模板选择"
				}
			}];
		
	};
    
	node.webService=function(){
			this.extensionElements =[{activiti_executionListener :  [{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"wsUrl",__name:"参数设置",__class:"selectWebService",__value:"",__class:"icon-plane",__type:"field-group"}
				}],attr : {
					event : "start",
					class : "com.pousheng.bpms.engine.listener.WebServicesListener",
					__name:"web服务设置"
				}	
			},{activiti_executionListener : [{
					activiti_field:{activiti_expression:"0|:0|"},
				    attr:{name:"frequency",__name:"发送频率",__value:"立刻;一次",__liClass:"hide"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"dueMailTemplateId",__name:"邮件模板",__value:"",__class:"icon-envelope",__type:"field-group"}
				}],
				attr : {
					event : "start",
					class : "com.pousheng.bpms.engine.listener.ServiceEmailListener",
					__name:"邮件模板选择"
				}
			}];
		
	};
	
	
	
	 
	node.sqlService=function(){
			this.extensionElements =[{activiti_executionListener :  [{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"runType",__name:"SQL类型",__class:"runType",__helpName:[{__name:"SQL",__value:"0"},{__name:"存储过程",__value:"1"}],__type:"field-select"}
				},	{
					activiti_field:{activiti_expression:"0"},
					attr:{name:"sqlType",__name:"执行类型",__class:"sqlType",__helpName:[{__name:"本地",__value:"0"},{__name:"自定义链接",__value:"1"}],__type:"field-select"}
				},{
					activiti_field:{activiti_expression:"com.mysql.jdbc.Driver"},
					attr:{name:"jdbcDriver",__name:"数据库驱动名",__liClass:"sqlType_show",__value:""}
				},{
					activiti_field:{activiti_expression:"jdbc:mysql://localhost:3306/test_ysflow?useUnicode=true&amp;characterEncoding=utf-8"},
					attr:{name:"jdbcUrl",__name:"服务器地址",__liClass:"sqlType_show",__value:""}
				},{
					activiti_field:{activiti_expression:"root"},
					attr:{name:"jdbcUserName",__name:"用户名",__liClass:"sqlType_show"}
				},{
					activiti_field:{activiti_expression:"root"},
					attr:{name:"jdbcPassword",__name:"密码",__liClass:"sqlType_show"}
				},{
					activiti_field:{activiti_expression:""},
					attr:{name:"sqlCode",__name:"SQL语句",__liClass:"runType_show",__value:"",__class:"icon-text-width",__type:"field-group"}
				},{
					activiti_field:{activiti_expression:""},
					attr:{name:"procedureCode",__name:"存储过程名称",__liClass:"runType_hide"}
				},{
					activiti_field:{activiti_expression:"sql_result"},
					attr:{name:"returnParam",__name:"传回参数名称"}
				}
				],attr : {
					event : "start",
					class : "com.pousheng.bpms.engine.listener.SQLServicesListener",
					__name:"自定义执行",
					__id:"sqlService"
				}	
			}];
		
	};
	
	node.cycleServiceTask=function(){
		this.extensionElements =[ {
				activiti_taskListener : [{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"runType",__name:"执行类型",__type:"field-select",__id:"runType",__helpName:[{__name:"组织",__value:"0"},{__name:"组",__value:"1"},{__name:"人员",__value:"2"}]}
				},{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"beginNumber",__name:"循环开始",__liClass:"orgLoop",__validate:{number:"只能为数字"}}
				},{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"endNumber",__name:"循环结束",__liClass:"orgLoop",__validate:{number:"只能为数字"}}
				},{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"excludedNumber",__name:"排除循环数字",__liClass:"orgLoop",__validate:{number:"只能为数字"}}
				},{
					activiti_field:{activiti_expression:true},
					attr:{name:"isNowOrgBegin",__name:"当前组织开始",__liClass:"orgLoop",__type:"field-radio",__helpName:[{__name:"是",__value:true,__group:"isNowOrgBegin"},{__name:"否",__value:false,__group:"isNowOrgBegin"}]}
				},{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"orgType",__name:"组织类型",__liClass:"orgLoop",__type:"field-select",__helpName:[{__name:"行政组织",__value:"0"},{__name:"业务组织",__value:"1"}]}
				},{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"groupID",__name:"用户组",__class:"icon-list",__value:"",__type:"field-group",__liClass:"groupLoop"}
				},{
					activiti_field:{activiti_expression:"0"},
				    attr:{name:"userIDs",__name:"人员编号",__class:"icon-th-list",__value:"",__type:"field-group",__liClass:"usersLoop"}
				},{
					activiti_field:{activiti_expression:false},
				    attr:{name:"firstJump",__name:"首次跳过",__class:"firstJump",__type:"field-radio",__helpName:[{__name:"是",__value:true,__group:"firstJump"},{__name:"否",__value:false,__group:"firstJump"}]}
				},{
					activiti_field:{activiti_expression:true},
				    attr:{name:"sameUserJump",__name:"相同跳过",__class:"sameUserJump",__type:"field-radio",__helpName:[{__name:"是",__value:true,__group:"sameUserJump"},{__name:"否",__value:false,__group:"sameUserJump"}]}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"formForeignKey",__name:"扩展属性",__class:"formForeignKey"}
				},{
					activiti_field:{activiti_expression:"3_Day"},
				    attr:{name:"timeDuration",__name:"过期时间",__liClass:"timeDuration"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"startMailTemplateId",__name:"开始邮件",__value:"",__class:"icon-envelope",__type:"field-group"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"dueMailTemplateId",__name:"过期邮件",__value:"",__class:"icon-envelope",__type:"field-group"}
				},{
					activiti_field:{activiti_expression:"0|:0|"},
				    attr:{name:"frequency",__name:"发送频率",__value:"立刻;一次",__class:"icon-bullhorn",__type:"field-group"}
				},{
					activiti_field:{activiti_expression:"000000"},
				    attr:{name:"endMailTemplateId",__name:"结束邮件",__value:"",__class:"icon-envelope",__type:"field-group"}
				}],
				attr:{event:"create", "class":"com.pousheng.bpms.engine.listener.LoopTaskParamInitListener",__name:"循环任务设置"}
		},{activiti_taskListener:[],
				attr : {
					event : "assignment",
					class : "com.pousheng.bpms.engine.listener.TaskFindAssigneeListener",
					__class:"hide"
				}
			},{activiti_taskListener:[],
				attr : {
					event : "complete",
					class : "com.pousheng.bpms.engine.listener.LoopTaskEmailListener",
					__class:"hide"
				}
			}
		];
		
	};

	
    node.exclusiveGateway =function(){
    };

    node.sequenceFlow=function(){
        this.conditionExpression="";
        this.attr={__value:"请设置条件"};
    };

    
    
    

    node.taskListener =function(){
         this.event="create";
         this.class="";
         this.expression="";
    };

    node.nodeCreate=function(type){
         if(node[type]){
           return new node[type];
         } else{
           return {};
         } 
    };
});