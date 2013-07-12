package com.activiti.demo.service.form;

import org.activiti.engine.runtime.ProcessInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activiti.demo.domain.form.OaLeave;
import com.activiti.demo.service.engine.EngineManager;
import com.activiti.demo.util.tools.ContextUtil;

@Service("formContext")
public  class FormContext  {
	
	
	private static final transient Logger logger = LoggerFactory.getLogger(FormContext.class);
	
	@Autowired
	private EngineManager engineManager;
	
	
	public FormContext(){
		
	}
	
	public <T> int  saveForm(String beanName, T model) {
		
		Formservice form= ContextUtil.getBean(beanName,Formservice.class);
		return form.saveForm(model);
		
	}

	public <T> void submitForm(String  beanName,T model,String key) {
	    String businessKey = String.valueOf(this.saveForm(beanName,model)) ;
	
	    ProcessInstance processInstance = engineManager.runtimeService.startProcessInstanceByKey(key, businessKey);
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
