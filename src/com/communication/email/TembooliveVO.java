package com.communication.email;

import java.util.ArrayList;
import java.util.List;

public class TembooliveVO {
	
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
		input.setValue("qjbhsxospzlclngc");
		inputs.add(input);
		
		
		
		
	}


	public List<TembooliveInputs> getInputs() {
		return inputs;
	}

	public void setInputs(List<TembooliveInputs> inputs) {
		this.inputs = inputs;
	}
}
