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
	
	
	public int saveForm(OaLeave oaLeave) {
		int result = 0;
		if(oaLeave==null){
			return 0;
		}
		else if(oaLeave.getBillNo()==null){
			result =  oaLeaveMapper.insertOaLever(oaLeave);
			System.out.println(oaLeave.getBillNo());
	    }else{
	      return oaLeaveMapper.updateOaLever(oaLeave);
	    }
		return result;
	}

	public int deleteForm(OaLeave oaLeave) {
		return oaLeaveMapper.deleteOaLever(oaLeave);
	}

	public OaLeave viewForm(OaLeave oaLeave) {

		return null;
	}

	public List<OaLeave> viewForms() {
		// TODO Auto-generated method stub
		return null;
	}








}
