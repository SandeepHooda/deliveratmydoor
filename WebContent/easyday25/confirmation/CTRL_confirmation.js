APP.CONTROLLERS.controller ('CTRL_confirmation',['$scope','appData', 'dataRestore',
    function($scope, appData,dataRestore){
	$scope.cartItems = appData.getCartItems();
	$scope.deliveryAddressForRecentOrder =  dataRestore.getFromCache('deliveryAddressForRecentOrder', 'obj');
	
}
])