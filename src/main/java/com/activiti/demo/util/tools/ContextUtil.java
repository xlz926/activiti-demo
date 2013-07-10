package com.activiti.demo.util.tools;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
@Component("contextUtil")
public class ContextUtil implements ApplicationContextAware {

	private static ApplicationContext applicationContext;
	
	public ApplicationContext getApplicationContext() {
		return applicationContext;
	}
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
	}
	public static <T> T getService(String name,Class<T> cls) {
		return applicationContext.getBean(name,cls);
	}
}
