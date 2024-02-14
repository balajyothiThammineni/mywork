package com.springboot.main.dto;

 import java.util.List;

public class PurchaseDto {
	private int customerId;
	private List<ProductDto> products;
	
	public static class ProductDto{  //inner class 
		private int productId; 
		private int quantity;
		public int getProductId() {
			return productId;
		}
		public void setProductId(int productId) {
			this.productId = productId;
		}
		public int getQuantity() {
			return quantity;
		}
		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}
		@Override
		public String toString() {
			return "ProductDto [productId=" + productId + ", quantity=" + quantity + "]";
		} 
		
		
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	 
	public List<ProductDto> getProducts() {
		return products;
	}

	public void setProducts(List<ProductDto> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return "PurchaseDto [customerId=" + customerId + ", list=" + products + "]";
	}
	
	
}