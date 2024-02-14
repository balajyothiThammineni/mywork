package com.springboot.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.model.Category;
import com.springboot.main.service.CategoryService;

@RestController
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	@PostMapping("/category/post")
	public Category insertCategory(@RequestBody Category category) {
		return categoryService.insert(category);
	}
	
	@GetMapping("/category/getall")
    public List<Category> getAllCategory(){
		return categoryService.getAll();
	}
}
