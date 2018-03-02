package com.product.Response;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ResponseStatus {
	
	private String statusCode = "0";
	private String statusDesc = "";
	private String bacomsTermId = "0";
	private int uniqueErrorCode;

	/**
	 * Initializer method to create success response The JSON structure for
	 * success will be "responseStatus" : { "statusCode" : "0", "statusDesc" :
	 * "SUCCESS", "uniqueErrorCode" : "SPC0" }
	 * 
	 * @return
	 */
	public static ResponseStatus createSuccessStatus() {
		return new ResponseStatus("SUCCESS");
	}

	/**
	 * 
	 * @param type
	 */
	private ResponseStatus(String type) {
		if (type.equals("SUCCESS")) {
			this.statusCode = "0";
			this.uniqueErrorCode = 0;
			// this.statusDesc = type.getDescription();
		} else {
			throw new IllegalArgumentException(
					"Use the constructor that accepts error id. Every response with error should have a unique error id");
		}
	}
	
	public String toString() {
		String str = null;
		try {

			ObjectMapper mapper = new ObjectMapper();
			str = mapper.writeValueAsString(this);
		} catch (Exception ex) {
			
			str = "Un expected error";
		}
		return str;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusDesc() {
		return statusDesc;
	}

	public void setStatusDesc(String statusDesc) {
		this.statusDesc = statusDesc;
	}

	public String getBacomsTermId() {
		return bacomsTermId;
	}

	public void setBacomsTermId(String bacomsTermId) {
		this.bacomsTermId = bacomsTermId;
	}

	public int getUniqueErrorCode() {
		return uniqueErrorCode;
	}

	public void setUniqueErrorCode(int uniqueErrorCode) {
		this.uniqueErrorCode = uniqueErrorCode;
	}

	}

