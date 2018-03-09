package com.product.vo;

public class Registration {

	private String shopName;
	private String smsSenderID;
	private String shopEmail;
	private String shopPhoneNo;
	public Registration(String shopName, String smsSenderID, String shopEmail, String shopPhoneNo){
		this.shopName = shopName;
		if (smsSenderID.length() > 11){
			smsSenderID = smsSenderID.substring(0, 11);
		}
		this.smsSenderID = smsSenderID;
		this.shopEmail = shopEmail;
		this.shopPhoneNo = shopPhoneNo;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getSmsSenderID() {
		return smsSenderID;
	}
	public void setSmsSenderID(String smsSenderID) {
		this.smsSenderID = smsSenderID;
	}
	public String getShopEmail() {
		return shopEmail;
	}
	public void setShopEmail(String shopEmail) {
		this.shopEmail = shopEmail;
	}
	public String getShopPhoneNo() {
		return shopPhoneNo;
	}
	public void setShopPhoneNo(String shopPhoneNo) {
		this.shopPhoneNo = shopPhoneNo;
	}
}
