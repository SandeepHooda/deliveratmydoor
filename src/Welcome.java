

import java.io.IOException;
import java.net.URL;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.communication.email.TembooliveVO;
import com.google.appengine.api.urlfetch.FetchOptions;
import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


/**
 * Servlet implementation class Welcome
 */

public class Welcome extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static FetchOptions lFetchOptions = FetchOptions.Builder.doNotValidateCertificate().setDeadline(300d);
	private static URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Welcome() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		/*System.setProperty("http.proxyHost", "127.0.0.1");
		System.setProperty("https.proxyHost", "127.0.0.1");
		System.setProperty("http.proxyPort", "8888");
		System.setProperty("https.proxyPort", "8888");*/
String httpsURL = "https://api.mailjet.com/v3.1/send";
		
		URL url = new URL(httpsURL);
		 HTTPRequest req = new HTTPRequest(url, HTTPMethod.POST, lFetchOptions);
        HTTPHeader header = new HTTPHeader("Content-type", "application/json");
        req.setHeader(header);
        
      
       
        String encoding = Base64.getEncoder().encodeToString("3b80493548b82c742b0336c646bdcec3:a30913924d4053753b6e2add77f8a26f".getBytes("UTF-8"));
        header = new HTTPHeader("Authorization", "Basic " + encoding);
        req.setHeader(header);
        
      
        String data = "{\"Messages\":[{\"From\":{\"Email\":\"sonu.hooda@gmail.com\", \"Name\": \"Me\" }, \"To\"  :[{\"Email\": \"sonu.hooda@gmail.com\", \"Name\": \"Me\"}], \"Subject\": \"My first Mailjet Email\",    \"TextPart\": \"Greetings from Mailjet.\",\"HTMLPart\":\"Hi\"}]}";
        req.setPayload(data.getBytes());
        com.google.appengine.api.urlfetch.HTTPResponse res = fetcher.fetch(req);
        response.getWriter().println(new String(res.getContent()));
        

		
	}

	

}
