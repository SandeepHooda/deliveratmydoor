package com.product.EndPoint;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.product.vo.Product;

@Path("")
public interface ProductEndpoint {
	
	@GET
	@Path("/shopID/{shopID}/allProducts")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getAllProducts(@PathParam("shopID") String shopID);
	
	@PUT
	@Path("/shopID/{shopID}/password/{password}/products")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response updateProducts(@PathParam("shopID") String shopID, @PathParam("password") String password, List<Product> products);
	
	@PUT
	@Path("/shopID/{shopID}/oldpassword/{oldpassword}/password/{password}/pwd")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response updatePassword(@PathParam("shopID") String shopID, @PathParam("oldpassword") String oldpassword, @PathParam("password") String password);
	
	
	@GET
	@Path("/shopID/{shopID}/customers")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getAllCustomers(@PathParam("shopID") String shopID);

}
