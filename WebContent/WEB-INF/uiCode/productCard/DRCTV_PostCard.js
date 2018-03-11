APP.DIRECTIVE.directive ('postCard',['$http',
    function($http){
	return {
	    restrict: 'E',
	    scope: {
	     productInfo: '=info',
	     landingPage: '=from'
	    },
	    templateUrl: 'productCard/productCard.html'
	  };
	}

]);