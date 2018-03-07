APP.CONTROLLERS.controller ('CTRL_CheckOut',['$scope','dataRestore','$ionicPlatform','$state','$ionicPopup','$ionicSideMenuDelegate','appData','$rootScope','$timeout',
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
		  let countOfTotalCartItems = 0;
		  for (let i=0;i<appData.getCartItems().length;i++){
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
		  console.log(index+" defaultAddress "+theCtrl.defaultAddress);
		  dataRestore.saveInCache('defaultAddressIndex', theCtrl.defaultAddress);
	  }
	  $scope.saveAddressAndPlaceOrder = function(){
		  let address = {};
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
		  for (let i=0;i<$scope.savedAddress.length;i++){
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
	  }
	  
	  //$scope.savedAddress_STR = JSON.stringify($scope.savedAddress);
	  if (!$scope.savedAddress){
		  $scope.savedAddress =[];
	  }
}
])