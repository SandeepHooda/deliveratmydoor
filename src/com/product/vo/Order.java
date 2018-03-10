package com.product.vo;

import java.util.List;

public class Order {
	private long _id;
	private Customer customer;
	private List<Product> orderItems;
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public List<Product> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(List<Product> orderItems) {
		this.orderItems = orderItems;
	}
	public long get_id() {
		return _id;
	}
	public void set_id(long _id) {
		this._id = _id;
	}

}
