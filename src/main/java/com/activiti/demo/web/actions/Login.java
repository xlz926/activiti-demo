package com.activiti.demo.web.actions;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.activiti.engine.impl.persistence.entity.UserEntity;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.activiti.demo.service.engine.org.UserService;
import com.activiti.demo.util.tools.SpyMemcachedClient;

@Controller
public class Login {

	private UserService userService;

	@Resource
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Autowired
	private SpyMemcachedClient memcachedClient;
	
	@RequestMapping(value = "/login", method = { RequestMethod.GET })
	public String getLogin(HttpServletRequest request, HttpSession session, Model model) {
		return "login";
	}

	@RequestMapping(value = "/login", method = { RequestMethod.POST })
	public String setLogin(HttpServletRequest request, HttpSession session, Model model) {
		String userId = String.valueOf(request.getParameter("username"));
		String password = String.valueOf(request.getParameter("password"));
		boolean	flag = userService.identityService.checkPassword(userId, password);
		if (flag) {
			UsernamePasswordToken token = new UsernamePasswordToken(userId, password);
			Subject user = SecurityUtils.getSubject();
			user.login(token);
			return "index";
		} else {
			return "login";
		}
	}
	
	@RequestMapping(value = "/logout", method = { RequestMethod.GET })
	public String logout(HttpServletRequest request, HttpSession session, Model model) {
		UserEntity entity = (UserEntity)SecurityUtils.getSubject().getPrincipal();
		memcachedClient.delete(entity.getId());
		SecurityUtils.getSubject().logout();
		return "login";
	}
}
