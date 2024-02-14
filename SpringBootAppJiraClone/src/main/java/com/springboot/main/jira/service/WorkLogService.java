package com.springboot.main.jira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.jira.model.WorkLog;
import com.springboot.main.jira.repository.WorkLogRepository;

@Service
public class WorkLogService {

	@Autowired
	private WorkLogRepository workLogRepository;
	
	public WorkLog insert(WorkLog workLog) {
		return workLogRepository.save(workLog);
	}

	public List<WorkLog> getWorkLogsWithTaskByEmployeeId(int eid) {
		
		return workLogRepository.findByEmployeeId(eid);
	}

	public List<WorkLog> getWorklogByTaskId(int taskId) {
		
		return workLogRepository.getWorklogByTaskId(taskId);
	}

}