// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var APP = {};
APP.DIRECTIVE = angular.module('allDirective',[]);
APP.CONTROLLERS = angular.module('allControllers',[]);
APP.SERVICES = angular.module('allServices',[]);
APP.FACTORY = angular.module('allFact',[]);
APP.DEPENDENCIES = ['allControllers',
                    'allServices',
                    'allDirective',
                    'allFact'
                    ];
APP.OTHERDEPENDENCIES = ['ionic','ngCordova','ionic-numberpicker'];
angular.module('starter', APP.DEPENDENCIES.concat(APP.OTHERDEPENDENCIES))
.config(['$urlRouterProvider','$stateProvider','$ionicConfigProvider',
         function($urlRouterProvider,$stateProvider,$ionicConfigProvider){
	$ionicConfigProvider.tabs.position('bottom');
	 // setup an abstract state for the tabs directive
				$stateProvider.state('menu',{
					url:'/menu',
					abstract: true,
					templateUrl:'menu.html'	
					 
					
				}).state('menu.address',{
					url:'/address',
					templateUrl: 'address/address.html',
					controller: 'CTRL_ADDRESS'
				}).state('menu.tab',{
					url:'/tab',
					abstract: true,
					templateUrl:'tabs.html'	
					 
					
				}).state('menu.tab.home',{
					url:'/home',
					views: {
						 'tab-home': {
						 templateUrl: 'home/home.html',
						 controller: 'CTRL_HOME'
						 }
					}	
					
				}).state('menu.tab.checkout',{
					url:'/checkout',
					views: {
						 'tab-checkout': {
						 templateUrl: 'checkout/checkout.html',
						 controller: 'CTRL_CheckOut'
						 }
					}	
					
				}).state('menu.tab.cart',{
					url:'/cart',
					views: {
						 'tab-cart': {
						 templateUrl: 'cart/cart.html',
						 controller: 'CTRL_Cart'
						 }
					}	
					
				}).state('menu.tab.confirmation',{
					url:'/confirmation',
					views: {
						 'tab-confirmation': {
						 templateUrl: 'confirmation/confirmation.html',
						 controller: 'CTRL_confirmation'
						 }
					}	
					
				}).state('menu.tab.offers',{
					url:'/offers',
					views: {
						 'tab-offers': {
						 templateUrl: 'offers/offers.html',
						 controller: 'CTRL_offers'
						 }
					}	
					
				}).state('menu.tab.admin',{
					url:'/admin',
					views: {
						 'tab-admin': {
						 templateUrl: 'admin/admin.html',
						 controller: 'CTRL_admin'
						 }
					}	
					
				}).state('menu.tab.add',{
					url:'/add',
					views: {
						 'tab-add': {
						 templateUrl: 'add/add.html',
						 controller: 'CTRL_add'
						 }
					}	
					
				})
				$urlRouterProvider.otherwise('/menu/tab/home');
			}
         ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
;APP.CONTROLLERS.controller ('CTRL_add',['$scope','dataRestore', '$ionicLoading','$http','appData', '$ionicPopup',
    function($scope, dataRestore, $ionicLoading,$http,appData,$ionicPopup ){
	var theCtrl = this;
	$scope.myData = {}
	$scope.newCustomer = {};
	var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }
	 $scope.getAllCustomers = function(){
		  $scope.showBusy();
		   $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/customers')
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.myData.customerList = response.data.customerList;
		  			
					
				},
				function(response){
					 $scope.hideBusy();
					
					
				});
		  
		}
	
	$scope.addNewCustomer = function(){
		 
		if(!$scope.newCustomer.fName || !$scope.newCustomer.lName  || !$scope.newCustomer.address || !$scope.newCustomer.phone){
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Missing Required fields',
			     template: 'Please enter First name, Last name, Address and Phone number before proceeding.'
			   });
			 confirmPopup.then(function(res) {
			  });
			return;
		}
		$scope.showBusy();
		$http.put(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/customers/', $scope.newCustomer, config)
  		.then(function(response){
  			 $scope.hideBusy();
  			$scope.myData.customerList = response.data.customerList;
  			var confirmPopup = $ionicPopup.confirm({
			     title: 'Details saved successfully',
			     template: 'New customer details added.'
			   });
			 confirmPopup.then(function(res) {
			  });
			 
  		},
		function(response){
  			$scope.hideBusy();
  			appData.showErrorMessage(response.status);
			
		});
	}
	$scope.whatsApp = function(phoneNo){
		window.open("https://api.whatsapp.com/send?phone=91"+phoneNo+"&text="+encodeURIComponent($scope.myData.MessageToCustomers),"_blank");
	}
	$scope.sendMessage =  function(mode){
		 
		if(!$scope.myData.MessageToCustomers){
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Nothing to send',
			     template: 'Please enter the message that you wnat to send.'
			   });
			 confirmPopup.then(function(res) {
			  });
			return;
		}
		$scope.showBusy();
		$http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/mode/'+mode+'/message/'+$scope.myData.MessageToCustomers)
  		.then(function(response){
  			 $scope.hideBusy();
  			
  			var confirmPopup = $ionicPopup.confirm({
			     title: 'Message Sent ',
			     template: 'Your message is on its way to customers!'
			   });
			 confirmPopup.then(function(res) {
			  });
			 
  		},
		function(response){
  			$scope.hideBusy();
  			appData.showErrorMessage(response.status);
			
		});
	}
	$scope.deleteCustomer = function(index){
	var customerID = $scope.myData.customerList[index].cusID;
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Delete Customer ID '+customerID,
		     template: 'Are you sure you want to remove customer from records?'
		   });
		 confirmPopup.then(function(res) {
			 if (res){
				 $scope.showBusy();
				 $http.delete(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/customers/id/'+customerID )
			  		.then(function(response){
			  			 $scope.hideBusy();
			  			$scope.myData.customerList = response.data.customerList;
			  			var confirmPopup = $ionicPopup.confirm({
						     title: 'Details deleted successfully',
						     template: 'Customer removed from records.'
						   });
						 confirmPopup.then(function(res) {
						  });
						 
			  		},
					function(response){
			  			$scope.hideBusy();
			  			appData.showErrorMessage(response.status);
						
					});
			 }//Confirmation for delete
			 
		  });
		
	}
	
	//Busy icon
	  $scope.showBusy = function() {
		    $ionicLoading.show({
		      template: 'Please wait...',
		      duration: 3000
		    }).then(function(){
		       
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       
		    });
		  };
		  
		  
	
}]);;APP.CONTROLLERS.controller ('CTRL_admin',['$scope','appData','$rootScope','$state', '$ionicLoading', '$http', '$ionicScrollDelegate','$ionicPopup',
    function($scope, appData,$rootScope,$state, $ionicLoading, $http ,$ionicScrollDelegate,$ionicPopup){

	var theCtrl = this;
	$scope.myData = {};
	$scope.myData.adminProductFilter = "All";
	$scope.myData.productCountAfterFilter = 0;
	$scope.myData.productUpdatePage = true;
	$scope.myData.pageSize = 10;
	$scope.myData.pageNos = [];
	
	$scope.myData.getAllProductsFromDB = [];
	$scope.getAllProducts = function(){
		  $scope.showBusy();
		   $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/allProducts')
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.myData.allProducts = response.data.allproducts;
		  			$scope.myData.maxProductID = response.data.maxProductID;
		  			$scope.createPageNos($scope.myData.allProducts);
		  			theCtrl.showPage(1, $scope.myData.allProducts);
			},
				function(response){
					 $scope.hideBusy();
					
				});
		  
	}
	theCtrl.addProducts = function(count){
		$scope.myData.adminProductFilter = "All";
		if (!$scope.myData.allProducts || $scope.myData.allProducts.length == 0){
			$scope.myData.allProducts = [];
		}
		$scope.myData.maxProductID +=count;
		for (var i=0;i<count;i++){
			
			var product = {};
			product._id = $scope.myData.maxProductID;
			product.image ="";
			product.desc ="";
			product.type ="";
			product.price = "";
			product.offer = "";
			product.productStatus = "Active";
			$scope.myData.allProducts.unshift(product);
			$scope.myData.maxProductID--;
		}
		theCtrl.filterProductsForAdmin();
		
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Please note',
		     template: 'Please update the product descriptiuon, price and hit the "Update products" button.'
		   });
		confirmPopup.then(function(res) {
		    });
	}
	theCtrl.filterProductsForAdmin = function(){
		var filteredProductsForAdmin = [];
		if ($scope.myData.adminProductFilter != "All"){
			for (var i=0;i< $scope.myData.allProducts.length;i++){
				var product = $scope.myData.allProducts[i];
				if ($scope.myData.adminProductFilter == "Offer items"){
					if (product.offer && product.offer.length > 1){
						filteredProductsForAdmin.push(product);
					}
				}else {
					if (product.productStatus == $scope.myData.adminProductFilter){ //Active, out of stock, discontinued products
						filteredProductsForAdmin.push(product);
					}
				}
			}
			
		}else {
			for (var i=0;i< $scope.myData.allProducts.length;i++){
				filteredProductsForAdmin.push($scope.myData.allProducts[i]);
			}
		}
		$scope.createPageNos(filteredProductsForAdmin);
		theCtrl.showPage(1,filteredProductsForAdmin);
		
	}
	$scope.createPageNos = function(allProducts){
		$scope.myData.productCountAfterFilter = allProducts.length;
		$scope.myData.pageNos = [];
		var totalPages = Math.ceil(allProducts.length/$scope.myData.pageSize);
		for (var i=0;i<totalPages ;i++){
			$scope.myData.pageNos.push(i+1);
		}
	}
	theCtrl.showPage = function(page, allProducts) {
		if (!allProducts){
			allProducts = $scope.myData.allProducts;
		}
		$scope.myData.filteredProducts = [];
		var currentProductStart = (page -1) * $scope.myData.pageSize ;
		var currentProductEnd = currentProductStart + $scope.myData.pageSize -1 ;
		 for (var i=0;i<allProducts.length;i++){
			 if (i>=currentProductStart && i<= currentProductEnd){
				 $scope.myData.filteredProducts.push(allProducts[i]);
			 }
		 }
				  		
		  		 
	}
	theCtrl.updatePassword = function(){
		
		
		if ($scope.myData.passwordConfirm != $scope.myData.passwordNew){
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Password mimatch',
			     template: 'New password and confirmation password should be same.'
			   });
			confirmPopup.then(function(res) {
			    });
			  return;
			}
		$scope.showBusy();
		$http.put(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/oldpassword/'+$scope.myData.passwordOld+'/password/'+$scope.myData.passwordNew+'/pwd')
	  		.then(function(response){
	  			 $scope.hideBusy();
	  			var confirmPopup = $ionicPopup.confirm({
				     title: 'Password Changed successfully',
				     template: 'We have updated your new password in our records.'
				   });
				 confirmPopup.then(function(res) {
				  });
				 $scope.myData.password =$scope.myData.passwordNew;
	  		},
			function(response){
	  			$scope.hideBusy();
	  			appData.showErrorMessage(response.status);
				
			});
	}
	
	theCtrl.updateProducts =function(){
		//
		var productsToBeSaved = [];
		for (var i=0; i<$scope.myData.allProducts.length;i++) {
			var product = $scope.myData.allProducts[i];
			if (product.desc && product.price && product.image){
				productsToBeSaved.push(product);
			}
			 
		}
		$scope.myData.allProducts = productsToBeSaved;
		$scope.showBusy();
		   $http.put(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/password/'+$scope.myData.password+'/products', $scope.myData.allProducts)
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.myData.allProducts = response.data.allproducts;
		  			$scope.myData.maxProductID = response.data.maxProductID;
		  			theCtrl.filterProductsForAdmin();
		  			var confirmPopup = $ionicPopup.confirm({
					     title: 'Success',
					     template: 'Updates saved successfully!'
					   });
		  			
		  			confirmPopup.then(function(res) {
					    });
					  
					
			},
				function(response){
					 $scope.hideBusy();
					 appData.showErrorMessage(response.status);
				});
	}
	theCtrl.scrollTop = function(){
		 $ionicScrollDelegate.scrollTop();  
	}
	//Busy icon
	  $scope.showBusy = function() {
		    $ionicLoading.show({
		      template: 'Please Wait...',
		      duration: 10000
		    }).then(function(){
		       
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       
		    });
		  };
	
}
]);APP.CONTROLLERS.controller ('CTRL_ADDRESS',['$scope','dataRestore','$ionicPopup',
    function($scope,dataRestore,$ionicPopup){
	var theCtrl = this;
	$scope.myData = {}
	$scope.newAddress = {}
	$scope.myData.savedAddress = dataRestore.getFromCache('savedAddress', 'obj');
	$scope.deleteIndex = 0;
	$scope.deleteAddress = function(deleteIndex){
		$scope.deleteIndex  = deleteIndex;
		 var confirmPopup = $ionicPopup.confirm({
		     title: 'Confirmation',
		     template: 'Do you want to delete address.'
		   });

		   confirmPopup.then(function(res) {
			   if (res){
				   for (var i=0; i <$scope.myData.savedAddress.length;i++){
					   if (i==$scope.deleteIndex){
						 //splice is safe here as at a time only one item removed in whole iteration
						   $scope.myData.savedAddress.splice(i,1);
						   dataRestore.saveInCache('savedAddress', $scope.myData.savedAddress);
					   }
				   }
				  
			   }
		     
		   });
	}
	$scope.fName = null;
	$scope.saveAddress = function(){
		  var address = {};
		  address.id = new Date().getTime();
		  address.fName = $scope.newAddress.fName;
		  address.lName = $scope.newAddress.lName;
		  address.address = $scope.newAddress.address;
		  address.phone = $scope.newAddress.phone;
		  address.email = $scope.newAddress.email;
		  address.instructions = $scope.newAddress.instructions;
		  if (!address.email){
			  address.email  = "";
		  }
		  if (!address.instructions){
			  address.instructions  = "";
		  }
		  if (!address.fName || !address.lName || !address.address || !address.phone) {
			  var confirmPopup = $ionicPopup.confirm({
				     title: 'Missing information',
				     template: 'Please enter all the required fields of new delivery address.'
				   });

				   confirmPopup.then(function(res) {
				     
				   });
		  }else {
			  $scope.myData.savedAddress.push(address);
			  dataRestore.saveInCache('savedAddress', $scope.myData.savedAddress);
			  dataRestore.saveInCache('defaultAddressIndex', address.id);
			  
			  
			  
		  }
		  
		  
	  }
		
}]);APP.CONTROLLERS.controller ('CTRL_Cart',['$scope','appData','$rootScope','$state',
    function($scope, appData,$rootScope,$state){
	$scope.cartItems = appData.getCartItems();
	
	$rootScope.$on('updateCart',function(event, product, qty){
		 appData.updateCart(product, qty);
		  $scope.$emit('itemAddedToCart');
		});
	
	$scope.checkOut = function(){
		$state.transitionTo('menu.tab.checkout');
	}
	
}
]);APP.CONTROLLERS.controller ('CTRL_CheckOut',['$scope','dataRestore','$ionicPlatform','$state','$ionicPopup','$ionicSideMenuDelegate','appData','$rootScope','$timeout',
    function($scope,dataRestore,$ionicPlatform,$state,$ionicPopup, $ionicSideMenuDelegate, appData, $rootScope,$timeout){
	var theCtrl = this;
	$scope.countOfTotalCartItems =0;
	$scope.cartTotalRs = 0;
	$scope.mydata = {};
	$scope.savedAddress = [];
	
	$scope.showMenu = function () {
	    $ionicSideMenuDelegate.toggleLeft();
	  };
	  $rootScope.$on('itemAddedToCart',function(event){
		  $scope.cartTotalRs = 0;
		  var countOfTotalCartItems = 0;
		  for (var i=0;i<appData.getCartItems().length;i++){
			  countOfTotalCartItems += appData.cartItems[i].qty
			  $scope.cartTotalRs += appData.cartItems[i].qty * appData.cartItems[i].price
			}
		  $scope.countOfTotalCartItems =  countOfTotalCartItems;
	  });
	  
	  
	  
	  $scope.showCartItems = function(){
		  $state.transitionTo('menu.tab.cart');
	  }
	  
	  $scope.onpageLoad = function (){
		  $scope.$emit('itemAddedToCart');
	  }
	  $scope.onpageLoad();
	  $scope.refresh = function(){
		  $scope.$emit('refreshPage');
	  }
	  theCtrl.updateDefaultAddress = function(index){
		  
		  dataRestore.saveInCache('defaultAddressIndex', theCtrl.defaultAddress);
	  }
	  $scope.saveAddressAndPlaceOrder = function(){
		  var address = {};
		  address.id = new Date().getTime();
		  address.fName = theCtrl.fName;
		  address.lName = theCtrl.lName;
		  address.address = theCtrl.address;
		  address.phone = theCtrl.phone;
		  address.email = theCtrl.email;
		  address.instructions = theCtrl.instructions;
		  if (!address.email){
			  address.email  = "";
		  }
		  if (!address.instructions){
			  address.instructions  = "";
		  }
		  if (!address.fName || !address.lName || !address.address || !address.phone) {
			  var confirmPopup = $ionicPopup.confirm({
				     title: 'Missing information',
				     template: 'Please enter all the required fields of new delivery address.'
				   });

				   confirmPopup.then(function(res) {
				     
				   });
		  }else {
			  $scope.savedAddress.push(address);
			  dataRestore.saveInCache('savedAddress', $scope.savedAddress);
			  dataRestore.saveInCache('defaultAddressIndex', address.id);
			  $timeout(function(){
				  theCtrl.defaultAddress = $scope.savedAddress[$scope.savedAddress.length-1].id;
				  theCtrl.placeOrder($scope.savedAddress[$scope.savedAddress.length-1]); //place order to recentry addred address
				  
			  }, 
					 10);
			  
			  
		  }
		  
		  
	  }
	  
	  theCtrl.submitOrder = function(){//Find the address that user has selected and place order to that address
		  for (var i=0;i<$scope.savedAddress.length;i++){
			  if (theCtrl.defaultAddress == $scope.savedAddress[i].id){
				  theCtrl.placeOrder($scope.savedAddress[i]);
				  break;
			  }
		  }
	  }
	  theCtrl.placeOrder = function(address){
		  dataRestore.saveInCache('deliveryAddressForRecentOrder', address);
		  $state.transitionTo('menu.tab.confirmation');
	  }
      //dataRestore.saveInCache('savedAddress', "");
	  $scope.savedAddress = dataRestore.getFromCache('savedAddress', 'obj');
	  if ($scope.savedAddress && $scope.savedAddress.length > 0){
		  theCtrl.defaultAddress = dataRestore.getFromCache('defaultAddressIndex', 'str');
		  var weHaveDefaultAddressOnFile = false;
		  for (var i=0;i<$scope.savedAddress.length;i++){
			  if(theCtrl.defaultAddress == $scope.savedAddress[i].id ){
				  weHaveDefaultAddressOnFile = true;
				  break;
			  }
		  }
		  if (!weHaveDefaultAddressOnFile && $scope.savedAddress.length >0 ){
			  theCtrl.defaultAddress = $scope.savedAddress[0].id
		  }
	  }
	  
	  //$scope.savedAddress_STR = JSON.stringify($scope.savedAddress);
	  if (!$scope.savedAddress){
		  $scope.savedAddress =[];
	  }
}
]);APP.CONTROLLERS.controller ('CTRL_confirmation',['$scope','appData', 'dataRestore','$ionicLoading','$http','$ionicPopup','$state',
    function($scope, appData,dataRestore,$ionicLoading, $http,$ionicPopup,$state){
	$scope.cartItems = appData.getCartItems();
	$scope.deliveryAddressForRecentOrder =  dataRestore.getFromCache('deliveryAddressForRecentOrder', 'obj');
	
	 $scope.getAllProducts = function(){
		 
	 
			if ($scope.cartItems && $scope.cartItems.length > 0){
				$scope.showBusy();
				   $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/allProducts')
				  		.then(function(response){
				  			 $scope.hideBusy();
				  			$scope.allProducts = response.data.allproducts;
				  			for (var i=0;i<$scope.allProducts.length;i++){
				  				if ($scope.allProducts[i].productStatus != "Active"){
				  					for (var j=0;j<$scope.cartItems.length;j++){
				  						if ($scope.allProducts[i]._id == $scope.cartItems[j]._id){
				  							$scope.cartItems[j].productStatus = $scope.allProducts[i].productStatus
				  							$scope.cartItems[j].status = "Currently unavailble";
				  						//splice is safe here as at a time only one item removed in whole iteration of $scope.cartItems
				  							$scope.cartItems.splice(j,1);
				  						}
				  					}
				  				}
				  			}
							
							
						},
						function(response){
							 $scope.hideBusy();
							
							
						});
			} 
		 
		  
		}
	 
	 $scope.submitOrder = function(){
		 
		 var config = {
		            headers : {
		                'Content-Type': 'application/json;'
		            }
		        }
		 if ($scope.cartItems && $scope.cartItems.length > 0){
				$scope.showBusy();
				var order = {};
				order.orderItems = $scope.cartItems;
				order.customer = $scope.deliveryAddressForRecentOrder;
				   $http.post(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/order',order , config)
				  		.then(function(response){
				  			 $scope.hideBusy();
				  			var confirmPopup = $ionicPopup.confirm({
							     title: 'We are working on your order right now.',
							     template: 'Do you wish you send whats app message of your order to shop?'
							   });
							 confirmPopup.then(function(res) {
								 if (res){
									 window.open(response.data.message, "_blank");
								 }
								 $scope.clearCart();
							  });
							
						},
						function(response){
							 $scope.hideBusy();
						});
			} 
		 
	 }
	 $scope.clearCart = function(){
		 for (var i=0;i<$scope.allProducts.length;i++){
			 appData.updateCart($scope.allProducts[i], 0);
		 }
		 $scope.$emit('itemAddedToCart');
		 $state.transitionTo('menu.tab.home');
	 }
	 
	 //Busy icon
	  $scope.showBusy = function() {
		    $ionicLoading.show({
		      template: 'Please wait...',
		      duration: 3000
		    }).then(function(){
		       
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       
		    });
		  };
	  
	  
		 
	  
	
}]);APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$http','$rootScope','appData','$window','$interval','dataRestore','$ionicLoading',
    function($scope, $http, $rootScope,appData,$window,$interval,dataRestore, $ionicLoading ){
	//https://github.com/apache/cordova-plugin-geolocation
	//cordova plugin add phonegap-nfc 
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git#0.8.2
	//cordova plugin add https://github.com/cowbell/cordova-plugin-geofence
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add cordova-plugin-device-motion
	//cordova plugin add cordova-plugin-whitelist
	//cordova plugin add cordova-plugin-shake
	//cordova plugin add cordova-plugin-sms
	//cordova plugin add cordova-plugin-android-permissions@0.6.0
	//cordova plugin add cordova-plugin-tts
	//cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/SandeepHooda/Speachrecognization org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/katzer/cordova-plugin-background-mode.git
//	cordova plugin add cordova-plugin-http
	//cordova plugin add cordova-plugin-contacts-phonenumbers
	//cordova plugin add https://github.com/boltex/cordova-plugin-powermanagement
	//cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications de.appplant.cordova.plugin.local-notification
	
	var theCtrl = this;
	$scope.product = { desc: 'Britania brown bread', price: 35, image :'https://i.imgur.com/JZnDv3j.jpg' };
	$scope.shopHasOffers = true;
	$scope.allProducts = [];
	$scope.filteredProducts = [];
	theCtrl.searchInput = "";
	if (!$rootScope.addToCartListner){
		$rootScope.addToCartListner =
		$rootScope.$on('addToCart',function(event, product, qty){
				  appData.addToCart(product, qty);
				  $scope.$emit('itemAddedToCart');
				});
	}
	

	
	  $scope.lauchBrowser = function(){
		  window.open('https://deliveratmydoor.appspot.com/easyday25/index.html#/menu/tab/home','_system');
	 }
	  
	  if (!$rootScope.refresh){
			$rootScope.refresh =
			$rootScope.$on('refreshPage',function(){
				location.reload();
			});
		}
	 
	  $scope.getAllProducts = function(){
		  $scope.showBusy();
		   $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/allProducts')
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.allProducts = response.data.allproducts;
		  			$scope.allActiveProducts = [];
		  			for (var i=0;i<$scope.allProducts.length;i++){
		  				if ($scope.allProducts[i].productStatus == "Active"){
		  				//splice is "Not" safe here as when it removed a element the array repositions itself
		  					$scope.allActiveProducts.push($scope.allProducts[i]);
		  				}
		  			}
		  		
		  			$scope.allProducts = $scope.allActiveProducts;
					$scope.filteredProducts = $scope.allProducts ;
					$scope.carouselSetup($scope.allProducts);
					
				},
				function(response){
					 $scope.hideBusy();
					$scope.isPhone=true;
					//alert('Window location '+JSON.stringify($window.location))
					
				});
		  
		}
	  
	  /**
	   * This function takes user input 
	   * split the input by space
	   * look for all elements of search in product desc in any order -> case insensitive
	   */
	  theCtrl.filterProduts = function(){
		  
		  if (theCtrl.searchInput == ""){
			  $scope.filteredProducts = $scope.allProducts;
			  return;
		  }
		  var searchArray = theCtrl.searchInput.toLowerCase().split(" ");//split the input by space
		  
		   $scope.filteredProducts = 
				  	  _.filter($scope.allProducts, function(o) {//Search in all products in DB
				  		        var matchingProduct = true;
				  		      _.forEach(searchArray, function(search){ // look for all words in search string in any order and  case insensitive
				  		    	if (o.desc.toLowerCase().indexOf(search) < 0 ) {
				  		    		matchingProduct = false;
				  				}
				  		      });
						  		
				  		      if (matchingProduct) return o;
						  });
			 
		 
		  $scope.filteredProducts = _.without($scope.filteredProducts, undefined);
		  $scope.filteredProducts = _.without($scope.filteredProducts, null);
		 // 
	  }
	  
	  //carousel 
	  $scope.carouselSetup = function (allProducts){
		  var carouselEleFocus=false;
		  targetUrl = "https://deliveratmydoor.appspot.com/easyday25/index.html#/menu/tab/home";
		 var offerItems = [];
		 $scope.shopHasOffers = false;
		  for (var i=0;i<allProducts.length;i++){
			  
			 if (allProducts[i].offer){
				 $scope.shopHasOffers = true;
				 offerItems.push(allProducts[i]);
				 $("#jcarouselItems").append('<li><a href="#/menu/tab/offers" target="_self"><img src="'+allProducts[i].image+'"  class="imageSize" BORDER="0"/></a></li>');
				  if ($window.location.host == ""){
					  $("#jcarouselTextItems").append('<li><div  class="productDesc SparkleAndroid">'+allProducts[i].offer+' </div></li>');
				  }else {
					  $("#jcarouselTextItems").append('<li><div  class="productDesc Sparkle">'+allProducts[i].offer+' </div></li>');
				  }
			 }
			 
			  
			
		  }
		  
		  appData.setOfferItems(offerItems);
		  dataRestore.saveInCache('offerItems', offerItems);
		  $('.jcarousel')
		    .jcarousel({
		   	 	wrap: 'circular',
		   	 	animation: {
			        duration: 200,
			        easing:   'linear',
			        complete: function() {
			    	}
			    }
		    })
		    .jcarouselAutoscroll({
		        target: '+=1',
		        interval: 7000
		    });
			 
		  $('.jcarouseText')
		    .jcarousel({
		   	 	wrap: 'circular',
		   	 	animation: {
			        duration: 200,
			        easing:   'linear',
			        complete: function() {
			    	}
			    }
		    })
		    .jcarouselAutoscroll({
		        target: '+=1',
		        interval: 7000
		    });
		  
			 $('.jcarousel-pagination')
	            .on('jcarouselpagination:active', 'a', function() {
	                $(this).addClass('active');
	            })
	            .on('jcarouselpagination:inactive', 'a', function() {
	                $(this).removeClass('active');
	            })
	            .jcarouselPagination();
	            
	            $('.jcarousel-control-prev')
				.on('jcarouselcontrol:active', function() {
					$(this).removeClass('inactive');
				})
				.on('jcarouselcontrol:inactive', function() {
					$(this).addClass('inactive');
				})
				.jcarouselControl({
					target: '-=1'
				});
				
				 $('.jcarousel-control-next')
				.on('jcarouselcontrol:active', function() {
					$(this).removeClass('inactive');
				})
				.on('jcarouselcontrol:inactive', function() {
					$(this).addClass('inactive');
				})
				.jcarouselControl({
					target: '+=1'
				});
				
	            
	            $('.jcarousel').on('jcarousel:visiblein', 'li', function(event, carousel) {
					if(carouselEleFocus)
				{
				$('.jcarousel').jcarousel('fullyvisible').children('a').focus();
				carouselEleFocus=false;
					
				}
				});
	            
		 
	  	}//carousel
	  
	  //Busy icon
	  $scope.showBusy = function() {
		    $ionicLoading.show({
		      template: 'Please wait...',
		      duration: 3000
		    }).then(function(){
		       
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       
		    });
		  };
	  
	  
	  }
		
	
	 
]);APP.CONTROLLERS.controller ('CTRL_offers',['$scope','dataRestore', 
    function($scope, dataRestore){
	$scope.offerItems = dataRestore.getFromCache('offerItems', 'obj');
	}
	
	
	

]);;APP.CONTROLLERS.controller ('PostCard',['$scope',
    function($scope ){
	$scope.numberPickerObject = {
		    inputValue: 1, //Optional
		    minValue: 1,
		    maxValue: 100,
		    precision: 3,  //Optional
		    decimalStep: 0.25,  //Optional
		    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
		    unit: "",  //Optional - "m", "kg", "℃" or whatever you want
		    titleLabel: 'Quantity',  //Optional
		    setLabel: 'Add',  //Optional
		    closeLabel: 'Cancel',  //Optional
		    setButtonType: 'button-positive',  //Optional
		    closeButtonType: 'button-stable',  //Optional
		    callback: function (val) {    //Mandatory
		    	$scope.addCartCallback(val, $scope);
		  }
		};
	$scope.numberPickerUpdateObject =  {
		    inputValue: $scope.productInfo.qty, //Optional
		    minValue: 0,
		    maxValue: 100,
		    precision: 3,  //Optional
		    decimalStep: 0.25,  //Optional
		    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
		    unit: "",  //Optional - "m", "kg", "℃" or whatever you want
		    titleLabel: 'Quantity',  //Optional
		    setLabel: 'Update',  //Optional
		    closeLabel: 'Remove',  //Optional
		    setButtonType: 'button-positive',  //Optional
		    closeButtonType: 'button-stable icon ion-trash-b',  //Optional
		    callback: function (val) {    //Mandatory
		    	$scope.updateCartCallBack(val, $scope);
		  }
		};
	
	$scope.addCartCallback = function(val, $scope){
		if (val && val > 0){
			$scope.$emit('addToCart', $scope.productInfo, val);
		}
	}
	
	$scope.updateCartCallBack = function(val, $scope){
		if (val == undefined){
			val = 0;//Remove from cart
		}
		$scope.numberPickerUpdateObject.inputValue = val;
		$scope.$emit('updateCart', $scope.productInfo, val);
	}

	}
	 
]);APP.DIRECTIVE.directive ('postCard',['$http',
    function($http){
	return {
	    restrict: 'E',
	    scope: {
	     productInfo: '=info',
	     landingPage: '=from'
	    },
	    templateUrl: 'productCard/productCard.html'
	  };
	}

]);;APP.CONTROLLERS.controller ('CTRL_SETTINGS',['$scope','$ionicPlatform','dataRestore',
    function($scope,$ionicPlatform,dataRestore){
	
	$scope.myData = {};
	$scope.restoreFromStorage = function(){
		dataRestore.restoreSettings($scope.myData);
		
	}
	if(!$scope.myData.frequencyOfGreenAlerts || $scope.myData.frequencyOfGreenAlerts <15){
		$scope.myData.frequencyOfGreenAlerts = 15;
	}
	if(!$scope.myData.frequencyOfRedAlerts || $scope.myData.frequencyOfRedAlerts < 60){
		$scope.myData.frequencyOfRedAlerts = 60;
	}
	if(!$scope.myData.shakeIntensity){
		$scope.myData.shakeIntensity = 15;
	}
	/*if(!$scope.myData.cacheMyLocationFrequency){
		$scope.myData.cacheMyLocationFrequency = 5;
	}*/
	if(!$scope.myData.mapType){
		$scope.myData.mapType = 'mapMyIndia';
	}
	
	if(!$scope.myData.useChargerUnplugEvent){
		$scope.myData.useChargerUnplugEvent = false;
	}
	if(!$scope.myData.listenShakeEvent){
		$scope.myData.listenShakeEvent = false;
	}
	if(!$scope.myData.anounceSMSText){
		$scope.myData.anounceSMSText = false;
	}
	if(!$scope.myData.autoReplyToWRU){
		$scope.myData.autoReplyToWRU = false;
	}
	var welcomeMsg = window.localStorage.getItem("playWelcomeMessage");
	if ( welcomeMsg == 'true'){
		$scope.myData.playWelcomeMessage = true;
		
	}else {
		$scope.myData.playWelcomeMessage = false;
		
	}
	
	window.localStorage.setItem("settingPageVisited",true);
	
	$scope.updateSettings = function(){
		window.localStorage.setItem("frequencyOfGreenAlerts", $scope.myData.frequencyOfGreenAlerts);
		window.localStorage.setItem("frequencyOfRedAlerts", $scope.myData.frequencyOfRedAlerts);
		window.localStorage.setItem("mapType", $scope.myData.mapType);
		window.localStorage.setItem("useChargerUnplugEvent", $scope.myData.useChargerUnplugEvent);
		window.localStorage.setItem("listenShakeEvent", $scope.myData.listenShakeEvent);
		window.localStorage.setItem("shakeIntensity", $scope.myData.shakeIntensity);
		window.localStorage.setItem("playWelcomeMessage", $scope.myData.playWelcomeMessage);
		window.localStorage.setItem("anounceSMSText", $scope.myData.anounceSMSText);
		window.localStorage.setItem("autoReplyToWRU", $scope.myData.autoReplyToWRU);
		
		
		$scope.$emit('settingsChanged');
	}
	$ionicPlatform.ready( function() {
		$scope.restoreFromStorage();
	});
	
		
	}
]);APP.SERVICES.service ('appData',['$window','dataRestore','$ionicPopup',
    function( $window,dataRestore, $ionicPopup){
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
	
	this.showErrorMessage = function(httpCode){
		if ( httpCode == 403){
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Password mimatch',
			     template: 'Your password donot match our records.'
			   });
			 confirmPopup.then(function(res) {
			  });
		}else {
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Internal Server Error',
			     template: 'Something unusual happened at server.'
			   });
			 confirmPopup.then(function(res) {
			  });
				
		}
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
		var newItem = true;
		for (var i=0;i<this.cartItems.length;i++){
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
		
		for (var i=0;i<this.cartItems.length;i++){
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

]);;APP.SERVICES.service('dataRestore', function($rootScope) {
	
	this.saveInCache = function (key, value) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}
	this.getFromCache = function (key, type) {
		var value = "";
		
		if (type === 'boolean'){
			value = false;
			if (window.localStorage.getItem(key) === 'true'){
				value = true;
			}
		}
		
		if (type === 'number'){
			value = parseInt(window.localStorage.getItem(key))
			if (isNaN(value) ){
				value = 0; 
			}
		}
		
		if (type === 'str' || type == undefined || type == null){
			value = window.localStorage.getItem(key)
			if (value == null || value == 'null'){
				value = "";
			}
			
		}
		if (type === 'obj' ){
			value = window.localStorage.getItem(key)
			if (value){
				return JSON.parse(value)
			}else {
				return null;
			}
			
		}
		return value;
	}
	  
    
});;APP.DIRECTIVE.directive("phoneNumber", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
        	 var reg = new RegExp('[0-9,#()+ ]$');
            angular.element(elem).on("keyup", function(e) {
                if (!reg.test(this.value)) {
                	this.value = this.value.replace(/[^0-9,#()+ ]/g, "");
                }
            });
        }
    }
}]);