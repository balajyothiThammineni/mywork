package com.springboot.main.jira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.jira.model.EmployeeProject;

public interface EmployeeProjectRepository extends JpaRepository<EmployeeProject,Integer>{

}