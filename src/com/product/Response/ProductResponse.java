package com.product.Response;

import java.util.List;

import com.product.vo.Product;

public class ProductResponse {
	private List<Product> allproducts;
	private int maxProductID;

	public List<Product> getAllproducts() {
		return allproducts;
	}

	public void setAllproducts(List<Product> allproducts) {
		this.allproducts = allproducts;
	}

	public int getMaxProductID() {
		return maxProductID;
	}

	public void setMaxProductID(int maxProductID) {
		this.maxProductID = maxProductID;
	}
	
	

	
}
