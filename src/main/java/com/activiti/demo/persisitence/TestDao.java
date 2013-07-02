package com.activiti.demo.persisitence;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import com.activiti.demo.domain.TestModel;


@Component
public interface TestDao extends CrudRepository<TestModel,Long>{

}
