package com.activiti.demo.service.engine;

import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;





public abstract class AbstractManager {

	    
	    @Autowired
	    public RuntimeService runtimeService;
	    
	    @Autowired
	    public RepositoryService repositoryService;
	    
	    @Autowired
	    public IdentityService identityService;
	  

	    public AbstractManager(){
	
	    }
	    
	    
	    
	
	
}
