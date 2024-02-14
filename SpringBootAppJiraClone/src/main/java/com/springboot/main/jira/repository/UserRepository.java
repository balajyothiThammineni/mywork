package com.springboot.main.jira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.jira.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	User findByUsername(String username);

}