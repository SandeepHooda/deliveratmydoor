APP.CONTROLLERS.controller ('CTRL_Cart',['$scope','appData',
    function($scope, appData){
	$scope.cartItems = appData.getCartItems();
	
}
])