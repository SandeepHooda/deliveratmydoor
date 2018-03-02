package com.product.EndPoint;

import javax.ws.rs.core.Response;

import com.product.Facade.ProductFacade;



public class ProductEndpointImpl implements ProductEndpoint {
	private ProductFacade facade;

	@Override
	public Response getPocResponse() {
		
		
		return Response.ok().entity(facade.getPocResponse()).build();
	}

	public ProductFacade getFacade() {
		return facade;
	}

	public void setFacade(ProductFacade facade) {
		this.facade = facade;
	}
	
}
