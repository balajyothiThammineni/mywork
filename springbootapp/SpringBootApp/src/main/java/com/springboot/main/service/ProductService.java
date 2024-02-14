package com.springboot.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.springboot.main.model.Product;
import com.springboot.main.repository.ProductRepository;

import java.util.List;
@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;

	public Product insert(Product product) {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	public List<Product> getByCategoryIdNativeQuery(int id) {
		
		return productRepository.getByCategoryIdNativeQuery(id);
	}

	public List<Product> getByCategoryIdJpql(int id) {
		// TODO Auto-generated method stub
		return productRepository.getByCategoryIdJpql(id);
	}

	public List<Product> getByCategoryIdJpaInstanceMethod(int id) {
		
		return productRepository.findByCategoryId(id);
	}

}