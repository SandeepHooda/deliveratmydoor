APP.CONTROLLERS.controller ('CTRL_CheckOut',['$scope','dataRestore','$ionicPlatform','$state','$ionicPopup','$ionicSideMenuDelegate','appData','$rootScope',
    function($scope,dataRestore,$ionicPlatform,$state,$ionicPopup, $ionicSideMenuDelegate, appData, $rootScope){
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
	  $scope.submitOrder = function(){
		  let address = {};
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
				     template: 'Please enter all the required fields.'
				   });

				   confirmPopup.then(function(res) {
				     
				   });
		  }else {
			  $scope.savedAddress.push(address);
			  dataRestore.saveInCache('savedAddress', $scope.savedAddress);
		  }
		  
		  
	  }
	 
	  $scope.savedAddress = dataRestore.getFromCache('savedAddress', 'obj');
	  if (!$scope.savedAddress){
		  $scope.savedAddress =[];
	  }
}
])