package com.product.vo;

import java.util.List;

public class ProductList {

	private String _id;
	private List<Product> data;
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public List<Product> getData() {
		return data;
	}
	public void setData(List<Product> data) {
		this.data = data;
	}
}
