package com.product.vo;

import java.util.Comparator;

public class ProductComparator implements Comparator<Product> {

	@Override
	public int compare(Product o1, Product o2) {
		return o1.getInt_id() - o2.getInt_id();
		//sorting must be assending order else "response.setMaxProductID" won't work in facade
		
	}

}
