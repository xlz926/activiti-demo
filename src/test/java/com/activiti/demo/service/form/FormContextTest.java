package com.activiti.demo.service.form;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.activiti.demo.base.spring.SpringTransactionalTestCase;
import com.activiti.demo.domain.form.OaLeave;



@ContextConfiguration(locations = { "/applicationContext.xml" })
public class FormContextTest extends SpringTransactionalTestCase {

	
	@Autowired
    protected	FormContext formContext;
	
	@Test
	@Rollback(false)
	public void saveForm() {
		try {
			OaLeave  oa =new OaLeave();
			oa.setDays((double) 5);
			formContext.saveForm("oaLeaveService", oa );
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
