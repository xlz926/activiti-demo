package com.activiti.demo.persisitence.form;


import java.util.List;

import com.activiti.demo.domain.form.OaLeave;




public interface OaLeaveMapper {

	int insertOaLever(OaLeave oaLeave);
	
	int updateOaLever(OaLeave oaLeave);
	
    int	deleteOaLever(OaLeave oaLeave);
    
    OaLeave singleOaLever(OaLeave oaLeave);
	
	List<OaLeave> queryOaLever();
	
}
