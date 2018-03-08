package com.product.Facade;


import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.product.Response.PlainResponse;
import com.product.Response.ProductResponse;
import com.product.Response.ResponseStatus;
import com.product.Service.ProductService;
import com.product.exception.PasswordMismatch;
import com.product.vo.Product;
import com.product.vo.ProductComparator;

public class ProductFacade {
	
	private ProductService service;
	private static Map<String, String> shopRegistration = new HashMap<>();
	static {
		
		shopRegistration.put("1519981368108", "easy-day-products");
	}

	public ProductResponse getAllProducts(String shopID) {
		ProductResponse response = new ProductResponse();
		List<Product> allProducts = service.getAllProducts(shopRegistration.get(shopID));
		Collections.sort(allProducts, new ProductComparator());
		response.setAllproducts(allProducts);
		
		response.setMaxProductID(allProducts.get(allProducts.size()-1).getInt_id());
		return response;
	}
	
	public ProductResponse updatePassword(String shopID,String passwordOld, String password) throws PasswordMismatch{
		ProductResponse response = new ProductResponse();
		if (!service.getPassword(shopRegistration.get(shopID)).equals(passwordOld)){
			throw new PasswordMismatch("Please enter a valid password");
		}
		service.updatePassword(shopRegistration.get(shopID),  password);
		return response;
	}
	
	public ProductResponse updateProducts(String shopID,String password, List<Product> products) throws PasswordMismatch{
		if (!service.getPassword(shopRegistration.get(shopID)).equals(password)){
			throw new PasswordMismatch("Please enter a valid password");
		}
		ProductResponse response = new ProductResponse();
		service.updateProducts(shopRegistration.get(shopID), products);
		return response;
	}

	public ProductService getService() {
		return service;
	}

	public void setService(ProductService service) {
		this.service = service;
	}

}
