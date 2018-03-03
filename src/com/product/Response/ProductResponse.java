package com.product.Response;

import java.util.List;

import com.product.vo.Product;

public class ProductResponse {
	private List<Product> allproducts;

	public List<Product> getAllproducts() {
		return allproducts;
	}

	public void setAllproducts(List<Product> allproducts) {
		this.allproducts = allproducts;
	}
	
	

	
}
