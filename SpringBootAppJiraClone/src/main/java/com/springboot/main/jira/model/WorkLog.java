package com.springboot.main.jira.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class WorkLog {
 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id; 
	
	@OneToOne
	private Employee employee; //findByEmployeeId(eid)
	
	@OneToOne
	private Task task;  //findByTaskId(tid)
	
	private String log;  //findByLog(log)
	
	private LocalDate logDate; //findByLogDate(logDate)

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	public String getLog() {
		return log;
	}

	public void setLog(String log) {
		this.log = log;
	}

	public LocalDate getLogDate() {
		return logDate;
	}

	public void setLogDate(LocalDate logDate) {
		this.logDate = logDate;
	}
	
	
	
}