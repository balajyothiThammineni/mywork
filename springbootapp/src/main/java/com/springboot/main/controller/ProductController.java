package com.springboot.main.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.dto.PurchaseDto;
import com.springboot.main.dto.PurchaseDto.ProductDto;
import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Category;
import com.springboot.main.model.Customer;
import com.springboot.main.model.Product;
import com.springboot.main.model.ProductCustomer;
import com.springboot.main.model.Vendor;
import com.springboot.main.service.CategoryService;
import com.springboot.main.service.CustomerService;
import com.springboot.main.service.ProductControllerService;
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
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private ProductControllerService productControllerService;
	
	@PostMapping("/product/add/{cid}/{vid}")
	public ResponseEntity<?> insertProduct(@PathVariable("cid") int cid,
							  @PathVariable("vid") int vid,
							  @RequestBody Product product) {
		try {
			/* Step 1: Go to service and fetch Category Object by Id */
			Category categoryObj = categoryService.getById(cid);
			
			/* Step 2: Go to service and fetch Vendor Object by Id */
			Vendor vendorObj = vendorService.getById(vid);
			
			/*Step 3: Attach categoryObj and vendorObj to product */
			product.setCategory(categoryObj);
			product.setVendor(vendorObj);
			
			/* Step 4: Save the product */
			product = productService.insert(product);
			return ResponseEntity.ok().body(product);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/product/category/{cid}")
	public ResponseEntity<?> getByCategoryId(@PathVariable("cid") int cid){
		/* Step 1: Go to service and fetch Category Object by Id */
		try {
			Category categoryObj = categoryService.getById(cid);
			//List<Product> list= productService.getByCategoryIdNativeQuery(categoryObj.getId());
			//List<Product> list= productService.getByCategoryIdJpql(categoryObj.getId());
			List<Product> list= productService.getByCategoryIdJpaInstanceMethod(categoryObj.getId());
			return ResponseEntity.ok().body(list);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		  
	}
	
	
	
	@GetMapping("/product/vendor/{vid}")
	public ResponseEntity<?> getByVendorId(@PathVariable("vid") int vid) {
		/* Step 1: Go to service and fetch Vendor Object by Id */
		try {
			Vendor vendor = vendorService.getById(vid);
			List<Product> list= productService.getByVendorId(vendor.getId());
			return ResponseEntity.ok().body(list);

		}
		catch(InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}
	@PostMapping("/product/purchase")
	public ResponseEntity<?> purchaseProduct(@RequestBody PurchaseDto dto) {
		 int customerId = dto.getCustomerId();
		 /* Fetch customerObj by id */
		try {
			Customer customer = customerService.getById(customerId);
			for(ProductDto pDto : dto.getProducts()) {
				int productId = pDto.getProductId();
				Product product = productService.getById(productId);
				ProductCustomer pc = new ProductCustomer(); 
				pc.setProduct(product);
				pc.setCustomer(customer);
				pc.setDateOfPurchase(LocalDate.now());
				pc.setInvoiceNo("IN " + ((int)(Math.random() *10000)));
				pc.setQuantity(pDto.getQuantity());
				pc.setAmount(product.getPrice() * pDto.getQuantity());
				productControllerService.insert(pc);
			}
			 return ResponseEntity.ok().body("Purchase processed successfully");
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
		
	}
}












