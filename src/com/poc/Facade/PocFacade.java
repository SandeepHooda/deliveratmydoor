package com.poc.Facade;

import com.poc.Response.PocResponse;
import com.poc.Service.PocService;

public class PocFacade {
	
	private PocService service;

	public PocResponse getPocResponse() {
		PocResponse response = new PocResponse();
		response.setShowButtonFlag(service.getPocResponse());
		return response;
	}

	public PocService getService() {
		return service;
	}

	public void setService(PocService service) {
		this.service = service;
	}

}
