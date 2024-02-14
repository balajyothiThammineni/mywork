package com.springboot.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.main.model.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

	@Query(value="select * from product where category_id=?1",nativeQuery = true)
	List<Product> getByCategoryIdNativeQuery(int id);
	
	@Query("select p from Product p where p.category.id=?1")
	List<Product> getByCategoryIdJpql(int id);
	
	List<Product> findByCategoryId(int id);
	
	List<Product> findBySellerId(int id);

	List<Product> findByVendorId(int id);
}