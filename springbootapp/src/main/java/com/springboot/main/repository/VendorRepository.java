package com.springboot.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {

	Vendor save(Vendor vendor);

	Optional<Vendor> findById(int vid);

	List<Vendor> findAll();

}
