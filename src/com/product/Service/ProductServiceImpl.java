package com.product.Service;

import java.util.Iterator;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.product.vo.Customer;
import com.product.vo.CustomersList;
import com.product.vo.Password;
import com.product.vo.Product;
import com.product.vo.ProductList;

import mangodb.MangoDB;


public class ProductServiceImpl implements ProductService {

	@Override
	public List<Product> getAllProducts(String shopName){
		String productsStr = MangoDB.getADocument(shopName, shopName,"productList", MangoDB.mlabKeySonu );
		Gson  json = new Gson();
		ProductList productList = json.fromJson(productsStr, new TypeToken<ProductList>() {}.getType());
		return productList.getData();
	}
	
	@Override
	public List<Customer> getAllCustomers(String shopName){
		String customersStr = MangoDB.getADocument(shopName, shopName,"customersList", MangoDB.mlabKeySonu );
		Gson  json = new Gson();
		CustomersList customersList = json.fromJson(customersStr, new TypeToken<CustomersList>() {}.getType());
		return customersList.getData();
	}
	@Override
	public void addCustomer(String shopName, Customer customer){
		String customersStr = MangoDB.getADocument(shopName, shopName,"customersList", MangoDB.mlabKeySonu );
		Gson  json = new Gson();
		CustomersList customersList = json.fromJson(customersStr, new TypeToken<CustomersList>() {}.getType());
		int maxID = 0; 
		for (Customer cus: customersList.getData()){
			if (maxID < cus.getCusID()){
				maxID = cus.getCusID();
			}
		}
		maxID++;
		customer.setCusID(maxID);
		String phone = customer.getPhone();
		if (null != phone){
			phone = phone.replaceAll("[^\\d.]", "");
			if (phone.length()> 10){
				int trimExcess = phone.length() -10;
				phone = phone.substring(trimExcess);
			}
			customer.setPhone(phone);
		}
		
		
		customersList.getData().add(customer);
		String updateData = json.toJson(customersList, new TypeToken<CustomersList>() {}.getType());
		MangoDB.insertOrUpdateData(shopName, shopName,updateData, MangoDB.mlabKeySonu, customersList.get_id() );
		
	}
	@Override
	public void deleteCustomer(String shopName, int customerID){
		String customersStr = MangoDB.getADocument(shopName, shopName,"customersList", MangoDB.mlabKeySonu );
		Gson  json = new Gson();
		CustomersList customersList = json.fromJson(customersStr, new TypeToken<CustomersList>() {}.getType());
		Iterator<Customer> itr = customersList.getData().iterator();
		while(itr.hasNext()){
			Customer cus =itr.next();
			if (cus.getCusID() == customerID){
				itr.remove();
			}
		}
		String updateData = json.toJson(customersList, new TypeToken<CustomersList>() {}.getType());
		MangoDB.insertOrUpdateData(shopName, shopName,updateData, MangoDB.mlabKeySonu, customersList.get_id() );
	}
	@Override
	public String getPassword(String shopName){
		String jsonStr = MangoDB.getADocument(shopName, shopName,"password", MangoDB.mlabKeySonu );
		Gson  json = new Gson();
		Password pwd = json.fromJson(jsonStr, new TypeToken<Password>() {}.getType());
		return pwd.getValue();
	}
	@Override
	public void updatePassword(String shopName, String password){
		Password pass = new Password();
		pass.setValue(password);
		Gson  json = new Gson();
		
		String updateData = json.toJson(pass, new TypeToken<Password>() {}.getType());
		MangoDB.insertOrUpdateData(shopName, shopName,updateData, MangoDB.mlabKeySonu, pass.get_id() );
	}
	@Override
	public void updateProducts(String shopName, List<Product> products){
		ProductList productList = new ProductList();
		productList.set_id("productList");
		productList.setData(products);;
		Gson  json = new Gson();
		String updateData = json.toJson(productList, new TypeToken<ProductList>() {}.getType());
		MangoDB.insertOrUpdateData(shopName, shopName,updateData, MangoDB.mlabKeySonu, productList.get_id() );
	}

}
