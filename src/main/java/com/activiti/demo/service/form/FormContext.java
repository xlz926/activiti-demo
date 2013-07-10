package com.activiti.demo.service.form;

import org.springframework.stereotype.Service;

@Service("formContext")
public  class FormContext  {

	
	public FormContext(){
		
	}
	
	public <T> void  saveForm(Formservice save, T model) {
		save.saveForm(model);
	}

	public void submitForm(Formservice submit) {
	
		
	}
	
	

}
