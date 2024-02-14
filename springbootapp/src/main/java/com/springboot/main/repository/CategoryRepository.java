package com.springboot.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Integer>  {

	java.util.List<Category> findAll();

	Optional<Category> findById(int cid);

	

}
