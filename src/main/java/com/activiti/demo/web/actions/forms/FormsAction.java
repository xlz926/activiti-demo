package com.activiti.demo.web.actions.forms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.activiti.demo.service.form.FormContext;


@Controller
public class FormsAction {
    
	@Autowired
    protected	FormContext formContext;

	public static final String CONTROLLER_ADD_FORM = "addForm", CONTROLLER_SAVE = "save", CONTROLLER_SAVE_PRO = "savePro",CONTROLLER_EDIT_FORM="edit";
    
	
	

}
