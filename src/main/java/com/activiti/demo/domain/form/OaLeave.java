package com.activiti.demo.domain.form;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;



public class OaLeave extends FormBase implements Serializable  {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    private Double days;
    
    
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startTime;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endTime;

    private Long applyUser;


	public Double getDays() {
		return days;
	}
	public void setDays(Double days) {
		this.days = days;
	}
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	public Date getStartTime() {
		return startTime;
	}
	
	
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Long getApplyUser() {
		return applyUser;
	}
	public void setApplyUser(Long applyUser) {
		this.applyUser = applyUser;
	}

}
