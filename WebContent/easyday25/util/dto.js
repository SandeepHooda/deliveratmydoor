APP.SERVICES.service ('appData',['$window',
    function( $window){
	
	this.getHost = function () {
		var host = "https://deliveratmydoor.appspot.com/easyday25";
		
		
		return host+$window.location;
	}
	
}

]);