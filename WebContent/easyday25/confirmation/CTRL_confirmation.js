APP.CONTROLLERS.controller ('CTRL_confirmation',['$scope','appData', 'dataRestore','$ionicLoading','$http','$ionicPopup','$state',
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
		       console.log("The loading indicator is now displayed");
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       console.log("The loading indicator is now hidden");
		    });
		  };
	  
	  
		  paypal.Button.render({
		      env: 'production', // 'production' Or 'sandbox',
		      client: {
		            sandbox:    'AZpyQraYf3wFO-NRH3PEUAnbPdGFk_n-7xfXdg82blTjVxuemvq_HHpMcCFRBX9iiKCk1IffbQZDlKBt',
		            production: 'ATVlvcSOypsBkfgfPWbPaWgkqUYVBXvz5Qn1LLOT1oudXHGootEX-8Z4j9QzRWYljtMLCxTL04yRtZkq'
		        },
		      commit: true, // Show a 'Pay Now' button

		      style: {
		        color: 'gold',
		        size: 'small'
		      },

		      payment: function(data, actions) {
		            return actions.payment.create({
		                payment: {
		                    transactions: [
		                        {
		                            amount: { total: '1.00', currency: 'INR' }
		                        }
		                    ]
		                }
		            });
		        },

		      onAuthorize: function(data, actions) {
		    	  return actions.payment.execute().then(function(payment) {

		                alert('Payment done');
		            });
		      },

		      onCancel: function(data, actions) {
		        /* 
		         * Buyer cancelled the payment 
		         */
		      },

		      onError: function(err) {
		        /* 
		         * An error occurred during the transaction 
		         */
		      }
		    }, '#paypal-button');
	  
	
}])