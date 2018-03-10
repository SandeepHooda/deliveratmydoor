package com.product.vo;

public class Product {
	private int int_id;
	private String _id;
	private String image;
	private String desc;
	private String type;
	private int price;
	private String offer = null;
	private int qty;
	private String productStatus = "Active";//Active //Out of stock // discontinued
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getOffer() {
		return offer;
	}
	public void setOffer(String offer) {
		this.offer = offer;
	}
	public String getProductStatus() {
		return productStatus;
	}
	public void setProductStatus(String productStatus) {
		this.productStatus = productStatus;
	}
	public int getInt_id() {
		this.int_id = Integer.parseInt(_id);
		return int_id;
	}
	public void setInt_id(int int_id) {
		this.int_id = int_id;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}

}
