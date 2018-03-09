package com.product.Service;

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
