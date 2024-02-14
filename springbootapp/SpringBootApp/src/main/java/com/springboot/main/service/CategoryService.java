package com.springboot.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Category;
import com.springboot.main.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;

	public Category insert(Category category) {
		return categoryRepository.save(category);
	}

	public List<Category> getAll() {
		
		return categoryRepository.findAll();	}

	public Category getById(int cid) throws InvalidIdException {
		Optional<Category> optional = categoryRepository.findById(cid);
		if(!optional.isPresent()) {
			throw new InvalidIdException("Category id Invalid");
		}
		return optional.get();
	}
	
	

	

}
