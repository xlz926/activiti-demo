package com.activiti.demo.web.actions.forms;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.activiti.demo.base.spring.SpringTransactionalTestCase;
import com.activiti.demo.service.form.FormContext;
import com.activiti.demo.service.form.Formservice;
import com.activiti.demo.util.tools.ContextUtil;
import com.activiti.demo.web.model.engine.OaLeverModel;


@ContextConfiguration(locations = { "/applicationContext.xml" })
public class FormsActionTest extends SpringTransactionalTestCase{

	/*@Autowired
	UserService context;*/
	
	 @Autowired
	 FormContext context;
	
	@Test
	public void SaveForm() {

    	try {
			OaLeverModel oaLeverModel= new OaLeverModel();
			context.saveForm(ContextUtil.getService("oaLeverService",Formservice.class), oaLeverModel);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
