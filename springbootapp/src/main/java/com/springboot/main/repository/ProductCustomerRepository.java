package com.springboot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.ProductCustomer;

public interface ProductCustomerRepository extends JpaRepository<ProductCustomer, Integer>{

}