APP.SERVICES.service ('appData',['$window','dataRestore',
    function( $window,dataRestore){
	this.cartItems = [];
	this.offerItems = [];
	this.getShopID = function () {
		return "1519981368108";
	}
	this.getHost = function () {
		var host = "https://deliveratmydoor.appspot.com";
		/*if ($window.location.host == ""){
			host = "phone";
			host = "https://deliveratmydoor.appspot.com";
		}else*/ if ($window.location.host.indexOf("localhost:8080") >=0 ){
			host = "";
		}
		return host;
	}
	this.getOfferItems = function(){
		return this.offerItems;
	}
	this.setOfferItems = function(offerItems){
		this.offerItems = offerItems;
	}
	this.getCartItems = function(){
		return this.cartItems;
	}
	this.addToCart = function (product, qty){
		let newItem = true;
		for (let i=0;i<this.cartItems.length;i++){
			if (this.cartItems[i]._id == product._id){
				this.cartItems[i].qty += qty;
				newItem = false;
			}
		}
		if (newItem){
			product.qty = qty;
			this.cartItems.push(product);
		}
		 window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
	}
	
	this.updateCart = function (product, qty){
		
		for (let i=0;i<this.cartItems.length;i++){
			if (this.cartItems[i]._id == product._id){
				this.cartItems[i].qty = qty;
				if (qty <=0){
					//splice is safe here as at a time only one item removed in whole iteration 
					this.cartItems.splice(i,1);
				}
			}
		}
		
		 window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
	}
	
	if ($window.localStorage.getItem("cartItems")){
		this.cartItems = dataRestore.getFromCache('cartItems','obj')
	}
	
}

]);