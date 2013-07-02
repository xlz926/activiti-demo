package com.activiti.demo.web.actions;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.activiti.engine.identity.User;
import org.activiti.engine.impl.persistence.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.activiti.demo.service.engine.org.UserService;




@Controller
public class Login {

	  
	
	private UserService  userService;
	
	@Resource
	public void setUserService(UserService userService) {
		this.userService = userService;
	}


	@RequestMapping(value = "/login", method = { RequestMethod.GET })
	public String getLogin(HttpServletRequest request,HttpSession session,Model model) {
		return "login";
	}
	
	
	@RequestMapping(value = "/login", method = { RequestMethod.POST })
	public String setLogin(HttpServletRequest request,HttpSession session,Model model) {
	    if(userService.identityService.checkPassword((String) request.getAttribute("username"), (String) request.getAttribute("password"))){	
	    	session.setAttribute("userName", request.getAttribute("username"));
	    		return "index";
	    	}else{
	    		return "index";
	    	}
	}
	
	
	
}
