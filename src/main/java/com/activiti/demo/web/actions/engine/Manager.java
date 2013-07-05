package com.activiti.demo.web.actions.engine;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.repository.Deployment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.activiti.demo.service.engine.EngineManager;




@Controller
@RequestMapping("/engine/*")
public class Manager {

	
	
	
	@Resource
	protected EngineManager engineManager;
	
	@RequestMapping(value = "deployment", method = { RequestMethod.POST })
	@ResponseBody
	public String deployment(HttpServletRequest request,Model model) throws IOException{
		if (request instanceof MultipartHttpServletRequest) {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			for(MultipartFile multipartFile :multipartRequest.getFiles("templateFile")){
				if(!multipartFile.isEmpty()){
					engineManager.repositoryService.createDeployment()
					.addInputStream(multipartFile.getOriginalFilename(), multipartFile.getInputStream()).deploy();
				}
			}
		}
		return "部署成功";
		
	}
	
	
	
	
	@RequestMapping(value = "addTemplate", method = { RequestMethod.GET })
	public String addTemplate(HttpServletRequest request,Model model){
		return "engine/editTemplate";
	}
	
	
	@RequestMapping(value = "listTemplate", method = { RequestMethod.GET })
	public String index(HttpServletRequest request,Model model){
		return "engine/listTemplate";
	}
	@RequestMapping(value = "dataTemplate", method = { RequestMethod.GET,RequestMethod.POST })
	@ResponseBody
	public List<Deployment> teplateData(HttpServletRequest request,Model model){
		 List<Deployment> result = engineManager.repositoryService.createDeploymentQuery().list();
		
		return 	result;
	}
	
	
}
