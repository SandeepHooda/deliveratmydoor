APP.CONTROLLERS.controller ('CTRL_admin',['$scope','appData','$rootScope','$state', '$ionicLoading', '$http', '$ionicScrollDelegate','$ionicPopup',
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
		for (let i=0;i<count;i++){
			
			let product = {};
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
		let filteredProductsForAdmin = [];
		if ($scope.myData.adminProductFilter != "All"){
			for (let i=0;i< $scope.myData.allProducts.length;i++){
				let product = $scope.myData.allProducts[i];
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
			for (let i=0;i< $scope.myData.allProducts.length;i++){
				filteredProductsForAdmin.push($scope.myData.allProducts[i]);
			}
		}
		$scope.createPageNos(filteredProductsForAdmin);
		theCtrl.showPage(1,filteredProductsForAdmin);
		
	}
	$scope.createPageNos = function(allProducts){
		$scope.myData.productCountAfterFilter = allProducts.length;
		$scope.myData.pageNos = [];
		let totalPages = Math.ceil(allProducts.length/$scope.myData.pageSize);
		for (let i=0;i<totalPages ;i++){
			$scope.myData.pageNos.push(i+1);
		}
	}
	theCtrl.showPage = function(page, allProducts) {
		if (!allProducts){
			allProducts = $scope.myData.allProducts;
		}
		$scope.myData.filteredProducts = [];
		let currentProductStart = (page -1) * $scope.myData.pageSize ;
		let currentProductEnd = currentProductStart + $scope.myData.pageSize -1 ;
		 for (let i=0;i<allProducts.length;i++){
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
		//console.log(JSON.stringify($scope.myData.allProducts));
		let productsToBeSaved = [];
		for (let i=0; i<$scope.myData.allProducts.length;i++) {
			let product = $scope.myData.allProducts[i];
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
		       console.log("The loading indicator is now displayed");
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       console.log("The loading indicator is now hidden");
		    });
		  };
	
}
])