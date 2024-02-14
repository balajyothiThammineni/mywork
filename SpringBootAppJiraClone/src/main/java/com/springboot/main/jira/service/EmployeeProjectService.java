package com.springboot.main.jira.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.jira.model.EmployeeProject;
import com.springboot.main.jira.repository.EmployeeProjectRepository;

@Service
public class EmployeeProjectService {

	@Autowired
	private EmployeeProjectRepository employeeProjectRepository;
	
	public EmployeeProject insert(EmployeeProject employeeProject) {
		
		return employeeProjectRepository.save(employeeProject);
	}

}