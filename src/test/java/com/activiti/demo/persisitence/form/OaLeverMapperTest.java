package com.activiti.demo.persisitence.form;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.activiti.demo.base.spring.SpringTransactionalTestCase;
import com.activiti.demo.domain.form.OaLever;



@ContextConfiguration(locations = { "/applicationContext.xml" })
public class OaLeverMapperTest extends SpringTransactionalTestCase {
    @Autowired
	OaLeverMapper oaLeverMapper;
	
	@Test
	@Rollback(false)
	public void insertOaLever() {
		
		try {
			OaLever oaLever =new OaLever();
			oaLever.setBillNo((long) 111111);
		 System.out.println(oaLeverMapper.insertOaLever(oaLever));	
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		
		
	}

}
