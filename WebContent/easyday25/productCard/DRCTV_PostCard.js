APP.DIRECTIVE.directive ('postCard',['$http',
    function($http){
	return {
	    restrict: 'E',
	    scope: {
	     productInfo: '=info'
	    },
	    templateUrl: 'productCard/productCard.html'
	  };
	}

]);