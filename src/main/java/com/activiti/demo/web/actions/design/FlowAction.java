package com.activiti.demo.web.actions.design;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
@RequestMapping("/design/*")
public class FlowAction {
        
	   @RequestMapping(value = "index", method = { RequestMethod.GET, RequestMethod.POST })
	   public String getIndex(){
		   
        	return "design/index";
        }
	   
	   @RequestMapping(value = "editFlow", method = { RequestMethod.GET, RequestMethod.POST })
	   public String editFlow(){
		   
        	return "design/index";
        }
}
