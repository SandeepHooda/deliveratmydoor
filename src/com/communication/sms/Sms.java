package com.communication.sms;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.logging.Logger;

import com.plivo.helper.api.client.*;
import com.plivo.helper.api.response.message.MessageResponse;
import com.plivo.helper.exception.PlivoException;



public class Sms {
	private static String auth_id = "MAZGI2YTKXN2NMNDGWOD";
	private static String auth_token = "ODkyNDZmMGU5YzhlMjhhMzk2NmVjMmVkZTFiYTM1";
	private static final Logger log = Logger.getLogger(Sms.class.getName());
	
	public static int sendSMS(String sender, String text, List<String> phoneNos){
		
		RestAPI api = new RestAPI(auth_id, auth_token, "v1");
		StringBuilder sb = new StringBuilder();
		for (String phone: phoneNos){
			sb.append("<91"+phone);
		}
		String receivers = sb.toString();
		receivers = receivers.substring(1);
		LinkedHashMap<String, String> parameters = new LinkedHashMap<String, String>();
        parameters.put("src", "9216411835"); // Alphanumeric Sender ID
        parameters.put("dst", receivers); // Receiver's phone number with country code
        parameters.put("text", text); // Your SMS text message
        try {
            // Send the messages
            MessageResponse msgResponse = api.sendMessage(parameters);
            if (msgResponse.serverCode == 202){
            	log.info(" SMS Sent");
            	return 200;
            }else {
            	 log.warning("Error while sending SMS : "+msgResponse.toString());
            }
           
        } catch (PlivoException e) {
        	e.printStackTrace();
            System.out.println(e.getLocalizedMessage());
            log.warning("Error while sending SMS : "+e.getLocalizedMessage());
        }
        return 500;
	}

}
