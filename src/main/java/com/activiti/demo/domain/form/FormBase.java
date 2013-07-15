package com.activiti.demo.domain.form;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class FormBase implements Serializable {
	private Long billNo;

	
    private Long exactUser;
    
    
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updateTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date creatTime;

	
	
	public Long getExactUser() {
		return exactUser;
	}

	public void setExactUser(Long exactUser) {
		this.exactUser = exactUser;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}
	

	
	
	
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Date getCreatTime() {
		return creatTime;
	}

	public void setCreatTime(Date creatTime) {
		this.creatTime = creatTime;
	}
}
