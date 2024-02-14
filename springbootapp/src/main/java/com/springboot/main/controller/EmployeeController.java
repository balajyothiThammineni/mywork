package com.springboot.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Employee;
import com.springboot.main.service.EmployeeService;

@RestController
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/employee/post")
	public Employee insertEmployee(@RequestBody Employee employee) {
		
		return employeeService.insertEmployee(employee);
		
	}
	@GetMapping("/employee/all")
	public List<Employee> getAllEmployee() {
		
		List<Employee> list = employeeService.getAllEmployee();
		
		return list;
	}
	
	@GetMapping("/employee/one/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable("id")int id) throws InvalidIdException {
		
		try {
			Employee employee = employeeService.getEmployeeById(id);
			return ResponseEntity.ok().body(employee);
		}
		catch (InvalidIdException e) {
		
			return ResponseEntity.badRequest().body(e.getMessage());
			
		}
	}
		@PutMapping("/employee/update/{id}")
		public ResponseEntity<?> updateEmployee(@PathVariable("id")int id,
		 @RequestBody Employee newEmployee) {		
			
			try {
				Employee employee = employeeService.getEmployeeById(id);
				if(newEmployee.getName()!=null)
					employee.setName(newEmployee.getName());
				if(newEmployee.getCity()!=null)
					employee.setCity(newEmployee.getCity());
				if(newEmployee.getSalary()!=0)
					employee.setSalary(newEmployee.getSalary());
				
				employee= employeeService.insertEmployee(employee);
				return ResponseEntity.ok(employee);
			}
			catch (InvalidIdException e) {
			
				return ResponseEntity.badRequest().body(e.getMessage());
				
			}
		
		
		
	}
	
	

}