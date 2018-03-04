APP.CONTROLLERS.controller ('CTRL_StoreLocation',['$scope','dataRestore','$ionicPlatform','$state','$ionicPopup','$ionicSideMenuDelegate','appData','$rootScope',
    function($scope,dataRestore,$ionicPlatform,$state,$ionicPopup, $ionicSideMenuDelegate, appData, $rootScope){
	$scope.countOfTotalCartItems =0;
	$scope.mydata = {};
	$scope.showMenu = function () {
	    $ionicSideMenuDelegate.toggleLeft();
	  };
	  $rootScope.$on('itemAddedToCart',function(event){
		  let countOfTotalCartItems = 0;
		  for (let i=0;i<appData.getCartItems().length;i++){
			  countOfTotalCartItems += appData.cartItems[i].qty
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
}
])