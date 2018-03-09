package com.product.vo;

import java.util.ArrayList;
import java.util.List;

public class ProductList {

	private String _id ="productList";
	private List<Product> data;
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public List<Product> getData() {
		if (data == null){
			data = new ArrayList<Product>();
		}
		return data;
	}
	public void setData(List<Product> data) {
		this.data = data;
	}
}
