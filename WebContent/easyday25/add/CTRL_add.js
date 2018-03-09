APP.CONTROLLERS.controller ('CTRL_add',['$scope','dataRestore', '$ionicLoading','$http','appData', '$ionicPopup',
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
	$scope.sendSMS =  function(){
		 
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
		$http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/message/'+$scope.myData.MessageToCustomers)
  		.then(function(response){
  			 $scope.hideBusy();
  			
  			var confirmPopup = $ionicPopup.confirm({
			     title: 'SMS Sent ',
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
		let cusID = $scope.myData.customerList[index].cusID;
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Delete Customer ID '+cusID,
		     template: 'Are you sure you want to remove customer from records?'
		   });
		 confirmPopup.then(function(res) {
			 if (res){
				 $scope.showBusy();
				 $http.delete(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/customers/id/'+cusID, )
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
		       console.log("The loading indicator is now displayed");
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       console.log("The loading indicator is now hidden");
		    });
		  };
		  
		  
	
}]);