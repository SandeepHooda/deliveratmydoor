APP.CONTROLLERS.controller ('CTRL_Cart',['$scope','appData','$rootScope',
    function($scope, appData,$rootScope){
	$scope.cartItems = appData.getCartItems();
	
	$rootScope.$on('updateCart',function(event, product, qty){
		 appData.updateCart(product, qty);
		  $scope.$emit('itemAddedToCart');
		});
	
}
])