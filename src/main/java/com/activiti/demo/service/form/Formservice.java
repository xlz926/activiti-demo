package com.activiti.demo.service.form;

import java.util.List;



public interface Formservice<T> {

	
	int saveForm(T t);

	int deleteForm(T t);
	
	T viewForm(T t);
	
	List<T> viewForms();
   
	
	
}
