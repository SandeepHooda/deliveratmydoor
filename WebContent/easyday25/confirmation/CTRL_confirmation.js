APP.CONTROLLERS.controller ('CTRL_confirmation',['$scope','appData', 'dataRestore','$ionicLoading','$http',
    function($scope, appData,dataRestore,$ionicLoading, $http){
	$scope.cartItems = appData.getCartItems();
	$scope.deliveryAddressForRecentOrder =  dataRestore.getFromCache('deliveryAddressForRecentOrder', 'obj');
	
	 $scope.getAllProducts = function(){
		 
	 
			if ($scope.cartItems && $scope.cartItems.length > 0){
				$scope.showBusy();
				   $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/allProducts')
				  		.then(function(response){
				  			 $scope.hideBusy();
				  			$scope.allProducts = response.data.allproducts;
				  			for (let i=0;i<$scope.allProducts.length;i++){
				  				if ($scope.allProducts[i].productStatus != "Active"){
				  					for (let j=0;j<$scope.cartItems.length;j++){
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
	  
	  
	  
	
}])