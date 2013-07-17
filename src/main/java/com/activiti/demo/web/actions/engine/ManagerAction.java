package com.activiti.demo.web.actions.engine;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.activiti.demo.service.engine.EngineManager;
import com.activiti.demo.web.model.engine.DeploymentModel;
import com.activiti.demo.web.model.engine.TaskModel;




@Controller
@RequestMapping("/engine/*")
public class ManagerAction {

	
	
	
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
	public List<DeploymentModel> teplateData(HttpServletRequest request,Model model){
		 List<Deployment> deploymentList = engineManager.repositoryService.createDeploymentQuery().list();
		 List<DeploymentModel> deployList =new ArrayList<DeploymentModel>();
			 for( Deployment deploy :deploymentList){
				 DeploymentModel model1 = new DeploymentModel();
					BeanUtils.copyProperties(deploy, model1);
					deployList.add(model1);
			 }
		return 	deployList;
	}
	
	
	
	
	@RequestMapping(value = "getToDoList", method = { RequestMethod.GET })
	@ResponseBody
	public Map<String,Object> getToDoList(HttpServletRequest request,Model model){
		int start = Integer.parseInt(StringUtils.defaultIfEmpty(request.getParameter("index"), "0")) ;
		int count = Integer.parseInt(StringUtils.defaultIfEmpty(request.getParameter("count"), "6")) ;
		
		List<Task> taskList =engineManager.taskService.createTaskQuery().listPage(start, count);
		 List<TaskModel> taskModelList =new ArrayList<TaskModel>();
		 for( Task task :taskList){
			  TaskModel taskModel = new TaskModel();
				BeanUtils.copyProperties(task, taskModel);
				taskModelList.add(taskModel);
		 }
		 
	 Map<String,Object> result =new HashMap<String, Object>();
		 
		 result.put("toDoCount",engineManager.taskService.createTaskQuery().count());
		 result.put("doneCount", engineManager.historyService.createHistoricTaskInstanceQuery().count());
		 result.put("dataList", taskModelList);
		return result;
	}
	
	
	@RequestMapping(value = "getDoneList", method = { RequestMethod.GET })
	@ResponseBody
	public Map<String,Object> getDoneList(HttpServletRequest request,Model model){
		int start = Integer.parseInt(StringUtils.defaultIfEmpty(request.getParameter("index"), "0")) ;
		int count = Integer.parseInt(StringUtils.defaultIfEmpty(request.getParameter("count"), "6")) ;
		
		List<HistoricTaskInstance> taskList =engineManager.historyService.createHistoricTaskInstanceQuery().finished().listPage(start, count);
		 List<TaskModel> taskModelList =new ArrayList<TaskModel>();
		 for( HistoricTaskInstance task :taskList){
			  TaskModel taskModel = new TaskModel();
				BeanUtils.copyProperties(task, taskModel);
				taskModelList.add(taskModel);
		 }
		 
		 
		 Map<String,Object> result =new HashMap<String, Object>();
		 
		 result.put("toDoCount",engineManager.taskService.createTaskQuery().count());
		 result.put("doneCount", engineManager.historyService.createHistoricTaskInstanceQuery().count());
		 result.put("dataList", taskModelList);
		 
		return result;
	}
	
	
}
