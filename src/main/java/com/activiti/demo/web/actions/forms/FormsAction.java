package com.activiti.demo.web.actions.forms;

import org.springframework.beans.factory.annotation.Autowired;

import com.activiti.demo.service.form.Formservice;
import com.activiti.demo.service.form.FormContext;
import com.activiti.demo.util.tools.ContextUtil;
import com.activiti.demo.web.model.engine.OaLeverModel;

public class FormsAction {
    
	@Autowired
	FormContext context;


    public void SaveForm(String name){
    
    	OaLeverModel oaLeverModel=new OaLeverModel();
    	//context.saveForm(ContextUtil.getService(name,Formservice.class), oaLeverModel);
    	
    }
    
}
