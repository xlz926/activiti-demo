package com.activiti.demo.web.model.engine;

import java.util.Date;

import org.activiti.engine.repository.Deployment;

public class DeploymentModel implements Deployment {

	private String id;
 	
	private String category;
	
	private String name;
	
	private Date deploymentTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Date getDeploymentTime() {
		return deploymentTime;
	}

	public void setDeploymentTime(Date deploymentTime) {
		this.deploymentTime = deploymentTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	





}
