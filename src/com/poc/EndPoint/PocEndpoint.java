package com.poc.EndPoint;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/poc")
public interface PocEndpoint {
	
	@GET
	@Path("/pocendpoint")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getPocResponse();

}
