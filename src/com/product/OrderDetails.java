package com.product;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.product.Facade.ProductFacade;
import com.product.vo.Order;
import com.product.vo.Product;
import com.product.vo.ProductList;

import mangodb.MangoDB;

/**
 * Servlet implementation class OrderDetails
 */

public class OrderDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderDetails() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try{
			String shopID = request.getParameter("shopID");
			String orderNO = request.getParameter("orderNO");
			String shopName = ProductFacade.shopRegistration.get(shopID).getShopName();
			shopName +="-orders";
			String orderStr = MangoDB.getADocument(shopName, shopName,orderNO, false, MangoDB.mlabKeySonu );
			Gson  json = new Gson();
			Order order   = json.fromJson(orderStr, new TypeToken<Order>() {}.getType());
			
			
			response.getWriter().append(ProductFacade.createOderHtml(order)).append(request.getContextPath());
		}catch (Exception e){
			response.getWriter().append("Could not fetch details for your order.").append(request.getContextPath());
		}
		
	}

	

}
