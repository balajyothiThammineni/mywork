package com.springboot.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Category;
import com.springboot.main.model.Product;
import com.springboot.main.model.Vendor;
import com.springboot.main.service.CategoryService;
import com.springboot.main.service.ProductService;
import com.springboot.main.service.VendorService;

@RestController
public class ProductController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private VendorService vendorService;
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/product/add/{cid}/{vid}")
	public ResponseEntity<?> insertProduct(@PathVariable("cid") int cid,
			@PathVariable("vid") int vid,
			@RequestBody Product product){
		try {
			//Step1 : Go to service and fetch Category obj/
			Category categoryobj=categoryService.getById(cid);
			
			//step2 go to service and fetch vendor obj by id/
			Vendor vendorObj = vendorService.getById(vid);
			
			//Setp3 Attach categoryobj and vendorobj to product/
			product.setCategory(categoryobj);
			product.setVendor(vendorObj);
			
			//step4 save the product/
			product=productService.insert(product);
			return ResponseEntity.ok().body(product);			
		}catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/product/category/{cid}")
	public ResponseEntity<?> getByCategoryid(@PathVariable("cid") int cid){
		///step1 go to service and fetch category obj by id/
		try {
			Category categoryObj =categoryService.getById(cid);
			//List<Product> list = productService.getByCategoryIdNativeQuery(categoryObj.getId());
			//List<Product> list = productService.getByCategoryIdJpql(categoryObj.getId());
			List<Product> list = productService.getByCategoryIdJpaInstanceMethod(categoryObj.getId());
			return ResponseEntity.ok().body(list);
		}catch(InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
