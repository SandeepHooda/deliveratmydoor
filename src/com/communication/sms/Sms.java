package com.communication.sms;

import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.logging.Logger;

import com.google.appengine.api.urlfetch.FetchOptions;
import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;

import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;
import com.plivo.helper.api.client.*;
import com.plivo.helper.api.response.message.MessageResponse;
import com.plivo.helper.exception.PlivoException;





public class Sms {
	private static String auth_id = "MAZGI2YTKXN2NMNDGWOD";
	private static String auth_token = "ODkyNDZmMGU5YzhlMjhhMzk2NmVjMmVkZTFiYTM1";
	private static final Logger log = Logger.getLogger(Sms.class.getName());
	
	private static FetchOptions lFetchOptions = FetchOptions.Builder.doNotValidateCertificate().setDeadline(300d);
	private static URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();
	
	public static String sendSMS(String sender, String text, List<String> phoneNos) throws UnsupportedEncodingException{
		StringBuilder sb = new StringBuilder();
		for (String phone: phoneNos){
			sb.append(","+phone);
		}
		String receivers = sb.toString();
		receivers = receivers.substring(1);
		String httpsURL  = "http://login.bulksmsgateway.in/sendmessage.php?user=sonuhooda&password=Sandeep@1234&mobile="+receivers+"&message="+ URLEncoder.encode(text, "UTF-8")+"&sender=INVITE&type=3";
		 try {
			
			 	URL url = new URL(httpsURL);
	            HTTPRequest req = new HTTPRequest(url, HTTPMethod.GET, lFetchOptions);
	            HTTPResponse res = fetcher.fetch(req);
	            String responseStr =(new String(res.getContent()));

	            if (responseStr.indexOf("success") >=0){
	            	return "202";
	            }else {
	            	return responseStr;
	            }
	            
	        } catch (Exception e) {
	        	e.printStackTrace();
	        	log.warning("Error in sms sending : "+e.getLocalizedMessage());
	        	return e.getLocalizedMessage();
	        }
		
		
			
	}
	
	public static String sendSMSOld(String sender, String text, List<String> phoneNos){
		log.info(" Sending SMS");
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
            	return "200";
            }else {
            	 log.warning("Error while sending SMS : "+msgResponse.toString());
            	 return msgResponse.toString();
            }
           
        } catch (PlivoException e) {
        	e.printStackTrace();
            System.out.println(e.getLocalizedMessage());
            log.warning("Error while sending SMS : "+e.getLocalizedMessage());
            return e.getLocalizedMessage();
        }
        
	}
	
	public static String sendSMSplivo(String sender, String text, List<String> phoneNos){
		StringBuilder sb = new StringBuilder();
		for (String phone: phoneNos){
			sb.append("<91"+phone);
		}
		String receivers = sb.toString();
		receivers = receivers.substring(1);
		String httpsURL  = "https://api.plivo.com/v1/Account/"+auth_id+"/Message/";
		 try {
			
		        URL url = new URL(httpsURL);
		        String encoding = Base64.getEncoder().encodeToString("MAZGI2YTKXN2NMNDGWOD:ODkyNDZmMGU5YzhlMjhhMzk2NmVjMmVkZTFiYTM1".getBytes("UTF-8"));
	            HTTPRequest req = new HTTPRequest(url, HTTPMethod.POST, lFetchOptions);
	            HTTPHeader header = new HTTPHeader("Content-type", "application/json");
	            req.setHeader(header);
	            
	            header = new HTTPHeader("Authorization", "Basic " + encoding);
	            req.setHeader(header);
	            
	          
	            String data = "{\"src\": \"1111111111\",\"dst\": \""+receivers+"\", \"text\": \""+text+"\"}";
	            req.setPayload(data.getBytes());
	            com.google.appengine.api.urlfetch.HTTPResponse res = fetcher.fetch(req);
	            if (res.getResponseCode() == 202){
	            	return "202";
	            }else {
	            	return new String(res.getContent());
	            }
	            
	        } catch (Exception e) {
	        	e.printStackTrace();
	        	log.warning("Error in sms sending : "+e.getLocalizedMessage());
	        	return e.getLocalizedMessage();
	        }
		
		
			
	}

}
