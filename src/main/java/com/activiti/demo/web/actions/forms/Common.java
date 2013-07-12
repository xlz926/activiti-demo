package com.activiti.demo.web.actions.forms;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public class Common {

	@RequestMapping(value = "/forms/header", method = { RequestMethod.GET, RequestMethod.POST })
	public String getHeader(HttpServletRequest request){
		return "forms/header";
	}
	
	
	@RequestMapping(value = "/forms/toolbar", method = { RequestMethod.GET, RequestMethod.POST })
	public String getToolbar(HttpServletRequest request){
		return "forms/toolbar";
	}
	
	@RequestMapping(value ="/forms/getFormsList",method = { RequestMethod.GET, RequestMethod.POST })
	public String getFormsList(HttpServletRequest request){
		return "forms/formsList";
	}
}
