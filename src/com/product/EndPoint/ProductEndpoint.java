package com.product.EndPoint;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("")
public interface ProductEndpoint {
	
	@GET
	@Path("/shopID/{shopID}/allProducts")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getAllProducts(@PathParam("shopID") String shopID);

}
