package com.activiti.demo.service.engine;

import org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.activiti.engine.impl.db.DbSqlSession;
import org.activiti.engine.impl.db.DbSqlSessionFactory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.activiti.demo.base.spring.SpringTransactionalTestCase;



@ContextConfiguration(locations = { "/applicationContext.xml" })
public class EngineManagerTest  extends SpringTransactionalTestCase{
    
	
	@Autowired
	EngineManager  engineManager;
	
	
	@Test
	public void getNextId() {
		try {
			ProcessEngineConfigurationImpl peci = (ProcessEngineConfigurationImpl)engineManager.processEngineConfiguration;
			DbSqlSessionFactory dbSqlSessionFactory = (DbSqlSessionFactory) peci.getSessionFactories().get(DbSqlSession.class);
			 dbSqlSessionFactory.getIdGenerator().getNextId();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
