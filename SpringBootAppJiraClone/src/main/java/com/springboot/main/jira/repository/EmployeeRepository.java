package com.springboot.main.jira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.jira.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

}