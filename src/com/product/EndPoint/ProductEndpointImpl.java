package com.product.EndPoint;

import javax.ws.rs.core.Response;

import com.product.Facade.ProductFacade;



public class ProductEndpointImpl implements ProductEndpoint {
	private ProductFacade facade;

	@Override
	public Response getAllProducts(String shopID) {
		
		try{
			return Response.ok().entity(facade.getAllProducts(shopID)).build();
		}catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
		
	}

	public ProductFacade getFacade() {
		return facade;
	}

	public void setFacade(ProductFacade facade) {
		this.facade = facade;
	}
	
}
