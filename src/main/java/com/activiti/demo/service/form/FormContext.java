package com.activiti.demo.service.form;

import java.util.List;

import org.activiti.engine.runtime.ProcessInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.activiti.demo.domain.form.FormBase;
import com.activiti.demo.service.engine.EngineManager;
import com.activiti.demo.util.tools.ContextUtil;

public  class FormContext  {
	
	
	private static final transient Logger logger = LoggerFactory.getLogger(FormContext.class);
	
	@Autowired
	private EngineManager engineManager;
	
	private Formservice form;
	
	
	public FormContext(){
		
	}
	
    public FormContext(String beanName){
    	 form= ContextUtil.getBean(beanName,Formservice.class);
	}
	public <T extends FormBase> T  saveForm(T model) {
			return (T) form.saveForm(model);
	}

	public <T extends FormBase> void submitForm(T model,String key) {
		this.saveForm(model);
		
		
		try {
			engineManager.identityService.setAuthenticatedUserId(model.getExactUser().toString());
			engineManager.runtimeService.startProcessInstanceByKey(key, model.getBillNo().toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public void auditForm() {
	
		
	}

	public void backForm() {
		
		
	}

	public void focusForm() {
		// TODO Auto-generated method stub
		
	}

	public void signatureForm() {
		// TODO Auto-generated method stub
		
	}

	public void deleteForm() {
		// TODO Auto-generated method stub
		
	}

	
	

}
