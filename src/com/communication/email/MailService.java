package com.communication.email;




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

import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
// [END multipart_includes]

import com.product.Facade.ProductFacade;



public class MailService {
	private static final Logger log = Logger.getLogger(ProductFacade.class.getName());
	public boolean sendSimpleMail(String toAddress,  String from, String subject, String body) {
	    
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

	  public boolean sendMultipartMail(String toAddress, String ccAddress,  String from, byte[] attachmentData, String subject, String body) {
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
