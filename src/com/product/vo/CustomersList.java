package com.product.vo;

import java.util.List;

public class CustomersList {
	
	private String _id ="customersList";
	private List<Customer> data;
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public List<Customer> getData() {
		return data;
	}
	public void setData(List<Customer> data) {
		this.data = data;
	}

}
