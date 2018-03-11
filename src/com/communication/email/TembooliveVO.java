package com.communication.email;

import java.util.ArrayList;
import java.util.List;

public class TembooliveVO {
	private String preset = "MyShop";
	private List<TembooliveInputs> inputs = new ArrayList<TembooliveInputs>();
	
	public TembooliveVO(){
		TembooliveInputs input = new TembooliveInputs();
		input.setName("FromAddress");
		input.setValue("myshopemailnotification@gmail.com");
		inputs.add(input);
		
		input = new TembooliveInputs();
		input.setName("Username");
		input.setValue("myshopemailnotification@gmail.com");
		inputs.add(input);
		
		input = new TembooliveInputs();
		input.setName("Password");
		input.setValue("zvnefzvjmfropmig");
		inputs.add(input);
		
		
		input = new TembooliveInputs();
		input.setName("Password");
		input.setValue("zvnefzvjmfropmig");
		inputs.add(input);
		
	}

	public String getPreset() {
		return preset;
	}

	public void setPreset(String preset) {
		this.preset = preset;
	}

	public List<TembooliveInputs> getInputs() {
		return inputs;
	}

	public void setInputs(List<TembooliveInputs> inputs) {
		this.inputs = inputs;
	}
}
