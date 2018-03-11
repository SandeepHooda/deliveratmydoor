APP.CONTROLLERS.controller ('CTRL_Cart',['$scope','appData','$rootScope','$state',
    function($scope, appData,$rootScope,$state){
	$scope.cartItems = appData.getCartItems();
	
	$rootScope.$on('updateCart',function(event, product, qty){
		 appData.updateCart(product, qty);
		  $scope.$emit('itemAddedToCart');
		});
	
	$scope.checkOut = function(){
		$state.transitionTo('menu.tab.checkout');
	}
	
}
])