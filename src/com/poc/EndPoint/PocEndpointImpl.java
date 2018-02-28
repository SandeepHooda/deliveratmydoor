package com.poc.EndPoint;

import javax.ws.rs.core.Response;

import com.poc.Facade.PocFacade;

public class PocEndpointImpl implements PocEndpoint {
	private PocFacade facade;

	@Override
	public Response getPocResponse() {
		
		
		return Response.ok().entity(facade.getPocResponse()).build();
	}

	public PocFacade getFacade() {
		return facade;
	}

	public void setFacade(PocFacade facade) {
		this.facade = facade;
	}
	
}
