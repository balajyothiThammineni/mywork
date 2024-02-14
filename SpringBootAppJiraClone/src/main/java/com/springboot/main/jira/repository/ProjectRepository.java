package com.springboot.main.jira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.jira.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer>{

}