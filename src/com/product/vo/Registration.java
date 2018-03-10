package com.product.vo;

public class Registration {

	private String shopName;
	private String smsSenderID;
	private String shopEmail;
	private String shopEmailLabel;
	private String shopPhoneNo;
	private boolean smsEnabled;
	public Registration(String shopName, String smsSenderID,  String shopEmailLabel, String shopEmail,  String shopPhoneNo, boolean smsEnabled){
		this.shopName = shopName;
		if (smsSenderID.length() > 11){
			smsSenderID = smsSenderID.substring(0, 11);
		}
		this.smsSenderID = smsSenderID;
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
	
}
