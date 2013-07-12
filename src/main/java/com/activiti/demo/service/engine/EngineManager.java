package com.activiti.demo.service.engine;

import org.activiti.engine.IdentityService;
import org.activiti.engine.ManagementService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service("engineManager")
public  class EngineManager {

	    
	    @Autowired
	    public RuntimeService runtimeService;
	    
	    @Autowired
	    public RepositoryService repositoryService;
	    
	    @Autowired
	    public IdentityService identityService;
	   
	    
	    @Autowired
	    public TaskService taskService;
	    
	    @Autowired
	    public ManagementService managementService;
	   
	    @Autowired
	    public ProcessEngine processEngine;

	    
	    @Autowired
		protected ProcessEngineConfiguration processEngineConfiguration;
	    
	    public EngineManager(){
	
	    }
	    
	    
	    
	
	
}
