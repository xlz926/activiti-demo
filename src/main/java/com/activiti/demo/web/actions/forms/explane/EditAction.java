package com.activiti.demo.web.actions.forms.explane;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/forms/explane/*")
public class EditAction {
	
	
	@RequestMapping(value = "edit", method = { RequestMethod.GET, RequestMethod.POST })
	public String eidtForm(HttpServletRequest request,Model model){
		
		model.addAttribute("billNo", "自动生成");
		
		model.addAttribute("permission", "011111");
		return "forms/explane/editform";
	}
    
	@RequestMapping(value = "add", method = { RequestMethod.GET, RequestMethod.POST })
	public String addForm(HttpServletRequest request ){
		return "forms/explane/editform";
	}
}
