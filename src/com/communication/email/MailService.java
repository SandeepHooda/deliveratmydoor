package com.communication.email;




import java.util.Base64;

// [START simple_includes]

import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
// [END simple_includes]

// [START multipart_includes]
import java.io.InputStream;
import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;

import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
// [END multipart_includes]

import com.google.appengine.api.urlfetch.FetchOptions;
import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.product.Facade.ProductFacade;
import com.product.vo.CustomersList;



public class MailService {
	private static final Logger log = Logger.getLogger(ProductFacade.class.getName());
	
	private static FetchOptions lFetchOptions = FetchOptions.Builder.doNotValidateCertificate().setDeadline(300d);
	private static URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();
	
	
	public boolean sendSimpleMail(String toAddress,  String from, String subject, String body, String attachmentName, String attachment) {
	    
		String httpsURL  = "https://myshop.temboolive.com/temboo-api/1.0/choreos/Library/Google/Gmail/SendEmail";
		 try {
			
		        URL url = new URL(httpsURL);
		        
		        TembooliveVO emailVO = new TembooliveVO();
		        
		        TembooliveInputs input = new TembooliveInputs();
				input.setName("ToAddress");
				input.setValue(toAddress);
				emailVO.getInputs().add(input);
				
				input = new TembooliveInputs();
				input.setName("Subject");
				input.setValue(subject);
				emailVO.getInputs().add(input);
				
				input = new TembooliveInputs();
				input.setName("MessageBody");
				input.setValue(body);
				emailVO.getInputs().add(input);
				
				if (null != attachmentName){
					
					input = new TembooliveInputs();
					input.setName("AttachmentName");
					input.setValue(attachmentName);
					emailVO.getInputs().add(input);
					
					input = new TembooliveInputs();
					input.setName("Attachment");
					input.setValue(attachment);
					emailVO.getInputs().add(input);
					
				}
				
		       
	            HTTPRequest req = new HTTPRequest(url, HTTPMethod.POST, lFetchOptions);
	            HTTPHeader header = new HTTPHeader("Content-type", "application/json");
	            req.setHeader(header);
	            
	            header = new HTTPHeader("x-temboo-domain", "/myshop/master");
	            req.setHeader(header);
	            
	            header = new HTTPHeader("Accept", "application/json");
	            req.setHeader(header);
	           
	            String encoding = Base64.getEncoder().encodeToString("myFirstApp:wGxu7fOTeYRij4DdMrB7TLjAyXbqKfC0".getBytes("UTF-8"));
	            header = new HTTPHeader("Authorization", "Basic " + encoding);
	            req.setHeader(header);
	            
	            Gson  json = new Gson();
	            String data = json.toJson(emailVO, new TypeToken<TembooliveVO>() {}.getType());
	            req.setPayload(data.getBytes());
	            com.google.appengine.api.urlfetch.HTTPResponse res = fetcher.fetch(req);
	            if (res.getResponseCode() == 200){
	            	return true;
	            }else {
	            	log.warning("Email sending failed "+(new String(res.getContent())));
	            	return false;
	            }
	            
	            
	        } catch (Exception e) {
	        	e.printStackTrace();
	        	log.warning("Error in sms sending : "+e.getLocalizedMessage());
	        	return false;
	        }
	  }
	public boolean sendSimpleMail_Gmail(String toAddress,  String from, String subject, String body) {
	    
	    Properties props = new Properties();
	    Session session = Session.getDefaultInstance(props, null);

	    try {
	      Message msg = new MimeMessage(session);
	      msg.setFrom(new InternetAddress("kusum.hooda@gmail.com", from));
	      msg.addRecipient(Message.RecipientType.TO,
	                       new InternetAddress(toAddress, ""));
	      msg.setSubject(subject);
	      msg.setText(body);
	      Transport.send(msg);
	      return true;
	    } catch (AddressException e) {
	      // ...
	    } catch (MessagingException e) {
	      // ...
	    } catch (UnsupportedEncodingException e) {
	      // ...
	    }
	    return false;
	    // [END simple_example]
	  }

	  public boolean sendMultipartMail_Gmail(String toAddress, String ccAddress,  String from, byte[] attachmentData, String subject, String body) {
		  log.info("toAddress " +toAddress +" ccAddress "+" from "+from +" subject "+subject  );
		  log.info(" body "+body  );
	    Properties props = new Properties();
	    Session session = Session.getDefaultInstance(props, null);

	    String msgBody = "...";

	    try {
	      Message msg = new MimeMessage(session);
	      msg.setFrom(new InternetAddress("kusum.hooda@gmail.com", from));
	      msg.addRecipient(Message.RecipientType.TO,
	                       new InternetAddress(toAddress, ""));
	      if (null != ccAddress){
	    	  msg.addRecipient(Message.RecipientType.CC,
	                  new InternetAddress(ccAddress, ""));
	      }
	     
	      msg.setSubject(subject);
	      msg.setText(msgBody);

	      // [START multipart_example]
	      String htmlBody = body;          // ...
	     
	      Multipart mp = new MimeMultipart();

	      MimeBodyPart htmlPart = new MimeBodyPart();
	      htmlPart.setContent(htmlBody, "text/html");
	      mp.addBodyPart(htmlPart);

	      if (null != attachmentData){
	    	  MimeBodyPart attachment = new MimeBodyPart();
		      InputStream attachmentDataStream = new ByteArrayInputStream(attachmentData);
		      attachment.setFileName("sales.pdf");
		      attachment.setContent(attachmentDataStream, "application/pdf");
		      mp.addBodyPart(attachment);
	      }
	     

	      msg.setContent(mp);
	      // [END multipart_example]

	      Transport.send(msg);
	      return true;
	    } catch (AddressException e) {
	    	e.printStackTrace();
		     log.warning(" Error "+e.getLocalizedMessage());
	    } catch (MessagingException e) {
	    	e.printStackTrace();
		     log.warning(" Error "+e.getLocalizedMessage());
	    } catch (UnsupportedEncodingException e) {
	    	e.printStackTrace();
		     log.warning(" Error "+e.getLocalizedMessage());
	    }catch (Exception e) {
	    	e.printStackTrace();
		     log.warning(" Error "+e.getLocalizedMessage());
		    }
	    
	    return false;
	  }
	

}
