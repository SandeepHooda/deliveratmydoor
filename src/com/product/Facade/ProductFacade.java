package com.product.Facade;


import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import com.communication.email.MailService;
import com.communication.sms.Sms;
import com.product.Response.CommunicationResponse;
import com.product.Response.CustomerResponse;
import com.product.Response.PlainResponse;
import com.product.Response.ProductResponse;
import com.product.Response.ResponseStatus;
import com.product.Service.ProductService;
import com.product.exception.PasswordMismatch;
import com.product.exception.SMSNotSent;
import com.product.vo.Customer;
import com.product.vo.Order;
import com.product.vo.Product;
import com.product.vo.ProductComparator;
import com.product.vo.Registration;

public class ProductFacade {
	private static final Logger log = Logger.getLogger(ProductFacade.class.getName());
	private ProductService service;
	public static Map<String, Registration> shopRegistration = new HashMap<String, Registration>();
	static {
		
		shopRegistration.put("1519981368108", new Registration("easy-day-products", "EasyDay25@gmail.com" , "EasyDay25", "sonu.hooda@gmail.com", "9216411835", false));
	}

	public static String createOderHtml(Order order) {
		int orderTotal = 0;
		
		StringBuilder sb = new StringBuilder();
		sb.append("<div>");
			Customer customer = order.getCustomer();
			sb.append(customer.getfName() +" "+ customer.getlName() +" "+customer.getPhone() + " "+customer.getAddress());
		sb.append("</div>");
		sb.append("<hr width=\"100%\"/>");
		sb.append("<Table>");
		sb.append("<tr><td>ID</td><td>Desc</td><td>Qty</td><td>Image</td></tr>");
		for (Product product: order.getOrderItems()){
			orderTotal += product.getPrice()*product.getQty();
			sb.append("<tr>");
			sb.append("<td>"+product.getInt_id() +"</td><td>"+product.getDesc() + "</td><td>" +product.getQty() +"</td><td>"+ " <img style='width:150px;height:150px;' src='"+product.getImage()+"' /> "+"</td>");
			sb.append("</tr>");
		}
		sb.append("</Table>");
		sb.append("<hr width=\"100%\"/>");
		sb.append("<div>");
		sb.append("<span><b> Total: "+orderTotal+"</b></span>");
		sb.append("</div>");
		
		return sb.toString();
	}
	public CommunicationResponse processOrder(String shopID ,  Order order) {
		log.info("processOrder "  );
		CommunicationResponse communicationResponse = new CommunicationResponse();
		String shopEmail = shopRegistration.get(shopID).getShopEmail();
		String fromLabel = shopRegistration.get(shopID).getShopEmailLabel();
		order.set_id(new Date().getTime());
		String body = createOderHtml( order);
		log.info("Creating HTML body "  );
		System.out.println(body);
		//1. Send email to shop
		log.info("Sending email "  );
			boolean emailSent = new  MailService().sendMultipartMail(shopEmail,null,fromLabel,null, "Customer order" ,body);
			communicationResponse.setEmailSent(emailSent);
			String customerEmail = order.getCustomer().getEmail();
			log.info("Email sent to shop " + emailSent);
		//2. Send confirmation email to customer
			try{
				if (null != customerEmail && customerEmail.length()> 10){
					new  MailService().sendMultipartMail(customerEmail,null,fromLabel,null, "Order Confirmation " ,body);
				}
			}catch(Exception e){
				log.warning("Could not send order confirmation to customer "+e.getLocalizedMessage());
			}
			
			
			try{
		//3. Send SMS to customer
			if (shopRegistration.get(shopID).isSmsEnabled()){
				int orderTotal = 0;
				for (Product product: order.getOrderItems()){
					orderTotal += product.getPrice()*product.getQty();
				}
				List<String> phoneNos = new ArrayList<String>();
				phoneNos.add(order.getCustomer().getPhone());
				Sms.sendSMS(shopRegistration.get(shopID).getSmsSenderID(), " We have received your order totaling Rs: "+orderTotal, phoneNos);
			}
			}catch(Exception e){
				log.warning("Could not send SMS to customer "+e.getLocalizedMessage());
			}
		
		// Save order in DB	
			log.info("Saving order in db "  );
		service.saveOrder(shopRegistration.get(shopID).getShopName()+"-orders", order);
		log.info("Saving order in db "  );
		communicationResponse.setMessage("https://api.whatsapp.com/send?phone=917837025599&text=https://deliveratmydoor.appspot.com/OrderDetails?shopID="+shopID+"%26orderNO="+order.get_id());
		return communicationResponse;
	}
	public ProductResponse getAllProducts(String shopID) {
		ProductResponse response = new ProductResponse();
		List<Product> allProducts = service.getAllProducts(shopRegistration.get(shopID).getShopName());
		Collections.sort(allProducts, new ProductComparator());
		response.setAllproducts(allProducts);
		
		if (allProducts.size() > 0){
			response.setMaxProductID(allProducts.get(allProducts.size()-1).getInt_id());
		}
		
		return response;
	}
	public CustomerResponse getAllCustomers(String shopID) {
		CustomerResponse response = new CustomerResponse();
		List<Customer> customerList = service.getAllCustomers(shopRegistration.get(shopID).getShopName());
		
		response.setCustomerList(customerList);
		
		return response;
	}
	
	public CustomerResponse addCustomer(String shopID, Customer customer){
		service.addCustomer(shopRegistration.get(shopID).getShopName(), customer);
		return getAllCustomers(shopID);
	}
	
	public CustomerResponse deleteCustomer(String shopID, int  customerID){
		service.deleteCustomer(shopRegistration.get(shopID).getShopName(), customerID);
		return getAllCustomers(shopID);
	}
	
	
	public ProductResponse updatePassword(String shopID,String passwordOld, String password) throws PasswordMismatch{
		ProductResponse response = new ProductResponse();
		if (!service.getPassword(shopRegistration.get(shopID).getShopName()).equals(passwordOld)){
			throw new PasswordMismatch("Please enter a valid password");
		}
		service.updatePassword(shopRegistration.get(shopID).getShopName(),  password);
		return response;
	}
	
	public ProductResponse updateProducts(String shopID,String password, List<Product> products) throws PasswordMismatch{
		if (!service.getPassword(shopRegistration.get(shopID).getShopName()).equals(password)){
			throw new PasswordMismatch("Please enter a valid password");
		}
		ProductResponse response = new ProductResponse();
		service.updateProducts(shopRegistration.get(shopID).getShopName(), products);
		return response;
	}
	
	public CommunicationResponse sendSMS(String shopID, String text) throws SMSNotSent, UnsupportedEncodingException{
		CommunicationResponse communicationResponse = new CommunicationResponse();
		List<Customer> customerList = service.getAllCustomers(shopRegistration.get(shopID).getShopName());
		List<String> phoneNos = new ArrayList<String>();
		for (Customer cust: customerList){
			phoneNos.add(cust.getPhone());
		}
		String response = Sms.sendSMS(shopRegistration.get(shopID).getSmsSenderID(), text, phoneNos);
		if ("202".equals(response)){
			communicationResponse.setMessage("SUCCESS");
		}else {
			throw new SMSNotSent(response);
		}
			
		
		return communicationResponse;
		
	}
	
	public CommunicationResponse sendEmail(String shopID, String text) throws SMSNotSent, UnsupportedEncodingException{
		log.info("Sending email to registered customers");
		
		CommunicationResponse communicationResponse = new CommunicationResponse();
		List<Customer> customerList = service.getAllCustomers(shopRegistration.get(shopID).getShopName());
		List<String> emails = new ArrayList<String>();
		for (Customer cust: customerList){
			if (null != cust.getEmail() && cust.getEmail().length()> 10){
				emails.add(cust.getEmail());
			}
			
		}
		String from = shopRegistration.get(shopID).getShopEmailLabel();
		for (String toAddress: emails){
			new  MailService().sendSimpleMail(toAddress,from , from,text);
		}
		
		
		communicationResponse.setMessage("SUCCESS");
		
			
		
		return communicationResponse;
		
	}

	public ProductService getService() {
		return service;
	}

	public void setService(ProductService service) {
		this.service = service;
	}

}
