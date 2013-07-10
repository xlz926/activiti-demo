package com.activiti.demo.domain.form;

import java.io.Serializable;
import java.util.Date;



public class OaLever implements Serializable  {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long billNo;
    private Double days;
    private Date startTime;
    private Date endTime;
    private Long exactUser;
    private Long applyUser;
    private Date updateTime;
    private Date creatTime;
	public Long getBillNo() {
		return billNo;
	}
	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}
	public Double getDays() {
		return days;
	}
	public void setDays(Double days) {
		this.days = days;
	}
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
	public Long getExactUser() {
		return exactUser;
	}
	public void setExactUser(Long exactUser) {
		this.exactUser = exactUser;
	}
	public Long getApplyUser() {
		return applyUser;
	}
	public void setApplyUser(Long applyUser) {
		this.applyUser = applyUser;
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
