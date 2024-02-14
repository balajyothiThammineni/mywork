package com.springboot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
