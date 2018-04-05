package com.product.vo;

public class Registration {

	private String shopName;
	private String shopEmail;
	private String shopEmailLabel;
	private String shopPhoneNo;
	private boolean smsEnabled;
	private String emailAppPassword;
	public Registration(String shopName,  String shopEmailLabel, String shopEmail,  String emailAppPassword , String shopPhoneNo, boolean smsEnabled){
		this.shopName = shopName;
		this.emailAppPassword = emailAppPassword;
		this.shopEmail = shopEmail;
		this.shopEmailLabel = shopEmailLabel;
		this.shopPhoneNo = shopPhoneNo;
		this.smsEnabled = smsEnabled;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
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
	public String getShopEmailLabel() {
		return shopEmailLabel;
	}
	public void setShopEmailLabel(String shopEmailLabel) {
		this.shopEmailLabel = shopEmailLabel;
	}
	public boolean isSmsEnabled() {
		return smsEnabled;
	}
	public void setSmsEnabled(boolean smsEnabled) {
		this.smsEnabled = smsEnabled;
	}
	public String getEmailAppPassword() {
		return emailAppPassword;
	}
	public void setEmailAppPassword(String emailAppPassword) {
		this.emailAppPassword = emailAppPassword;
	}
	
}
