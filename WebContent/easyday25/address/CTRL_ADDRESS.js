APP.CONTROLLERS.controller ('CTRL_ADDRESS',['$scope','dataRestore','$ionicPopup',
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
		
}])