define(function(require, exports, module){
	
	require("lib/draw2D/html5img");
	require("pousheng.ui");
	
	var viewDiagramId=0;
	var a=go.GraphObject.make;
	 //颜色画板
    
	function Viewflow(div,model,record){

		this.graygrad = a(go.Brush, go.Brush.Linear, { 0: "rgb(150, 150, 150)",  1: "rgb(86, 86, 86)" });
        this.greengrad = a(go.Brush, go.Brush.Linear, { 0: "rgb(98, 149, 79)", 1: "rgb(17, 51, 6)" });
        this.redgrad = a(go.Brush, go.Brush.Linear, { 0: "rgb(156, 56, 50)", 1: "rgb(82, 6, 0)" });
        this.yellowgrad = a(go.Brush, go.Brush.Linear, { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
        
        this.bluegrad = a(go.Brush, go.Brush.Linear, { 0: "rgb(60, 204, 254)", 1: "rgb(70, 172, 254)" });
        this.pinkgrad = a(go.Brush, go.Brush.Linear, { 0: "rgb(255, 192, 203)", 1: "rgb(255, 142, 203)" });
		
		var that =this;
		this.containdiv = div||$("body");
		
	
		var  diagram = a(go.Diagram, div.attr("id"));
		this.createTemplate(diagram);
		this.historyData={};
		
		diagram.model=go.Model.fromJson(model);
		
		
		var iconState=["Passed.gif","Active.gif","Pending.gif","Passed.gif","Error.gif","cancelled.gif"]
		$.each($.parseJSON(record)||[],function(i,e){
			
			if(!that.historyData[e.activityId]){
				that.historyData[e.activityId]=[];
			}
			that.historyData[e.activityId].push(e);
			
		  var  nodeIcon=diagram.model.findNodeDataForKey(e.activityId)
			if(!nodeIcon.__icon3){
				 diagram.model.setDataProperty(nodeIcon,"__icon3",jsPath+"module/design/img/"+iconState[e.state]); 	
			}
			
		});
		
           
            
       this.historyLog =  $('<div class="popover top"> <h3 class="popover-title">执行日志</h3> <div class="popover-content" style="max-height:200px;overflow:auto;width:210px;"></div> </div>')
                           .css({
                        	   top:"20%",
                        	   margin:0
                           }).appendTo(div).draggable({
                        	   handle:".h3",
                        	   cancel:".popover-content"
                           });
	   $('<button type="button" class="close" data-dismiss="alert">&times;</button>').click(function(){
	    	that.historyLog.hide();
	    }).appendTo(this.historyLog.find("h3"));
		
		return diagram;
		
		
	};

	
 Viewflow.prototype.createTemplate=function(diagram){
	 
    var graygrad = $(go.Brush, go.Brush.Linear, { 0: "#F5F5F5", 1: "#F1F1F1" });
    var bluegrad = $(go.Brush, go.Brush.Linear, { 0: "#CDDAF0", 1: "#91ADDD" });
    var yellowgrad = $(go.Brush, go.Brush.Linear, { 0: "#FEC901", 1: "#FEA200" });
    var lavgrad = $(go.Brush, go.Brush.Linear, { 0: "#EF9EFA", 1: "#A570AD" });
    	

       diagram.nodeTemplateMap.add("", a(go.Node, go.Panel.Vertical,this.nodeStyle(),
                new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                a(go.Panel, go.Panel.Spot,  
                   a(go.Panel, go.Panel.Horizontal,
                  a(go.Picture, 
					    { desiredSize: new go.Size(70, 35),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopRight},
                  	new go.Binding("source", "__icon2")),
                  	a(go.Picture, 
					    { desiredSize: new go.Size(15, 15),
                	     margin:new go.Margin(0,0,0,-70),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopLeft},
                  	new go.Binding("source", "__icon3"))),
                    this.makePort("T", go.Spot.Top, true, true),
                    this.makePort("L", go.Spot.Left, true, true),
                    this.makePort("R", go.Spot.Right, true, true),
                    this.makePort("B", go.Spot.Bottom, true, true)
                ), a(go.TextBlock, { font: "bold 9pt Helvetica, Arial, sans-serif",
                    maxSize: new go.Size(70, NaN),
                    wrap: go.TextBlock.WrapFit,
                    margin:new go.Margin(6,0,0,0),
                    editable: true
                }, new go.Binding("text", "name").makeTwoWay())
           ));
        
        
       diagram.nodeTemplateMap.add("exclusiveGateway", a(go.Node, go.Panel.Vertical,this.nodeStyle(),
                new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                a(go.Panel, go.Panel.Spot, 
                   a(go.Panel, go.Panel.Horizontal,
                  a(go.Picture, 
					    { desiredSize: new go.Size(35, 35),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopRight},
                  	new go.Binding("source", "__icon2")),
                  	a(go.Picture, 
					    { desiredSize: new go.Size(15, 15),
                	     margin:new go.Margin(0,0,0,-35),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopLeft},
                  	new go.Binding("source", "__icon3"))),
                    this.makePort("T", go.Spot.Top, true, true),
                    this.makePort("L", go.Spot.Left, true, true),
                    this.makePort("R", go.Spot.Right, true, true),
                    this.makePort("B", go.Spot.Bottom, true, true)
                )
           ));
        
        
     
     
        
          diagram.groupTemplate =
    		 a(go.Group, go.Panel.Vertical,
        { selectionObjectName: "PANEL", 
    	  defaultAlignment: go.Spot.Left,
            ungroupable: true
        },  
         a("SubGraphExpanderButton"),
        a(go.TextBlock,"group",
          { font: "bold 12pt sans-serif",
              isMultiline: false,  // don't allow newlines in text
              editable: true
          },  // allow in-place editing by user
          new go.Binding("text", "name").makeTwoWay(),
          new go.Binding("stroke", "color")),
        a(go.Panel, go.Panel.Auto,
          { name: "PANEL" },
          a(go.Shape, "Rectangle",  // the rectangular shape around the members
            {fill: "rgba(128,128,128,0.2)", stroke: "gray", strokeWidth: 3 }),
          a(go.Placeholder, { padding: 10 })));
    	 diagram.commandHandler.archetypeGroupData =
      { text: "Group",key:"group", isGroup: true, color: "blue" };  
        
        
        
   
        
      
        diagram.nodeTemplateMap.add("startEvent",
            a(go.Node, go.Panel.Spot, this.nodeStyle(),
            new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            a(go.Panel, go.Panel.Vertical,
              a(go.Picture,  
            { desiredSize: new go.Size(35, 35),
              imageStretch: go.GraphObject.Uniform,
              alignment: go.Spot.TopRight},
                  new go.Binding("source", "__icon2")),
                  	a(go.Picture, 
					    { desiredSize: new go.Size(15, 15),
                	     margin:new go.Margin(-35,0,0,0),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopLeft},
                  	new go.Binding("source", "__icon3"))
           ),
            this.makePort("L", go.Spot.Left, true, false),
            this.makePort("R", go.Spot.Right, true, false),
            this.makePort("B", go.Spot.Bottom, true, false)
            ));
        
         diagram.nodeTemplateMap.add("endEvent",
            a(go.Node, go.Panel.Spot,this.nodeStyle(),
            new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            a(go.Panel, go.Panel.Vertical,
              a(go.Picture,  
            { desiredSize: new go.Size(35, 35),
              imageStretch: go.GraphObject.Uniform,
              alignment: go.Spot.TopRight},
                  new go.Binding("source", "__icon2")),
                  	a(go.Picture, 
					    { desiredSize: new go.Size(15, 15),
                	     margin:new go.Margin(-35,0,0,0),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopLeft},
                  	new go.Binding("source", "__icon3"))
           ),
             this.makePort("T", go.Spot.Top, false, true),
            this.makePort("L", go.Spot.Left, false, true),
            this.makePort("R", go.Spot.Right, false, true)
            ));
     

        diagram.nodeTemplateMap.add("comment",
          a(go.Node, go.Panel.Spot, this.nodeStyle(),
            new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            a(go.Panel, go.Panel.Auto,
            a(go.TextBlock, "结束",
            { margin: 5,
            	 maxSize: new go.Size(200, NaN),
            	 editable: true,
                font: "bold 9pt Helvetica, Arial, sans-serif",
            })) ));
        
           diagram.linkTemplate =
      a(go.Link,
                { routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5, toShortLength: 4
                },   
                 a(go.Shape, // the link path shape
                {isPanelMain: true,
                stroke: "#2A7FB7", strokeWidth: 3
            },new go.Binding("curviness", "curviness").makeTwoWay(),
            new go.Binding("stroke", "color").makeTwoWay()),
                a(go.Shape,
                { toArrow: "standard",
                    stroke: null, fill: "#2A7FB7"
                },new go.Binding("fill", "color").makeTwoWay()),
                a(go.Panel, go.Panel.Auto,
                { visible: false, name: "LABEL" },
                new go.Binding("visible", "visible").makeTwoWay(),
                a(go.Shape,  // the link shape
                {fill: a(go.Brush, go.Brush.Radial, { 0: "rgb(240, 240, 240)", "0.3": "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }), stroke: null
            }),
                a(go.TextBlock, "描述", // the label
                {textAlign: "center",
                name:"condition",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#919191",
                margin: 4
            }, new go.Binding("text", "condition").makeTwoWay()))
        );
        
	
}

 
  Viewflow.prototype.nodeStyle = function () {
        var that = this;
        return {
            click:function(e,obj){
            	that.showNodeInfo(obj)
            }
        };
    };

    Viewflow.prototype.makePort = function (name, spot, output, input) {
        return a(go.Shape, {
            figure: "Circle",
            fill: "transparent",
            stroke: null, // this is changed to "white" in the showPorts function
            desiredSize: new go.Size(8, 8),
            alignment: spot, alignmentFocus: spot, // align the port on the main Shape
            portId: name, // declare this object to be a "port"
            fromSpot: spot, toSpot: spot, // declare where links may connect at this port
            fromLinkable: output, toLinkable: input, // declare whether the user may draw links to/from here
            cursor: "pointer" // show a different cursor to indicate potential link point
        });
    };
    
   Viewflow.prototype.showNodeInfo = function (obj) {
        var that =this;
        var model = this.historyData[obj.data.key];
        var isStartEvent =false;
        
        var it = obj.findNodesInto().iterator;
       while(it.next()){
    	 if( it.value.data.category == 'startEvent')
    	   isStartEvent = true;
       }
      
         var result = $('<ul/>');
        if(model){  
        	$.each(model||[],function(i,e){
        		e.activityType=="userTask"&&result.append(("<li><span>{0}: </span>执行人：{1}({2})</li>").format(i+1,e.assigneeUserId||"未分配",e.assignee));
        	});
        	result.append('<li style="border-bottom: 1px solid #CCCCCC; height: 1px;margin:9px 1px;"></li>');
        	$.each(model||[],function(i,e){
        		result.append(("<li>活动名称：{0}{1}</li>").format(e.activityName,e.assigneeUserId ?"("+e.assigneeUserId+")":""));
        		e.startTime &&  result.append(("<li>开始时间：{0}</li>").format((new Date(e.startTime)).format("yyyy-MM-dd hh:mm:ss")));
        		e.endTime && result.append(("<li>完成时间：{0}</li>").format((new Date(e.endTime)).format("yyyy-MM-dd hh:mm:ss")));
        		e.dueDate && result.append(("<li>过期时间：{0}</li>").format((new Date(e.dueDate)).format("yyyy-MM-dd hh:mm:ss")));
              	if(e.pi_approve ==1){
              		result.append("<li>执行状态：<label class='label label-success'>"+(isStartEvent?"完成":"同意")+"</label></li>");
              	}else if(e.pi_approve ==2){
              		result.append("<li>执行状态: <label class='label label-important'>不同意</label></li>")
              	}else if(e.pi_approve ==3){
              		result.append("<li>执行状态: <label class='label label-important'>已取回</label></li>")
              	}
        		result.append('<li style="border-bottom: 1px solid #CCCCCC; height: 1px;margin:9px 1px;"></li>')
        	});
        	this.historyLog.show().find(".popover-content").html(result);
        }else{
        	this.historyLog.hide();
        }
    
    };
    
    module.exports=Viewflow;
    
});


