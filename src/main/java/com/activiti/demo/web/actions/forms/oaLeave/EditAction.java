package com.activiti.demo.web.actions.forms.oaLeave;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.identity.User;
import org.activiti.engine.impl.persistence.entity.UserEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.activiti.demo.domain.form.OaLeave;
import com.activiti.demo.service.engine.EngineManager;
import com.activiti.demo.service.form.FormContext;
import com.activiti.demo.web.actions.forms.FormsAction;


@Controller
@RequestMapping("/forms/oaLeave/*")
public class EditAction extends FormsAction {
	
    private static final String formPageUrl ="forms/oaLeave/editform";
	
  
    protected	FormContext formContext = new FormContext("oaLeaveService") ;
    
	@RequestMapping(value = CONTROLLER_EDIT_FORM, method = { RequestMethod.GET, RequestMethod.POST })
	public String editForm(HttpServletRequest request,Model model){
		return 	formPageUrl;
	}
    
	@RequestMapping(value = CONTROLLER_ADD_FORM, method = { RequestMethod.GET, RequestMethod.POST })
	public String addForm(HttpServletRequest request ){
		return formPageUrl;
	}
	
	@RequestMapping(value = CONTROLLER_SAVE, method = { RequestMethod.GET, RequestMethod.POST })
	public String saveForm(HttpServletRequest request ,OaLeave oaLeave){
		formContext.saveForm(oaLeave);
		return "/index";
	}
    
	
	@RequestMapping(value = CONTROLLER_SAVE_PRO, method = { RequestMethod.GET, RequestMethod.POST })
	public String saveProForm(HttpServletRequest request ,OaLeave oaLeave){
		oaLeave.setExactUser((long) 104000200);
		formContext.submitForm(oaLeave, "OALeave");
		return "/index";
	}
	
	@RequestMapping(value = "complateTask", method = { RequestMethod.GET, RequestMethod.POST })
	public String complateTask(HttpServletRequest request ,@RequestParam("taskId") String taskId){
		formContext.complete(taskId);
		return "/index";
	}

}
