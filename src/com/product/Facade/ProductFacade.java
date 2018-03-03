package com.product.Facade;


import java.util.HashMap;
import java.util.Map;

import com.product.Response.ProductResponse;
import com.product.Service.ProductService;

public class ProductFacade {
	
	private ProductService service;
	private static Map<String, String> shopRegistration = new HashMap<>();
	static {
		
		shopRegistration.put("1519981368108", "easy-day-products");
	}

	public ProductResponse getAllProducts(String shopID) {
		ProductResponse response = new ProductResponse();
		response.setAllproducts(service.getAllProducts(shopRegistration.get(shopID)));
		return response;
	}

	public ProductService getService() {
		return service;
	}

	public void setService(ProductService service) {
		this.service = service;
	}

}
