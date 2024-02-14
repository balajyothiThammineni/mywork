package com.springboot.main.jira.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.jira.exception.InvalidIdException;
import com.springboot.main.jira.model.Employee;
import com.springboot.main.jira.model.Task;
import com.springboot.main.jira.model.WorkLog;
import com.springboot.main.jira.service.EmployeeService;
import com.springboot.main.jira.service.TaskService;
import com.springboot.main.jira.service.WorkLogService;

@RestController
public class WorkLogController {

	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private WorkLogService workLogService;
	
	@PostMapping("/worklog/add/{eid}/{tid}")
	public ResponseEntity<?> insert(@PathVariable("eid") int eid,
					   @PathVariable("tid") int tid, 
					   @RequestBody WorkLog workLog) {
		
		try {
		/* Step 1: get Employee by eid */
		Employee employee = employeeService.getById(eid);
		
		/* Step 2: get Task by tid */
		Task task =  taskService.getById(tid);
		
		/* Step 3: Attach task and employee with worklog */
		workLog.setEmployee(employee);
		workLog.setTask(task);
		
		/* Step 4: save the worklog */
		workLog = workLogService.insert(workLog);
		return ResponseEntity.ok().body(workLog);

		}
		catch(InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}
}