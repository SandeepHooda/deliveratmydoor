APP.CONTROLLERS.controller ('CTRL_offers',['$scope','dataRestore', 
    function($scope, dataRestore){
	$scope.offerItems = dataRestore.getFromCache('offerItems', 'obj');
	}
	
	
	

]);