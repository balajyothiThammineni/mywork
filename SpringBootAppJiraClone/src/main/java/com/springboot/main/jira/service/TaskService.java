package com.springboot.main.jira.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.jira.exception.InvalidIdException;
import com.springboot.main.jira.model.Task;
import com.springboot.main.jira.repository.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	public Task insert(Task task) {
		return taskRepository.save(task);
	}

	public Task getById(int tid) throws InvalidIdException {
		Optional<Task> optional = taskRepository.findById(tid);
		if(!optional.isPresent())
			throw new InvalidIdException("task ID invalid");
		return optional.get();
	}

}