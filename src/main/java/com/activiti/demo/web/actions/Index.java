package com.activiti.demo.web.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.impl.context.Context;
import org.activiti.spring.ProcessEngineFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public  class Index {
     

	@RequestMapping(value = "/index", method = { RequestMethod.GET, RequestMethod.POST })
	public String userIndex(HttpServletRequest request,HttpSession session,Model model) {
		System.out.println("___________________________");
		return "index";
	}
	
	
}
