package com.activiti.demo.service.form;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activiti.demo.domain.form.OaLeave;
import com.activiti.demo.persisitence.form.OaLeaveMapper;


@Service("oaLeaveService")
public class OaLeaveService  implements Formservice<OaLeave> {

	@Autowired
	OaLeaveMapper oaLeaveMapper;
	
	
	public OaLeave saveForm(OaLeave oaLeave) {
		int result = 0;
		if(oaLeave==null){
			return null;
		}
		else if(oaLeave.getBillNo()==null){
			if(oaLeaveMapper.insertOaLever(oaLeave)>0)result++;
			System.out.println(oaLeave.getBillNo());
	    }else{
	    	if(oaLeaveMapper.updateOaLever(oaLeave)>0)result++;
	    }
		return result>0? oaLeave:null;
	}

	public int deleteForm(OaLeave oaLeave) {
		return oaLeaveMapper.deleteOaLever(oaLeave);
	}

	public OaLeave viewForm(OaLeave oaLeave) {

		return null;
	}

	public List<OaLeave> viewForms() {
		return oaLeaveMapper.queryOaLever();
	}








}
