package com.product.EndPoint;

import java.util.List;

import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import com.product.Facade.ProductFacade;
import com.product.exception.PasswordMismatch;
import com.product.vo.Customer;
import com.product.vo.Order;
import com.product.vo.Product;



public class ProductEndpointImpl implements ProductEndpoint {
	private ProductFacade facade;

	@Override
	public Response submitCartOrder( String shopID, Order order){
		try{
			
			return Response.ok().entity(facade.processOrder(shopID, order)).build();
		}catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
	}
	@Override
	public Response getAllProducts(String shopID) {
		
		try{
			return Response.ok().entity(facade.getAllProducts(shopID)).build();
		}catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
		
	}
	
	@Override
	public Response updatePassword(String shopID,  String oldpassword, String password){
		try{
			facade.updatePassword(shopID,oldpassword,password);
			return Response.ok().entity("{\"Password Changed\":\"\"}").build();
			
		}catch(PasswordMismatch e){
			return Response.status(Response.Status.FORBIDDEN).entity("{\"Invalid Password\":\"\"}").build();
			
		}
		catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
	}
	
	@Override
	public Response updateProducts(String shopID, String password, List<Product> products) {
		
		try{
			facade.updateProducts(shopID,password, products);
			return Response.ok().entity(facade.getAllProducts(shopID)).build();
			
		}catch(PasswordMismatch e){
			return Response.status(Response.Status.FORBIDDEN).entity("{\"Invalid Password\":\"\"}").build();
			
		}
		catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
		
	}
	
	@Override
	public Response getAllCustomers(String shopID) {
		
		try{
			return Response.ok().entity(facade.getAllCustomers(shopID)).build();
		}catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
		
	}
	
	@Override
	public Response addCustomer(String shopID, Customer customer){
		try{
			return Response.ok().entity(facade.addCustomer(shopID, customer)).build();
		}catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
	}
	@Override
	public Response deleteCustomer(String shopID,  int customerID){
		try{
			return Response.ok().entity(facade.deleteCustomer(shopID, customerID)).build();
		}catch(Exception e){
			return Response.serverError().entity("Internal Server error").build();
		}
	}
	
	@Override
	public Response sendMessage( String shopID, String password,String mode , String subject, String text){
		try{
			if ("SMS".equalsIgnoreCase(mode)){
				return Response.ok().entity(facade.sendSMS(shopID,password, text)).build();
			}else {
				return Response.ok().entity(facade.sendEmail(shopID,password, subject,text)).build();
			}
			
		}catch(PasswordMismatch e){
			return Response.status(Response.Status.FORBIDDEN).entity("{\"Invalid Password\":\"\"}").build();
			
		}
		catch(Exception e){
			return Response.serverError().entity(e.getMessage()).build();
		}
	}
	@Override
	public Response productNotFoundInformation(String shopID, String productNotFound){
		try{
			
				return Response.ok().entity(facade.productNotFoundInformation(shopID,productNotFound)).build();
			
			
		}
		catch(Exception e){
			return Response.serverError().entity(e.getMessage()).build();
		}
	}
	public ProductFacade getFacade() {
		return facade;
	}

	public void setFacade(ProductFacade facade) {
		this.facade = facade;
	}
	
}
