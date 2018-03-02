package com.product.Facade;


import com.product.Response.ProductResponse;
import com.product.Service.ProductService;

public class ProductFacade {
	
	private ProductService service;

	public ProductResponse getPocResponse() {
		ProductResponse response = new ProductResponse();
		response.setShowButtonFlag(service.getPocResponse());
		return response;
	}

	public ProductService getService() {
		return service;
	}

	public void setService(ProductService service) {
		this.service = service;
	}

}
