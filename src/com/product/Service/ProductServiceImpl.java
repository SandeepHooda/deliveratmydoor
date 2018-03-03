package com.product.Service;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.product.vo.Product;
import com.product.vo.ProductList;

import mangodb.MangoDB;


public class ProductServiceImpl implements ProductService {

	@Override
	public List<Product> getAllProducts(String shopName){
		String productsStr = MangoDB.getData(shopName, shopName,MangoDB.mlabKeySonu );
		Gson  json = new Gson();
		ProductList productList = json.fromJson(productsStr, new TypeToken<ProductList>() {}.getType());
		return productList.getData();
	}

}
