package com.springboot.main.jira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.jira.exception.InvalidIdException;
import com.springboot.main.jira.model.Employee;
import com.springboot.main.jira.model.Project;
import com.springboot.main.jira.model.Task;
import com.springboot.main.jira.model.WorkLog;
import com.springboot.main.jira.service.EmployeeService;
import com.springboot.main.jira.service.ProjectService;
import com.springboot.main.jira.service.TaskService;
import com.springboot.main.jira.service.WorkLogService;

@RestController
public class TaskController {

	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private WorkLogService workLogService;
	
	@PostMapping("/task/{pid}/{eid}")
	public ResponseEntity<?> createTask(@PathVariable("pid") int pid, 
						   @PathVariable("eid") int eid, 
						   @RequestBody Task task) {
		try {
			/* Step 1: fetch project by id */
			Project project = projectService.getByid(pid);
			
			/* Step 2: fetch employee by id */
			Employee employee = employeeService.getById(eid);
			
			/* Step 3: attach project and employee to task */
			task.setEmployee(employee);
			task.setProject(project);
			
			/* Step 4: save task in db */
			task = taskService.insert(task);
			return ResponseEntity.ok().body(task);
		}
		catch(InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	@GetMapping("/worklog/task/employee/{eid}")
	public List<WorkLog> getWorkLogsWithTaskByEmployeeId(@PathVariable("eid") int eid){
		
		return workLogService.getWorkLogsWithTaskByEmployeeId(eid); 
	}
	
	@GetMapping("/worklog/task/{taskID}")
	public List<WorkLog> getWorklogByTaskId(@PathVariable("taskID") int taskId) {
		
		return workLogService.getWorklogByTaskId(taskId);
	}
}