package com.activiti.demo.service.form;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.activiti.demo.domain.form.FormBase;
import com.activiti.demo.service.engine.EngineManager;
import com.activiti.demo.util.tools.ContextUtil;

@Component
public  class FormContext  {
	
	
	private static final transient Logger logger = LoggerFactory.getLogger(FormContext.class);
	


	private Formservice form;
	
	
	public FormContext(){
		
	}
	
    public FormContext(String beanName){
    	 form = ContextUtil.getBean(beanName,Formservice.class);
	}
	@SuppressWarnings("unchecked")
	public <T extends FormBase> T  saveForm(T model) {
			return (T) form.saveForm(model);
	}

	public <T extends FormBase> void submitForm(T model,String key) {
		this.saveForm(model);
		try {
			EngineManager engineManager = ContextUtil.getBean("engineManager",EngineManager.class) ;
			engineManager.identityService.setAuthenticatedUserId(model.getExactUser().toString());
			engineManager.runtimeService.startProcessInstanceByKey(key, model.getBillNo().toString());
		} catch (Exception e) {
			logger.error(e.toString());
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
	
	
	//签收
	public   void claim(String taskId,String userId){
		EngineManager engineManager = ContextUtil.getBean("engineManager",EngineManager.class) ;
		engineManager.taskService.claim(taskId, userId);
	}
	
	//完成任务
	public  <T extends FormBase> void complete(String taskId, Map<String, Object>  variable,T model){
		this.saveForm(model);
		EngineManager engineManager = ContextUtil.getBean("engineManager",EngineManager.class) ;
		engineManager.taskService.complete(taskId, variable);
	}
	//完成任务,测试用
	public  void complete(String taskId){
		EngineManager engineManager = ContextUtil.getBean("engineManager",EngineManager.class) ;
	    engineManager.taskService.complete(taskId);
	}
	

}
