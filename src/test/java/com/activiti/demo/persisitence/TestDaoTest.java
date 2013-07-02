package com.activiti.demo.persisitence;

import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.activiti.demo.base.spring.SpringTransactionalTestCase;
import com.activiti.demo.domain.TestModel;


@ContextConfiguration(locations = { "/applicationContext-test.xml" })
public class TestDaoTest extends SpringTransactionalTestCase {

	
/*	@Autowired
	private TestDao testDao;*/
	
	private TestModel testModel =new TestModel();
	
	
	@PersistenceContext
	private EntityManager em;
	
	@Test
	@Rollback(false)
	public void test() {
		
/*		testModel.setName("fdfd");
		testDao.save(testModel);
		
		em.flush();
		
		testModel =testDao.findOne(testModel.getId());
		assertNotNull(testModel);
*/	
	}

}
