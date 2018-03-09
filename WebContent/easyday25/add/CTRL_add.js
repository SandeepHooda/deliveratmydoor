APP.CONTROLLERS.controller ('CTRL_add',['$scope','dataRestore', '$ionicLoading','$http','appData', 
    function($scope, dataRestore, $ionicLoading,$http,appData ){
	var theCtrl = this;
	$scope.myData = {}
	
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
		  
		  
	
}]);