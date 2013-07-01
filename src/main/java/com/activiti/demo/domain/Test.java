package com.activiti.demo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;



@Entity
@Table(name = "test")
public class Test {
 
	
	public int Id;
	
	@Column
	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}
}
