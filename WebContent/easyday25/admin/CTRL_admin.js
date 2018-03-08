APP.CONTROLLERS.controller ('CTRL_admin',['$scope','appData','$rootScope','$state', '$ionicLoading', '$http', '$ionicScrollDelegate','$ionicPopup',
    function($scope, appData,$rootScope,$state, $ionicLoading, $http ,$ionicScrollDelegate,$ionicPopup){

	var theCtrl = this;
	$scope.myData = {};
	$scope.myData.productUpdatePage = true;
	$scope.myData.pageSize = 10;
	$scope.myData.pageNos = [];
	$scope.myData.filteredProducts = [];
	$scope.getAllProducts = function(){
		  $scope.showBusy();
		   $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/allProducts')
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.myData.allProducts = response.data.allproducts;
		  			$scope.createPageNos();
		  			theCtrl.showPage(1);
			},
				function(response){
					 $scope.hideBusy();
					
				});
		  
	}
	
	$scope.createPageNos = function(){
		$scope.myData.pageNos = [];
		let totalPages = Math.ceil($scope.myData.allProducts.length/$scope.myData.pageSize);
		for (let i=0;i<totalPages ;i++){
			$scope.myData.pageNos.push(i+1);
		}
	}
	theCtrl.showPage = function(page) {
		$scope.myData.filteredProducts = [];
		let currentProductStart = (page -1) * $scope.myData.pageSize ;
		let currentProductEnd = currentProductStart + $scope.myData.pageSize -1 ;
		 for (let i=0;i<$scope.myData.allProducts.length;i++){
			 if (i>=currentProductStart && i<= currentProductEnd){
				 $scope.myData.filteredProducts.push($scope.myData.allProducts[i]);
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
	  			theCtrl.showErrorMessage(response.status);
				
			});
	}
	theCtrl.showErrorMessage = function(httpCode){
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
	theCtrl.updateProducts =function(){
		console.log(JSON.stringify($scope.myData.allProducts));
		
		$scope.showBusy();
		   $http.put(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/password/'+$scope.myData.password+'/products', $scope.myData.allProducts)
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.myData.allProducts = response.data.allproducts;
		  			$scope.createPageNos();
		  			theCtrl.showPage(1);
		  			var confirmPopup = $ionicPopup.confirm({
					     title: 'Success',
					     template: 'Updates saved successfully!'
					   });
		  			
		  			confirmPopup.then(function(res) {
					    });
					  
					
			},
				function(response){
					 $scope.hideBusy();
					 theCtrl.showErrorMessage(response.status);
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