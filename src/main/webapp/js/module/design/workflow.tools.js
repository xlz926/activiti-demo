
define(function(require, exports, module) {
   
	
	 require('lib/draw2D/html5img');
	
     var a = go.GraphObject.make;
	function Workflow() {

        //颜色画板
    	this.color = [];
        this.color.push("#2A7FB7");
    	this.color.push("red");
     
    }
     
	module.exports =Workflow; 

    Workflow.prototype.createPalette = function (id) {
       var palette = new go.Palette("myPalette");
           
        var groupPalette = new go.Palette("myPaletteGroup");
 	
        groupPalette.groupTemplate  =
        a(go.Group, go.Panel.Vertical,
        { selectionObjectName: "PANEL",  // selection handle goes around shape, not label
            ungroupable: true,
             isSubGraphExpanded: false
        },  
        a(go.Picture,
              { desiredSize: new go.Size(70, 35),
                imageStretch: go.GraphObject.Uniform,
                source:jsPath+"module/design/img/work.png"}
                ),
                a(go.TextBlock,{
                	font: "bold 9pt sans-serif",
                	maxSize: new go.Size(70, NaN),
                    wrap: go.TextBlock.WrapFit,
                    margin:new go.Margin(6,0,0,0),},  
                     new go.Binding("text", "name").makeTwoWay()));
        
        groupPalette.nodeTemplate = palette.nodeTemplate =
        a(go.Node,
          { selectionAdorned: false },  // no Adornment: instead change panel background color by binding to Node.isSelected
          a(go.Panel, go.Panel.Horizontal,
            { position: new go.Point(16, 0) },
            new go.Binding("background", "isSelected", function (s) { return (s ? "lightblue" : "white"); }).ofObject(""),
            a(go.Picture,
              { width: 25, height: 25,
                margin: new go.Margin(0, 4, 0, 0),
                imageStretch: go.GraphObject.Uniform},
                new go.Binding("source", "__icon").makeTwoWay()),
            a(go.TextBlock,{ 
            	    font: "bold 10pt Helvetica, Arial, sans-serif",
                    margin:new go.Margin(0, 4, 0, 0),
                    maxSize: new go.Size(100, NaN),
                    wrap: go.TextBlock.WrapFit
                },
              new go.Binding("text", "name"))));
        
        
        
        
        $("#myPalette").data("palette",palette);
        $("#myPaletteGroup").data("palette",groupPalette);
 
        
     
      
    };

    Workflow.prototype.createDiagram = function (id) {
		var diagram = a(go.Diagram, id, {
			initialContentAlignment : go.Spot.Center
		});
        
       this.createTemplate(diagram)        
     
       this.createLinkTemplate(diagram);

        diagram.undoManager.isEnabled = true;
        diagram.allowDrop = true; // must be true to accept drops from the Palette
        // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
        diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
        diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
        
        return diagram;

    };

    
    Workflow.prototype.showPorts = function (node, show) {
        var diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
        var it = node.ports;
        while (it.next()) {
            var port = it.value;
             port.stroke = (show ? "hotpink" : null);
            port.fill = (show ? "red" : "transparent");
        }
    };
    
     Workflow.prototype.setAttribute = function (node) {
        var diagram = node.diagram;
        var index = $.inArray(node.data.color,this.color);
        node.data.color=index<0||index>=this.color.length?this.color[0]:this.color[index+1];
         diagram.model.updateTargetBindings(node.data);

    };
    
    Workflow.prototype.nodeStyle = function () {
        var that = this;
        return {
            mouseEnter: function (e, obj) { that.showPorts(obj.part, true); },
            mouseLeave: function (e, obj) { that.showPorts(obj.part, false); }
        };
    };
    Workflow.prototype.makePort = function (name, spot, output, input) {
        return a(go.Shape,"XLine", {
            width: 6, height: 6, background: "transparent", fill: null, stroke: null,strokeWidth:3,
            alignment: spot, alignmentFocus: spot, // align the port on the main Shape
            portId: name, // declare this object to be a "port"
            fromSpot: spot, toSpot: spot, // declare where links may connect at this port
            fromLinkable: output, toLinkable: input, // declare whether the user may draw links to/from here
            cursor: "pointer" // show a different cursor to indicate potential link point
        });
    };


    Workflow.prototype.createTemplate = function (diagram) {
    	var that =this;
    diagram.groupTemplate =
    		 a(go.Group, go.Panel.Vertical,
        { selectionObjectName: "PANEL", 
            ungroupable: true
        },  
        a(go.TextBlock,
          {  font: "bold 12pt sans-serif",
              isMultiline: false,  
              editable: true
          },  
          new go.Binding("text", "text").makeTwoWay()),
        a(go.Panel, go.Panel.Auto,
          { name: "PANEL" },
          a(go.Shape, "Rectangle",  
            {fill: "rgba(128,128,128,0.2)", stroke: "gray", strokeWidth: 3 }),
          a(go.Placeholder, { padding: 10 })));
    	 diagram.commandHandler.archetypeGroupData =
      { name: "自定义活动",key:"group", isGroup: true, color: "gray" };  
          	
       diagram.nodeTemplateMap.add("", a(go.Node, go.Panel.Vertical,
                new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                
                a(go.Panel, go.Panel.Spot,  this.nodeStyle(),
                  a(go.Panel, go.Panel.Horizontal,
                  a(go.Picture, 
					    { desiredSize: new go.Size(70, 35),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopRight},
                  	new go.Binding("source", "__icon2"))),
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
        
        
       diagram.nodeTemplateMap.add("exclusiveGateway", a(go.Node, go.Panel.Vertical,
                new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                a(go.Panel, go.Panel.Spot,  this.nodeStyle(),
                   a(go.Panel, go.Panel.Horizontal,
                  a(go.Picture, 
					    { desiredSize: new go.Size(35, 35),
					    imageStretch: go.GraphObject.Uniform,
					     alignment: go.Spot.TopRight},
                  	new go.Binding("source", "__icon2"))),
                    this.makePort("T", go.Spot.Top, true, true),
                    this.makePort("L", go.Spot.Left, true, true),
                    this.makePort("R", go.Spot.Right, true, true),
                    this.makePort("B", go.Spot.Bottom, true, true)
                )
           ));
        
        
     
     
        
       
        
        
        
   
        
      
        diagram.nodeTemplateMap.add("startEvent",
            a(go.Node, go.Panel.Spot, this.nodeStyle(),
            new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            a(go.Panel, go.Panel.Vertical,
              a(go.Picture,  
            { desiredSize: new go.Size(35, 35),
              imageStretch: go.GraphObject.Uniform,
              alignment: go.Spot.TopRight},
                  new go.Binding("source", "__icon2"))
           ),
            this.makePort("L", go.Spot.Left, true, false),
            this.makePort("R", go.Spot.Right, true, false),
            this.makePort("B", go.Spot.Bottom, true, false)
            ));
        
         diagram.nodeTemplateMap.add("endEvent",
            a(go.Node, go.Panel.Spot, this.nodeStyle(),
            new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            a(go.Panel, go.Panel.Vertical,
              a(go.Picture,  
            { desiredSize: new go.Size(35, 35),
              imageStretch: go.GraphObject.Uniform,
              alignment: go.Spot.TopRight},
                  new go.Binding("source", "__icon2"))
           ),
             this.makePort("T", go.Spot.Top, false, true),
            this.makePort("L", go.Spot.Left, false, true),
            this.makePort("R", go.Spot.Right, false, true)
            ));
     

        diagram.nodeTemplateMap.add("comment",
          a(go.Node, go.Panel.Spot, this.nodeStyle(),
            new go.Binding("location", "__loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            a(go.Panel, go.Panel.Auto,
            a(go.TextBlock, 
            { margin: 5,
            	 maxSize: new go.Size(200, NaN),
            	 editable: true,
                font: "bold 9pt Helvetica, Arial, sans-serif",
            },new go.Binding("text", "name").makeTwoWay()))));
    };

        Workflow.prototype.createLinkTemplate = function (diagram) {
       // var radgrad = $(go.Brush, go.Brush.Radial, { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" });
        	var that =this;
        diagram.linkTemplate =
      a(go.Link,
                { routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5, toShortLength: 4,
                    relinkableFrom: true, relinkableTo: true, reshapable: true,
                    doubleClick:function(e,obj){
                    	 obj.data.color = obj.data.color=="red"?"#2A7FB7":"red";
				         obj.diagram.model.updateTargetBindings(obj.data);
         			}
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
                a(go.TextBlock, '条件判断' ,// the label
                {textAlign: "center",
                name:"condition",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#919191",
                margin: 4,
                editable: true
            }, new go.Binding("text", "condition").makeTwoWay()))
        );
        
        
       
    };
	


    window.workflow = new Workflow();

});