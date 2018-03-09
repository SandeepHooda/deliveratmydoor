package com.product.Response;

import java.util.List;

import com.product.vo.Customer;

public class CustomerResponse {
	private List<Customer> customerList;

	public List<Customer> getCustomerList() {
		return customerList;
	}

	public void setCustomerList(List<Customer> customerList) {
		this.customerList = customerList;
	}

}
