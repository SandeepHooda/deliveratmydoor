APP.CONTROLLERS.controller ('CTRL_admin',['$scope','appData','$rootScope','$state', '$ionicLoading', '$http', 
    function($scope, appData,$rootScope,$state, $ionicLoading, $http ){

	$scope.myData = {};
	$scope.getAllProducts = function(){
		  $scope.showBusy();
		   $http.get(appData.getHost()+'/ws/shopID/1519981368108/allProducts')
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.myData.allProducts = response.data.allproducts;
			},
				function(response){
					 $scope.hideBusy();
					
				});
		  
		}
	
	//Busy icon
	  $scope.showBusy = function() {
		    $ionicLoading.show({
		      template: 'Loading...',
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
	
}
])