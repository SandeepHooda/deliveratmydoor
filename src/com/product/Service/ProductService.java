package com.product.Service;

import java.util.List;

import com.product.vo.Customer;
import com.product.vo.Product;

public interface ProductService {

	public List<Product> getAllProducts(String shopName);
	public List<Customer> getAllCustomers(String shopName);
	public void addCustomer(String shopID, Customer customer);
	public void deleteCustomer(String shopID, int customerID);
	public void updateProducts(String shopID, List<Product> products);
	public String getPassword(String shopID);
	public void updatePassword(String shopID,String  password);

}
