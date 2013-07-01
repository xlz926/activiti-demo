package com.activiti.demo.persisitence;

import org.springframework.data.repository.CrudRepository;

import com.activiti.demo.domain.Test;


public interface TestDao extends CrudRepository<Test,Long>{

}
