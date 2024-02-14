package com.springboot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.springboot.main.model.Employee;

@Component
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

}
