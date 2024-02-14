package com.springboot.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.model.ProductCustomer;
import com.springboot.main.repository.ProductCustomerRepository;

@Service
public class ProductControllerService {

	@Autowired
	private ProductCustomerRepository productCustomerRepository;
	
	public void insert(ProductCustomer pc) {
		productCustomerRepository.save(pc);
	}

}