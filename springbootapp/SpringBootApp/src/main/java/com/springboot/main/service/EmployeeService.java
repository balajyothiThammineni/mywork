package com.springboot.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Employee;
import com.springboot.main.repository.EmployeeRepository;
@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;

	public Employee insertEmployee(Employee employee) {
		
		return employeeRepository.save(employee);
		
	}

	public List<Employee> getAllEmployee() {
		
		return employeeRepository.findAll() ;
	}

	public Employee getEmployeeById(int id)throws InvalidIdException {
		Optional<Employee> optional =employeeRepository.findById(id);
		if(!optional.isPresent())
			throw new InvalidIdException("Employee Id Invalid");
		Employee employee =optional.get();
		return employee;
		
		
		
	}

	public Employee deleteEmployeeById(int id) {
		employeeRepository.deleteById(id);
		return null;
	}

}