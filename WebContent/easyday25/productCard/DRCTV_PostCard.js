APP.DIRECTIVE.directive ('postCard',['$http',
    function($http){
	return {
	    restrict: 'E',
	    scope: {
	      customerInfo: '=info'
	    },
	    templateUrl: 'productCard/productCard.html'
	  };
	}

]);