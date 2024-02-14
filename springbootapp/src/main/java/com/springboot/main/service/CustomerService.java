package com.springboot.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Customer;
import com.springboot.main.repository.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	public Customer insert(Customer custmomer) {
		return customerRepository.save(custmomer);
	}

	public Customer getById(int customerId) throws InvalidIdException {
		Optional<Customer> optional = customerRepository.findById(customerId);
		if(!optional.isPresent()) {
			throw new InvalidIdException("Customer ID Invalid");
		}
		return optional.get();
	}

}