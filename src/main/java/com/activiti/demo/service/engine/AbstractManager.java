package com.activiti.demo.service.engine;

import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.impl.context.Context;
import org.activiti.spring.ProcessEngineFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;





public abstract class AbstractManager {

	    @Autowired
	    public ProcessEngineFactoryBean processEngineFactoryBean;
	    
	    @Autowired
	    public RuntimeService runtimeService;
	    
	    @Autowired
	    public RepositoryService repositoryService;
	    
	    @Autowired
	    public IdentityService identityService;
	  

	    public AbstractManager(){
	    	
			Context.setProcessEngineConfiguration(processEngineFactoryBean.getProcessEngineConfiguration());

	    }
	    
	    
	    
	
	
}
