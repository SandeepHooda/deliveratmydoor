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
		$http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/password/'+$scope.myData.password+'/mode/'+mode+'/subject/'+$scope.myData.EmailSubject+'/message/'+$scope.myData.MessageToCustomers)
  		.then(function(response){
  			 $scope.hideBusy();
  			var responseStatus = JSON.parse(response.data.message);
  			var infoBody = 'Message sent to '+responseStatus.customerCount+' customers out of '+responseStatus.successCount;
  			if (responseStatus.customerCount == responseStatus.successCount && responseStatus.customerCount > 0){
  				infoBody = 'Message sent to all '+responseStatus.successCount+' customers.';
  			}
  			var confirmPopup = $ionicPopup.confirm({
			     title: 'Your message is on its way to customers!',
			     template: infoBody
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
		       console.log("The loading indicator is now displayed");
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       console.log("The loading indicator is now hidden");
		    });
		  };
		  
		  
	
}]);