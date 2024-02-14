package com.springboot.main.jira.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.jira.exception.InvalidIdException;
import com.springboot.main.jira.model.Employee;
import com.springboot.main.jira.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	public Employee insert(Employee employee) {
		
		return employeeRepository.save(employee);
	}

	public Employee getById(int eid) throws InvalidIdException {
		Optional<Employee> optional = employeeRepository.findById(eid);
		if(!optional.isPresent())
			throw new InvalidIdException("Eid invalid");
		return optional.get();
	}

}