package com.springboot.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.model.Vendor;
import com.springboot.main.service.VendorService;

@RestController
public class VendorController {
	
	@Autowired
	private VendorService vendorService;
	@PostMapping("/vendor/post")
	public Vendor insertVendor(@RequestBody Vendor vendor) {
		return vendorService.insert(vendor);
	}
	
	@GetMapping("/vendor/getall")
    public List<Vendor> getAllVendor(){
		return vendorService.getAll();
	}
}
