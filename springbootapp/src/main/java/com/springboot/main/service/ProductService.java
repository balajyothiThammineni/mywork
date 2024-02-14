package com.springboot.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Product;
import com.springboot.main.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public Product insert(Product product) {
		return productRepository.save(product);
	}

	public List<Product> getByCategoryIdNativeQuery(int id) {
		
		return productRepository.getByCategoryIdNativeQuery(id);
	}

	public List<Product> getByCategoryIdJpql(int id) {

		return productRepository.getByCategoryIdJpql(id);
	}

	public List<Product> getByCategoryIdJpaInstanceMethod(int id) {
		return productRepository.findByCategoryId(id);
	}

	public List<Product> getByVendorId(int id) {
		return productRepository.findByVendorId(id);
	}

	public Product getById(int productId) throws InvalidIdException {
		Optional<Product> optional = productRepository.findById(productId);
		if(!optional.isPresent()) {
			throw new InvalidIdException("Product ID Invalid");
		}
		return optional.get();
	}

}