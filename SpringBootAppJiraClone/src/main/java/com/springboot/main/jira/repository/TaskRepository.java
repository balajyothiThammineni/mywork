package com.springboot.main.jira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.jira.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer>{

}